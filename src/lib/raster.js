// Carga de GeoTIFF (ortomosaico / DSM) y cálculo de volumen.
//
// Los productos de fotogrametría (p.ej. de OpenDroneMap) suelen exportarse en
// una proyección UTM métrica, mientras que el mapa de Leaflet trabaja en
// lng/lat (WGS84). Aquí resolvemos esa diferencia con proj4 para que el volumen
// se calcule correctamente en metros cúbicos reales.

import parseGeoraster from 'georaster'
import proj4module from 'proj4'

// Interop CJS/ESM (ver nota en swiss.js).
const proj4 = proj4module.default ?? proj4module
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { polygon as turfPolygon, point as turfPoint } from '@turf/helpers'
import { EPSG_2056 } from './swiss.js'

/** Devuelve una definición proj4 para un código EPSG común (4326, 3857, UTM, LV95). */
export function proj4defForEPSG(epsg) {
  if (!epsg) return null
  if (epsg === 4326) return 'EPSG:4326'
  if (epsg === 3857) return 'EPSG:3857'
  if (epsg === 2056) return EPSG_2056 // LV95 — DSM del terreno oficial suizo
  // UTM norte: 326zz  |  UTM sur: 327zz
  if (epsg >= 32601 && epsg <= 32660) {
    const zone = epsg - 32600
    return `+proj=utm +zone=${zone} +datum=WGS84 +units=m +no_defs`
  }
  if (epsg >= 32701 && epsg <= 32760) {
    const zone = epsg - 32700
    return `+proj=utm +zone=${zone} +south +datum=WGS84 +units=m +no_defs`
  }
  return null
}

/** Parsea un ArrayBuffer de GeoTIFF a un objeto georaster. */
export async function loadGeoRaster(arrayBuffer) {
  return parseGeoraster(arrayBuffer)
}

/** Metros por grado de longitud a una latitud dada (para rasters geográficos). */
function metersPerDegLon(lat) {
  return 111320 * Math.cos((lat * Math.PI) / 180)
}
const METERS_PER_DEG_LAT = 110540

/**
 * Bounding box del anillo en el CRS del raster: permite descartar celdas de un
 * vistazo antes del test punto-en-polígono, clave cuando el raster cubre mucho
 * más que el polígono (p.ej. el terreno oficial de toda la vista del mapa).
 */
function ringBBoxInCRS(ring, fromLngLat) {
  let xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity
  for (const [lng, lat] of ring) {
    const [x, y] = fromLngLat(lng, lat)
    if (x < xmin) xmin = x
    if (x > xmax) xmax = x
    if (y < ymin) ymin = y
    if (y > ymax) ymax = y
  }
  return { xmin, xmax, ymin, ymax }
}

/** Valor del raster en una coordenada WGS84 (vecino más próximo), o null. */
export function sampleRasterAt(georaster, lng, lat) {
  const { xmin, ymax, pixelWidth, pixelHeight, projection, width, height, noDataValue } = georaster
  const isGeographic = projection === 4326 || projection === '4326'
  const def = isGeographic ? null : proj4defForEPSG(Number(projection))
  const [x, y] = def ? proj4('EPSG:4326', def, [lng, lat]) : [lng, lat]
  const c = Math.floor((x - xmin) / pixelWidth)
  const r = Math.floor((ymax - y) / pixelHeight)
  if (r < 0 || c < 0 || r >= height || c >= width) return null
  const z = georaster.values[0][r][c]
  if (z == null || z === noDataValue || Number.isNaN(z)) return null
  return z
}

/**
 * Diferencia de volumen entre dos vuelos dentro de un polígono:
 * Σ (z_actual − z_anterior) × área de celda. Positivo = material añadido.
 *
 * @param {object} dsmNow   DSM del vuelo actual
 * @param {object} dsmPrev  DSM del vuelo anterior
 * @param {Array<[lng,lat]>} ring
 * @returns {{ volumeM3:number, fillM3:number, cutM3:number,
 *            cellCount:number, coverage:number }}
 */
