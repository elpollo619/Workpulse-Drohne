// 🏗️ Exportación CAD del proyecto: DXF 3D (AutoCAD/ArchiCAD/Vectorworks/
// BricsCAD) y nube de puntos XYZ, siempre en coordenadas suizas LV95 y metros.
//
// El DXF es R12 (el dialecto que TODO programa CAD lee) y organiza el
// contenido por capas: TERRENO (malla 3DFACE del DSM), MEDICIONES (líneas 3D),
// PUNTOS, ETIQUETAS y ORIGEN. Como los CAD de arquitectura sufren con
// coordenadas a 2.6 millones de metros del origen (ArchiCAD avisa de
// "far from origin"), por defecto se restan unas constantes redondas y se
// documenta el desplazamiento dentro del propio archivo.

import proj4module from 'proj4'
import { wgs84ToLV95 } from './swiss.js'
import { proj4defForEPSG, sampleRasterAt } from './raster.js'

const proj4 = proj4module.default ?? proj4module

const fmt = (v) => (Math.round(v * 1000) / 1000).toString()

/** Conversor (x, y) del CRS del raster → LV95 {e, n}. */
function toLV95FromRaster(georaster) {
  const epsg = Number(georaster.projection)
  if (epsg === 2056) return (x, y) => ({ e: x, n: y })
  if (epsg === 4326) return (x, y) => wgs84ToLV95(x, y)
  const def = proj4defForEPSG(epsg)
  if (!def) return null
  return (x, y) => {
    const [lng, lat] = proj4(def, 'EPSG:4326', [x, y])
    return wgs84ToLV95(lng, lat)
  }
}

/**
 * Extrae de un DSM una malla de vértices LV95 decimada.
 * @returns {{ verts: Array<Array<{e,n,z}|null>>, rows: number, cols: number }}
 */
function meshFromDSM(georaster, maxDim = 150) {
  const { width, height, pixelWidth, pixelHeight, xmin, ymax, noDataValue } = georaster
  const band = georaster.values[0]
  const conv = toLV95FromRaster(georaster)
  if (!conv) return null
  const step = Math.max(1, Math.ceil(Math.max(width, height) / maxDim))
  const cols = Math.floor(width / step)
  const rows = Math.floor(height / step)
  const verts = []
  for (let j = 0; j < rows; j++) {
    const row = []
    for (let i = 0; i < cols; i++) {
      const r = j * step
      const c = i * step
      const z = band[r][c]
      if (z == null || z === noDataValue || Number.isNaN(z)) {
        row.push(null)
        continue
      }
      const x = xmin + (c + 0.5) * pixelWidth
      const y = ymax - (r + 0.5) * pixelHeight
      const { e, n } = conv(x, y)
      row.push({ e, n, z })
    }
    verts.push(row)
  }
  return { verts, rows, cols }
}

const LAYERS = [
  ['TERRENO', 8],
  ['MEDICIONES', 3],
  ['PUNTOS', 1],
  ['GCP', 5],
  ['ETIQUETAS', 2],
  ['ORIGEN', 6],
]

/**
 * Construye el contenido DXF R12.
 *
 * @param {object} opts
 * @param {object} [opts.dsm]  georaster: se exporta como malla 3DFACE
 * @param {Array<{coords:Array<[lng,lat]>, label:string, closed:boolean}>} [opts.measurements]
 * @param {Array<{lng:number, lat:number, elev:number|null, label:string}>} [opts.points]
 * @param {Array<{lng:number, lat:number, elev:number, name:string}>} [opts.gcps]
 * @param {boolean} [opts.reduceOrigin=true]  restar origen local redondo
 * @param {number} [opts.maxDim=150]          lado máx. de la malla del terreno
 * @returns {{ dxf: string, faces: number, origin: {e:number, n:number} }}
 */
