// Carga de GeoTIFF (ortomosaico / DSM) y cálculo de volumen.
//
// Los productos de fotogrametría (p.ej. de OpenDroneMap) suelen exportarse en
// una proyección UTM métrica, mientras que el mapa de Leaflet trabaja en
// lng/lat (WGS84). Aquí resolvemos esa diferencia con proj4 para que el volumen
// se calcule correctamente en metros cúbicos reales.

import parseGeoraster from 'georaster'
import proj4 from 'proj4'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { polygon as turfPolygon, point as turfPoint } from '@turf/helpers'

/** Devuelve una definición proj4 para un código EPSG común (4326, 3857, UTM). */
function proj4defForEPSG(epsg) {
  if (!epsg) return null
  if (epsg === 4326) return 'EPSG:4326'
  if (epsg === 3857) return 'EPSG:3857'
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
 * Calcula el volumen de material contenido dentro de un polígono sobre un DSM.
 *
 * @param {object} georaster       raster DSM ya parseado
 * @param {Array<[lng,lat]>} ring  anillo del polígono en lng/lat (WGS84)
 * @param {object} opts
 * @param {'min'|'mean'|'custom'} opts.baseMode  cómo definir el plano base
 * @param {number} [opts.baseValue]              cota base si baseMode = 'custom'
 * @returns {{ volumeM3:number, cutM3:number, fillM3:number, baseZ:number,
 *            minZ:number, maxZ:number, meanZ:number, cellCount:number,
 *            sampledAreaM2:number }}
 */
export function computeVolume(georaster, ring, opts = {}) {
  const { baseMode = 'min', baseValue } = opts
  const band = georaster.values[0]
  const noData = georaster.noDataValue
  const { xmin, ymax, pixelWidth, pixelHeight, projection, width, height } = georaster

  // Proyección del raster -> convertir cada centro de celda a lng/lat.
  const isGeographic = projection === 4326 || projection === '4326'
  const def = isGeographic ? null : proj4defForEPSG(Number(projection))
  const toLngLat = def
    ? (x, y) => proj4(def, 'EPSG:4326', [x, y])
    : (x, y) => [x, y] // asumimos ya geográfico si no hay def

  const poly = turfPolygon([[...ring, ring[0]]])

  // 1ª pasada: recolectar cotas dentro del polígono.
  const inside = [] // { z, areaM2 }
  let minZ = Infinity
  let maxZ = -Infinity
  let sumZ = 0

  for (let r = 0; r < height; r++) {
    const y = ymax - (r + 0.5) * pixelHeight
    const row = band[r]
    for (let c = 0; c < width; c++) {
      const z = row[c]
      if (z == null || z === noData || isNaN(z)) continue
      const x = xmin + (c + 0.5) * pixelWidth
      const [lng, lat] = toLngLat(x, y)
      if (!booleanPointInPolygon(turfPoint([lng, lat]), poly)) continue

      // Área en el suelo de la celda, en m².
      let cellArea
      if (isGeographic) {
        cellArea = pixelWidth * metersPerDegLon(lat) * pixelHeight * METERS_PER_DEG_LAT
      } else {
        cellArea = pixelWidth * pixelHeight // ya en metros
      }
      inside.push({ z, area: cellArea })
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
  let baseZ
  if (baseMode === 'custom' && typeof baseValue === 'number') baseZ = baseValue
  else if (baseMode === 'mean') baseZ = meanZ
  else baseZ = minZ

  // 2ª pasada: integrar volumen sobre/bajo el plano base.
  let fill = 0 // material por encima de la base (acopio)
  let cut = 0 // hueco por debajo de la base (excavación)
  let sampledArea = 0
  for (const { z, area } of inside) {
    const dz = z - baseZ
    if (dz >= 0) fill += dz * area
    else cut += -dz * area
    sampledArea += area
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