export function computeVolumeDiff(dsmNow, dsmPrev, ring) {
  const band = dsmNow.values[0]
  const noData = dsmNow.noDataValue
  const { xmin, ymax, pixelWidth, pixelHeight, projection, width, height } = dsmNow
  const isGeographic = projection === 4326 || projection === '4326'
  const def = isGeographic ? null : proj4defForEPSG(Number(projection))
  const toLngLat = def ? (x, y) => proj4(def, 'EPSG:4326', [x, y]) : (x, y) => [x, y]
  const fromLngLat = def ? (lng, lat) => proj4('EPSG:4326', def, [lng, lat]) : (lng, lat) => [lng, lat]
  const poly = turfPolygon([[...ring, ring[0]]])
  const rb = ringBBoxInCRS(ring, fromLngLat)

  let fill = 0
  let cut = 0
  let inside = 0
  let matched = 0
  for (let r = 0; r < height; r++) {
    const y = ymax - (r + 0.5) * pixelHeight
    if (y < rb.ymin || y > rb.ymax) continue
    const row = band[r]
    for (let c = 0; c < width; c++) {
      const zNow = row[c]
      if (zNow == null || zNow === noData || Number.isNaN(zNow)) continue
      const x = xmin + (c + 0.5) * pixelWidth
      if (x < rb.xmin || x > rb.xmax) continue
      const [lng, lat] = toLngLat(x, y)
      if (!booleanPointInPolygon(turfPoint([lng, lat]), poly)) continue
      inside++
      const zPrev = sampleRasterAt(dsmPrev, lng, lat)
      if (zPrev == null) continue
      matched++
      const cellArea = isGeographic
        ? pixelWidth * metersPerDegLon(lat) * pixelHeight * METERS_PER_DEG_LAT
        : pixelWidth * pixelHeight
      const dz = zNow - zPrev
      if (dz >= 0) fill += dz * cellArea
      else cut += -dz * cellArea
    }
  }
  return {
    volumeM3: fill - cut,
    fillM3: fill,
    cutM3: cut,
    cellCount: matched,
    coverage: inside ? matched / inside : 0,
  }
}

/**
 * Rejilla de diferencias entre dos DSM para pintar un mapa de calor:
 * rojo = material añadido, azul = retirado, transparente = sin cambio.
 * Devuelve los píxeles RGBA, dimensiones, límites geográficos y estadísticas.
 *
 * @param {object} dsmNow   DSM actual
 * @param {object} dsmPrev  DSM anterior (se muestrea por coordenada)
 * @param {number} maxDim   lado máximo de la rejilla (submuestreo)
 * @param {number} threshold cambio mínimo en m para pintar (def. 0.1)
 */
export function buildDiffGrid(dsmNow, dsmPrev, maxDim = 400, threshold = 0.1) {
  const { xmin, ymax, pixelWidth, pixelHeight, projection, width, height } = dsmNow
  const band = dsmNow.values[0]
  const noData = dsmNow.noDataValue
  const isGeographic = projection === 4326 || projection === '4326'
  const def = isGeographic ? null : proj4defForEPSG(Number(projection))
  const toLngLat = def ? (x, y) => proj4(def, 'EPSG:4326', [x, y]) : (x, y) => [x, y]

  const step = Math.max(1, Math.ceil(Math.max(width, height) / maxDim))
  const gw = Math.floor(width / step)
  const gh = Math.floor(height / step)

  // 1ª pasada: diferencias y máximo absoluto.
  const diffs = new Float32Array(gw * gh).fill(NaN)
  let maxAbs = 0
  let minDz = Infinity
  let maxDz = -Infinity
  for (let j = 0; j < gh; j++) {
    for (let i = 0; i < gw; i++) {
      const r = j * step
      const c = i * step
      const zNow = band[r][c]
      if (zNow == null || zNow === noData || Number.isNaN(zNow)) continue
      const x = xmin + (c + 0.5) * pixelWidth
      const y = ymax - (r + 0.5) * pixelHeight
      const [lng, lat] = toLngLat(x, y)
      const zPrev = sampleRasterAt(dsmPrev, lng, lat)
      if (zPrev == null) continue
      const dz = zNow - zPrev
      diffs[j * gw + i] = dz
      if (Math.abs(dz) > maxAbs) maxAbs = Math.abs(dz)
      if (dz < minDz) minDz = dz
      if (dz > maxDz) maxDz = dz
    }
  }

  // 2ª pasada: color divergente (azul=quitar, rojo=añadir).
  const rgba = new Uint8ClampedArray(gw * gh * 4)
  for (let k = 0; k < diffs.length; k++) {
    const dz = diffs[k]
    if (Number.isNaN(dz) || Math.abs(dz) < threshold) continue
    const t = Math.min(1, Math.abs(dz) / (maxAbs || 1))
    const o = k * 4
    if (dz > 0) {
      rgba[o] = 239; rgba[o + 1] = 68; rgba[o + 2] = 68
    } else {
      rgba[o] = 59; rgba[o + 1] = 130; rgba[o + 2] = 246
    }
    rgba[o + 3] = Math.round(60 + 180 * t)
  }

  // Límites geográficos del raster (esquinas, robusto para UTM).
  const corners = [
    toLngLat(xmin, ymax),
    toLngLat(xmin + width * pixelWidth, ymax),
    toLngLat(xmin, ymax - height * pixelHeight),
    toLngLat(xmin + width * pixelWidth, ymax - height * pixelHeight),
  ]
  const lngs = corners.map((c) => c[0])
  const lats = corners.map((c) => c[1])
  const bounds = [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ]

  return { rgba, gw, gh, bounds, minDz, maxDz, maxAbs }
}