export function buildDXF3D({ dsm, measurements = [], points = [], gcps = [], reduceOrigin = true, maxDim = 150 }) {
  const mesh = dsm ? meshFromDSM(dsm, maxDim) : null
  const zAt = (lng, lat) => (dsm ? sampleRasterAt(dsm, lng, lat) : null)

  // Geometría de mediciones/puntos en LV95 con cota del DSM si existe.
  const mLines = measurements.map((m) => ({
    label: m.label,
    pts: m.coords.map(([lng, lat]) => {
      const { e, n } = wgs84ToLV95(lng, lat)
      return { e, n, z: zAt(lng, lat) ?? 0 }
    }),
    closed: m.closed,
  }))
  const pPts = [...points.map((p) => ({ ...p, layer: 'PUNTOS' })), ...gcps.map((g) => ({ lng: g.lng, lat: g.lat, elev: g.elev, label: g.name, layer: 'GCP' }))]
    .map((p) => {
      const { e, n } = wgs84ToLV95(p.lng, p.lat)
      return { e, n, z: p.elev ?? zAt(p.lng, p.lat) ?? 0, label: p.label, layer: p.layer }
    })

  // Origen local: mínimo E/N de toda la geometría, redondeado a 100 m.
  let minE = Infinity
  let minN = Infinity
  const track = (e, n) => {
    if (e < minE) minE = e
    if (n < minN) minN = n
  }
  mesh?.verts.forEach((row) => row.forEach((v) => v && track(v.e, v.n)))
  mLines.forEach((m) => m.pts.forEach((p) => track(p.e, p.n)))
  pPts.forEach((p) => track(p.e, p.n))
  if (!isFinite(minE)) {
    minE = 2600000
    minN = 1200000
  }
  const origin = reduceOrigin
    ? { e: Math.floor(minE / 100) * 100, n: Math.floor(minN / 100) * 100 }
    : { e: 0, n: 0 }

  const E = []
  const push = (...codes) => E.push(...codes)

  // Terreno como caras 3D (dos triángulos por celda).
  let faces = 0
  if (mesh) {
    const face3 = (a, b, c) => {
      push('0', '3DFACE', '8', 'TERRENO',
        '10', fmt(a.e - origin.e), '20', fmt(a.n - origin.n), '30', fmt(a.z),
        '11', fmt(b.e - origin.e), '21', fmt(b.n - origin.n), '31', fmt(b.z),
        '12', fmt(c.e - origin.e), '22', fmt(c.n - origin.n), '32', fmt(c.z),
        '13', fmt(c.e - origin.e), '23', fmt(c.n - origin.n), '33', fmt(c.z))
      faces++
    }
    for (let j = 0; j + 1 < mesh.rows; j++) {
      for (let i = 0; i + 1 < mesh.cols; i++) {
        const a = mesh.verts[j][i]
        const b = mesh.verts[j][i + 1]
        const c = mesh.verts[j + 1][i + 1]
        const d = mesh.verts[j + 1][i]
        if (a && b && c) face3(a, b, c)
        if (a && c && d) face3(a, c, d)
      }
    }
  }

  // Mediciones: líneas 3D + etiqueta en el punto medio.
  for (const m of mLines) {
    const segs = m.closed ? m.pts.length : m.pts.length - 1
    for (let i = 0; i < segs; i++) {
      const p1 = m.pts[i]
      const p2 = m.pts[(i + 1) % m.pts.length]
      push('0', 'LINE', '8', 'MEDICIONES',
        '10', fmt(p1.e - origin.e), '20', fmt(p1.n - origin.n), '30', fmt(p1.z),
        '11', fmt(p2.e - origin.e), '21', fmt(p2.n - origin.n), '31', fmt(p2.z))
    }
    if (m.label && m.pts.length) {
      const cx = m.pts.reduce((s, p) => s + p.e, 0) / m.pts.length
      const cy = m.pts.reduce((s, p) => s + p.n, 0) / m.pts.length
      const cz = m.pts.reduce((s, p) => s + p.z, 0) / m.pts.length
      push('0', 'TEXT', '8', 'ETIQUETAS',
        '10', fmt(cx - origin.e), '20', fmt(cy - origin.n), '30', fmt(cz),
        '40', '0.5', '1', m.label)
    }
  }

  // Puntos GPS y GCP: entidad POINT + etiqueta con nombre y cota.
  for (const p of pPts) {
    push('0', 'POINT', '8', p.layer,
      '10', fmt(p.e - origin.e), '20', fmt(p.n - origin.n), '30', fmt(p.z))
    push('0', 'TEXT', '8', 'ETIQUETAS',
      '10', fmt(p.e - origin.e + 0.5), '20', fmt(p.n - origin.n + 0.5), '30', fmt(p.z),
      '40', '0.4', '1', `${p.label} (${p.z.toFixed(2)} m)`)
  }

  // Nota de origen, en el propio dibujo.
  const originNote = reduceOrigin
    ? `Origen local: sumar E+${origin.e} / N+${origin.n} para LV95 absoluto (EPSG:2056). Unidades: metros.`
    : 'Coordenadas absolutas LV95 (EPSG:2056). Unidades: metros.'
  push('0', 'TEXT', '8', 'ORIGEN', '10', '0', '20', '-2', '30', '0', '40', '0.6', '1', originNote)

  const layerRows = LAYERS.flatMap(([name, color]) => [
    '0', 'LAYER', '2', name, '70', '0', '62', String(color), '6', 'CONTINUOUS',
  ])

  const dxf = [
    '999', 'Workpulse Drohne - exportacion CAD 3D',
    '999', originNote,
    '0', 'SECTION', '2', 'HEADER',
    '9', '$INSUNITS', '70', '6', // metros
    '0', 'ENDSEC',
    '0', 'SECTION', '2', 'TABLES',
    '0', 'TABLE', '2', 'LAYER', '70', String(LAYERS.length),
    ...layerRows,
    '0', 'ENDTAB',
    '0', 'ENDSEC',
    '0', 'SECTION', '2', 'ENTITIES',
    ...E,
    '0', 'ENDSEC',
    '0', 'EOF',
  ].join('\r\n')

  return { dxf, faces, origin }
}

/**
 * Nube de puntos XYZ del DSM en LV95 absoluto ("E N Z" por línea, metros,
 * precisión cm). ArchiCAD, Vectorworks y CloudCompare la importan directa.
 */
export function buildXYZ(georaster, maxPoints = 250000) {
  const { width, height, pixelWidth, pixelHeight, xmin, ymax, noDataValue } = georaster
  const band = georaster.values[0]
  const conv = toLV95FromRaster(georaster)
  if (!conv) return null
  const step = Math.max(1, Math.ceil(Math.sqrt((width * height) / maxPoints)))
  const lines = []
  for (let r = 0; r < height; r += step) {
    for (let c = 0; c < width; c += step) {
      const z = band[r][c]
      if (z == null || z === noDataValue || Number.isNaN(z)) continue
      const x = xmin + (c + 0.5) * pixelWidth
      const y = ymax - (r + 0.5) * pixelHeight
      const { e, n } = conv(x, y)
      lines.push(`${e.toFixed(2)} ${n.toFixed(2)} ${z.toFixed(2)}`)
    }
  }
  return lines.join('\n')
}

function downloadText(filename, text, mime = 'application/octet-stream') {
  const url = URL.createObjectURL(new Blob([text], { type: mime }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function downloadDXF3D(name, opts) {
  const { dxf, faces, origin } = buildDXF3D(opts)
  downloadText(`${name || 'proyecto'}-3d.dxf`, dxf, 'application/dxf')
  return { faces, origin }
}

export function downloadXYZ(name, georaster) {
  const xyz = buildXYZ(georaster)
  if (!xyz) return null
  downloadText(`${name || 'terreno'}-nube.xyz`, xyz, 'text/plain')
  return { points: xyz.split('\n').length }
}