/**
 * Cut/fill contra una superficie de diseño dentro de un polígono: cuánto
 * material hay que EXCAVAR (el terreno está por encima del diseño) y cuánto
 * RELLENAR (por debajo), para llevar el terreno a la rasante proyectada.
 *
 * La superficie de diseño puede ser una cota fija (designZ) o un plano
 * inclinado: designZ en un punto de referencia (refLng, refLat) + pendiente
 * (slopePct) en la dirección slopeDir (grados desde el norte, sentido horario).
 *
 * @param {object} georaster       DSM ya parseado
 * @param {Array<[lng,lat]>} ring  contorno en WGS84
 * @param {object} design
 * @param {number} design.z                 cota de diseño (m) en el punto de referencia
 * @param {[number,number]} [design.ref]    [lng,lat] de referencia (def. centroide)
 * @param {number} [design.slopePct=0]      pendiente en % (0 = plano horizontal)
 * @param {number} [design.slopeDir=0]      dirección de bajada (° desde el norte)
 * @returns {{cutM3:number, fillM3:number, netM3:number, cutAreaM2:number,
 *            fillAreaM2:number, cellCount:number}}
 */
export function computeCutFill(georaster, ring, design) {
  const band = georaster.values[0]
  const noData = georaster.noDataValue
  const { xmin, ymax, pixelWidth, pixelHeight, projection, width, height } = georaster
  const isGeographic = projection === 4326 || projection === '4326'
  const def = isGeographic ? null : proj4defForEPSG(Number(projection))
  const toLngLat = def ? (x, y) => proj4(def, 'EPSG:4326', [x, y]) : (x, y) => [x, y]
  const fromLngLat = def ? (lng, lat) => proj4('EPSG:4326', def, [lng, lat]) : (lng, lat) => [lng, lat]
  const poly = turfPolygon([[...ring, ring[0]]])
  const rb = ringBBoxInCRS(ring, fromLngLat)

  // Referencia del plano de diseño (por defecto, centroide del anillo).
  const ref = design.ref ?? [
    ring.reduce((s, p) => s + p[0], 0) / ring.length,
    ring.reduce((s, p) => s + p[1], 0) / ring.length,
  ]
  const [refX, refY] = fromLngLat(ref[0], ref[1])
  const slope = (design.slopePct ?? 0) / 100
  const dir = ((design.slopeDir ?? 0) * Math.PI) / 180
  // Vector de bajada en el plano (x=este, y=norte).
  const dx = Math.sin(dir)
  const dy = Math.cos(dir)

  const designZAt = (x, y) => {
    if (!slope) return design.z
    // Distancia proyectada sobre la dirección de bajada → resta de cota.
    const along = (x - refX) * dx + (y - refY) * dy
    return design.z - slope * along
  }

  let cut = 0
  let fill = 0
  let cutArea = 0
  let fillArea = 0
  let cells = 0
  for (let r = 0; r < height; r++) {
    const y = ymax - (r + 0.5) * pixelHeight
    if (y < rb.ymin || y > rb.ymax) continue
    const row = band[r]
    for (let c = 0; c < width; c++) {
      const z = row[c]
      if (z == null || z === noData || Number.isNaN(z)) continue
      const x = xmin + (c + 0.5) * pixelWidth
      if (x < rb.xmin || x > rb.xmax) continue
      const [lng, lat] = toLngLat(x, y)
      if (!booleanPointInPolygon(turfPoint([lng, lat]), poly)) continue
      const cellArea = isGeographic
        ? pixelWidth * metersPerDegLon(lat) * pixelHeight * METERS_PER_DEG_LAT
        : pixelWidth * pixelHeight
      const dz = z - designZAt(x, y)
      if (dz >= 0) { cut += dz * cellArea; cutArea += cellArea }
      else { fill += -dz * cellArea; fillArea += cellArea }
      cells++
    }
  }
  return { cutM3: cut, fillM3: fill, netM3: cut - fill, cutAreaM2: cutArea, fillAreaM2: fillArea, cellCount: cells }
}

/**
 * Mapa de calor de desviación contra una superficie de diseño: rojo = el
 * terreno está por encima (excavar), azul = por debajo (rellenar).
 * Misma estructura de salida que buildDiffGrid.
 */
export function buildDesignGrid(georaster, design, maxDim = 400, threshold = 0.1) {
  const { xmin, ymax, pixelWidth, pixelHeight, projection, width, height } = georaster
  const band = georaster.values[0]
  const noData = georaster.noDataValue
  const isGeographic = projection === 4326 || projection === '4326'
  const def = isGeographic ? null : proj4defForEPSG(Number(projection))
  const toLngLat = def ? (x, y) => proj4(def, 'EPSG:4326', [x, y]) : (x, y) => [x, y]
  const fromLngLat = def ? (lng, lat) => proj4('EPSG:4326', def, [lng, lat]) : (lng, lat) => [lng, lat]

  const ref = design.ref ?? [xmin, ymax]
  const [refX, refY] = design.ref ? fromLngLat(ref[0], ref[1]) : [xmin, ymax]
  const slope = (design.slopePct ?? 0) / 100
  const dir = ((design.slopeDir ?? 0) * Math.PI) / 180
  const ddx = Math.sin(dir), ddy = Math.cos(dir)
  const designZAt = (x, y) => (slope ? design.z - slope * ((x - refX) * ddx + (y - refY) * ddy) : design.z)

  const step = Math.max(1, Math.ceil(Math.max(width, height) / maxDim))
  const gw = Math.floor(width / step)
  const gh = Math.floor(height / step)
  const diffs = new Float32Array(gw * gh).fill(NaN)
  let maxAbs = 0, minDz = Infinity, maxDz = -Infinity
  for (let j = 0; j < gh; j++) {
    for (let i = 0; i < gw; i++) {
      const r = j * step, c = i * step
      const z = band[r][c]
      if (z == null || z === noData || Number.isNaN(z)) continue
      const x = xmin + (c + 0.5) * pixelWidth
      const y = ymax - (r + 0.5) * pixelHeight
      const dz = z - designZAt(x, y)
      diffs[j * gw + i] = dz
      if (Math.abs(dz) > maxAbs) maxAbs = Math.abs(dz)
      if (dz < minDz) minDz = dz
      if (dz > maxDz) maxDz = dz
    }
  }
  const rgba = new Uint8ClampedArray(gw * gh * 4)
  for (let k = 0; k < diffs.length; k++) {
    const dz = diffs[k]
    if (Number.isNaN(dz) || Math.abs(dz) < threshold) continue
    const tt = Math.min(1, Math.abs(dz) / (maxAbs || 1))
    const o = k * 4
    if (dz > 0) { rgba[o] = 239; rgba[o + 1] = 68; rgba[o + 2] = 68 } // excavar
    else { rgba[o] = 59; rgba[o + 1] = 130; rgba[o + 2] = 246 } // rellenar
    rgba[o + 3] = Math.round(60 + 180 * tt)
  }
  const corners = [
    toLngLat(xmin, ymax), toLngLat(xmin + width * pixelWidth, ymax),
    toLngLat(xmin, ymax - height * pixelHeight), toLngLat(xmin + width * pixelWidth, ymax - height * pixelHeight),
  ]
  const lngs = corners.map((cc) => cc[0]), lats = corners.map((cc) => cc[1])
  const bounds = [[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]]
  return { rgba, gw, gh, bounds, minDz, maxDz, maxAbs }
}

/**
 * ☀️ Mapa de sombras sobre el DSM para una posición solar dada: por cada
 * celda, marcha un rayo hacia el sol y comprueba si otra celda lo bloquea
 * (relieve, edificios, árboles del propio vuelo). Devuelve un overlay RGBA
 * (oscuro = en sombra) y la fracción en sombra.
 *
 * @param {object} georaster       DSM parseado
 * @param {number} sunElevDeg      elevación solar (grados sobre el horizonte)
 * @param {number} sunAzimuthDeg   azimut solar (° desde el norte, horario)
 * @param {number} maxDim          lado máximo de la rejilla (submuestreo)
 * @returns {{rgba:Uint8ClampedArray, gw:number, gh:number, bounds:Array,
 *            shadowFrac:number, sunUp:boolean}}
 */
export function computeShadowGrid(georaster, sunElevDeg, sunAzimuthDeg, maxDim = 400) {
  const { xmin, ymax, pixelWidth, pixelHeight, projection, width, height } = georaster
  const band = georaster.values[0]
  const noData = georaster.noDataValue
  const isGeographic = projection === 4326 || projection === '4326'
  const def = isGeographic ? null : proj4defForEPSG(Number(projection))
  const toLngLat = def ? (x, y) => proj4(def, 'EPSG:4326', [x, y]) : (x, y) => [x, y]

  const step = Math.max(1, Math.ceil(Math.max(width, height) / maxDim))
  const gw = Math.floor(width / step)
  const gh = Math.floor(height / step)

  // Tamaño de celda de la rejilla submuestreada en metros.
  const midLat = isGeographic ? (georaster.ymin + georaster.ymax) / 2 : 0
  const cellX = isGeographic ? pixelWidth * metersPerDegLon(midLat) * step : pixelWidth * step
  const cellY = isGeographic ? pixelHeight * METERS_PER_DEG_LAT * step : pixelHeight * step

  // Alturas de la rejilla.
  const Z = new Float32Array(gw * gh)
  for (let j = 0; j < gh; j++) {
    for (let i = 0; i < gw; i++) {
      const v = band[j * step][i * step]
      Z[j * gw + i] = v == null || v === noData || Number.isNaN(v) ? NaN : v
    }
  }

  const rgba = new Uint8ClampedArray(gw * gh * 4)
  const rad = Math.PI / 180
  const sunUp = sunElevDeg > 0.5
  let shadowCells = 0
  let validCells = 0

  if (sunUp) {
    // Dirección HACIA el sol en la rejilla (x=este col+, y=norte fila-).
    // azimut 0=N, 90=E: dx = sin(az) (este), dNorth = cos(az).
    const dCol = Math.sin(sunAzimuthDeg * rad) // +este = +col
    const dRow = -Math.cos(sunAzimuthDeg * rad) // +norte = -fila
    const tanElev = Math.tan(Math.max(0.5, sunElevDeg) * rad)
    // Metros por paso de 1 celda a lo largo del rayo (usa la métrica media).
    const stepLen = Math.hypot(dCol * cellX, dRow * cellY) || 1
    const maxSteps = Math.max(gw, gh)

    for (let j = 0; j < gh; j++) {
      for (let i = 0; i < gw; i++) {
        const z0 = Z[j * gw + i]
        if (Number.isNaN(z0)) continue
        validCells++
        let shadowed = false
        let ci = i, cj = j, dist = 0
        for (let s = 1; s <= maxSteps; s++) {
          ci = i + dCol * s
          cj = j + dRow * s
          const ii = Math.round(ci), jj = Math.round(cj)
          if (ii < 0 || jj < 0 || ii >= gw || jj >= gh) break
          const zc = Z[jj * gw + ii]
          if (Number.isNaN(zc)) continue
          dist = s * stepLen
          // Altura del rayo solar a esta distancia horizontal.
          const rayZ = z0 + dist * tanElev
          if (zc > rayZ + 0.05) { shadowed = true; break }
        }
        const o = (j * gw + i) * 4
        if (shadowed) {
          rgba[o] = 20; rgba[o + 1] = 30; rgba[o + 2] = 60; rgba[o + 3] = 130
          shadowCells++
        } else {
          rgba[o + 3] = 0 // al sol → transparente
        }
      }
    }
  } else {
    // Sol bajo el horizonte: todo en sombra (noche/crepúsculo).
    for (let j = 0; j < gh; j++) {
      for (let i = 0; i < gw; i++) {
        if (Number.isNaN(Z[j * gw + i])) continue
        validCells++; shadowCells++
        const o = (j * gw + i) * 4
        rgba[o] = 20; rgba[o + 1] = 30; rgba[o + 2] = 60; rgba[o + 3] = 150
      }
    }
  }

  const corners = [
    toLngLat(xmin, ymax), toLngLat(xmin + width * pixelWidth, ymax),
    toLngLat(xmin, ymax - height * pixelHeight), toLngLat(xmin + width * pixelWidth, ymax - height * pixelHeight),
  ]
  const lngs = corners.map((c) => c[0]), lats = corners.map((c) => c[1])
  const bounds = [[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]]
  return { rgba, gw, gh, bounds, shadowFrac: validCells ? shadowCells / validCells : 0, sunUp }
}

/**
 * Interpolación IDW (inverso de la distancia al cuadrado) desde muestras
 * {x, y, z} hacia un punto (x, y). Coordenadas en el CRS del raster.
 */
function idw(samples, x, y) {
  let num = 0
  let den = 0
  for (const s of samples) {
    const d2 = (s.x - x) ** 2 + (s.y - y) ** 2
    if (d2 < 1e-9) return s.z
    const w = 1 / d2
    num += w * s.z
    den += w
  }
  return den > 0 ? num / den : 0
}

/**
 * Calcula el volumen de material contenido dentro de un polígono sobre un DSM.
 *
 * Modos de plano base:
 *  - 'min'       cota mínima dentro del polígono (acopio sobre suelo plano)
 *  - 'mean'      cota media
 *  - 'custom'    cota fija (opts.baseValue)
 *  - 'perimeter' superficie interpolada (IDW) desde las celdas del borde del
 *                polígono — el estándar profesional para acopios en terreno
 *                irregular
 *  - 'grid'      superficie interpolada desde muestras externas
 *                (opts.baseSamples: [{lng, lat, z}]), p.ej. terreno oficial
 *                swissALTI3D
 *
 * @param {object} georaster       raster DSM ya parseado
 * @param {Array<[lng,lat]>} ring  anillo del polígono en lng/lat (WGS84)
 * @param {object} opts
 * @param {'min'|'mean'|'custom'|'perimeter'|'grid'} opts.baseMode
 * @param {number} [opts.baseValue]                     cota si baseMode='custom'
 * @param {Array<{lng:number,lat:number,z:number}>} [opts.baseSamples]  si baseMode='grid'
 * @returns {{ volumeM3:number, cutM3:number, fillM3:number, baseZ:number|null,
 *            minZ:number, maxZ:number, meanZ:number, cellCount:number,
 *            sampledAreaM2:number }}
 */
export function computeVolume(georaster, ring, opts = {}) {
  const { baseMode = 'min', baseValue, baseSamples } = opts
  const band = georaster.values[0]
  const noData = georaster.noDataValue
  const { xmin, ymax, pixelWidth, pixelHeight, projection, width, height } = georaster

  // Proyección del raster -> convertir cada centro de celda a lng/lat.
  const isGeographic = projection === 4326 || projection === '4326'
  const def = isGeographic ? null : proj4defForEPSG(Number(projection))
  const toLngLat = def
    ? (x, y) => proj4(def, 'EPSG:4326', [x, y])
    : (x, y) => [x, y] // asumimos ya geográfico si no hay def
  const fromLngLat = def
    ? (lng, lat) => proj4('EPSG:4326', def, [lng, lat])
    : (lng, lat) => [lng, lat]

  const poly = turfPolygon([[...ring, ring[0]]])
  const rb = ringBBoxInCRS(ring, fromLngLat)

  // 1ª pasada: recolectar cotas dentro del polígono, con posición de celda
  // para poder detectar el borde e interpolar planos base no horizontales.
  const inside = [] // { z, area, x, y, r, c }
  const insideKeys = new Set()
  let minZ = Infinity
  let maxZ = -Infinity
  let sumZ = 0

  for (let r = 0; r < height; r++) {
    const y = ymax - (r + 0.5) * pixelHeight
    if (y < rb.ymin || y > rb.ymax) continue
    const row = band[r]
    for (let c = 0; c < width; c++) {
      const z = row[c]
      if (z == null || z === noData || isNaN(z)) continue
      const x = xmin + (c + 0.5) * pixelWidth
      if (x < rb.xmin || x > rb.xmax) continue
      const [lng, lat] = toLngLat(x, y)
      if (!booleanPointInPolygon(turfPoint([lng, lat]), poly)) continue

      // Área en el suelo de la celda, en m².
      let cellArea
      if (isGeographic) {
        cellArea = pixelWidth * metersPerDegLon(lat) * pixelHeight * METERS_PER_DEG_LAT
      } else {
        cellArea = pixelWidth * pixelHeight // ya en metros
      }
      inside.push({ z, area: cellArea, x, y, r, c })
      insideKeys.add(r * width + c)
      if (z < minZ) minZ = z
      if (z > maxZ) maxZ = z
      sumZ += z
    }
  }

  if (inside.length === 0) {
    return {
      volumeM3: 0, cutM3: 0, fillM3: 0, baseZ: 0,
      minZ: 0, maxZ: 0, meanZ: 0, cellCount: 0, sampledAreaM2: 0,
    }
  }

  const meanZ = sumZ / inside.length

  // Determina la cota base por celda según el modo.
  let baseFor // (cell) => cota base
  let baseZ = null // valor representativo para mostrar (solo planos horizontales)

  if (baseMode === 'grid' && baseSamples?.length) {
    const samples = baseSamples.map(({ lng, lat, z }) => {
      const [sx, sy] = fromLngLat(lng, lat)
      return { x: sx, y: sy, z }
    })
    baseFor = (cell) => idw(samples, cell.x, cell.y)
  } else if (baseMode === 'perimeter') {
    // Celdas del borde: dentro del polígono con algún 4-vecino fuera.
    let boundary = inside.filter(({ r, c }) =>
      !insideKeys.has(r * width + (c - 1)) ||
      !insideKeys.has(r * width + (c + 1)) ||
      !insideKeys.has((r - 1) * width + c) ||
      !insideKeys.has((r + 1) * width + c)
    )
    // Submuestreo para mantener el IDW barato en polígonos grandes.
    const MAX_BOUNDARY = 240
    if (boundary.length > MAX_BOUNDARY) {
      const step = boundary.length / MAX_BOUNDARY
      boundary = Array.from({ length: MAX_BOUNDARY }, (_, i) => boundary[Math.floor(i * step)])
    }
    const samples = boundary.map(({ x, y, z }) => ({ x, y, z }))
    baseFor = (cell) => idw(samples, cell.x, cell.y)
  } else {
    if (baseMode === 'custom' && typeof baseValue === 'number') baseZ = baseValue
    else if (baseMode === 'mean') baseZ = meanZ
    else baseZ = minZ
    const flat = baseZ
    baseFor = () => flat
  }

  // 2ª pasada: integrar volumen sobre/bajo la superficie base.
  let fill = 0 // material por encima de la base (acopio)
  let cut = 0 // hueco por debajo de la base (excavación)
  let sampledArea = 0
  for (const cell of inside) {
    const dz = cell.z - baseFor(cell)
    if (dz >= 0) fill += dz * cell.area
    else cut += -dz * cell.area
    sampledArea += cell.area
  }

  return {
    volumeM3: fill - cut,
    fillM3: fill,
    cutM3: cut,
    baseZ,
    minZ,
    maxZ,
    meanZ,
    cellCount: inside.length,
    sampledAreaM2: sampledArea,
  }
}
