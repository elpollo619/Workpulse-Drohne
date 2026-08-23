// 📒 Libro de vuelos: importa el registro CSV de un vuelo (exportación de
// Airdata, Litchi, DJI Flight Record convertido, o cualquier CSV con columnas
// de tiempo/lat/lng/altura) y extrae duración, altura máxima, distancia
// recorrida y distancia máxima al punto de despegue. Cubre la obligación
// práctica de llevar un libro de vuelos (operador registrado BAZL/EASA), todo
// local y sin depender de servicios en la nube.

const METERS_PER_DEG_LAT = 110540
const metersPerDegLon = (lat) => 111320 * Math.cos((lat * Math.PI) / 180)

// Palabras clave por columna (ASCII, ya normalizadas) para autodetección.
const COLS = {
  lat: ['latitude', 'lat', 'osd_lat', 'gps_lat', 'breite'],
  lng: ['longitude', 'lng', 'lon', 'long', 'osd_lon', 'gps_lng', 'gps_lon', 'lange', 'laenge'],
  alt: ['altitude', 'height', 'alt', 'osd_height', 'relativeheight', 'hohe', 'hoehe', 'agl'],
  time: ['time', 'timestamp', 'datetime', 'flytime', 'zeit'],
}

const normStr = (h) => h.toLowerCase()
  .replace(/[áàä]/g, 'a').replace(/[éè]/g, 'e').replace(/[íì]/g, 'i')
  .replace(/[óòö]/g, 'o').replace(/[úùü]/g, 'u').trim()

function detect(headers) {
  const norm = headers.map(normStr)
  const find = (keys) => {
    for (const k of keys) { const i = norm.indexOf(k); if (i >= 0) return i }
    for (let i = 0; i < norm.length; i++) if (keys.some((k) => norm[i].includes(k))) return i
    return -1
  }
  const time = find(COLS.time)
  // Milisegundos si el nombre de la columna lo indica.
  const timeIsMs = time >= 0 && /millisecond|\bms\b|\(ms\)/.test(norm[time])
  return { lat: find(COLS.lat), lng: find(COLS.lng), alt: find(COLS.alt), time, timeIsMs }
}

/** Parte una línea CSV respetando comillas simples. */
function splitCSV(line) {
  const out = []
  let cur = '', q = false
  for (const ch of line) {
    if (ch === '"') q = !q
    else if (ch === ',' && !q) { out.push(cur); cur = '' }
    else cur += ch
  }
  out.push(cur)
  return out
}

/** Interpreta un valor de tiempo a segundos. isMs = la columna es milisegundos. */
function parseTime(v, i, isMs) {
  const n = parseFloat(v)
  if (!isNaN(n)) return (isMs || n > 1e7) ? n / 1000 : n // ms → s
  const d = Date.parse(v)
  return isNaN(d) ? i : d / 1000
}

/**
 * Parsea un CSV de vuelo.
 * @returns {null|{points:Array<{lat,lng,alt}>, stats:{
 *   durationS:number, maxAltM:number, distanceM:number, maxHomeDistM:number,
 *   pointCount:number}}}
 */
export function parseFlightLog(csvText) {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim())
  if (lines.length < 3) return null
  const headers = splitCSV(lines[0])
  const col = detect(headers)
  if (col.lat < 0 || col.lng < 0) return null

  const points = []
  const times = []
  for (let i = 1; i < lines.length; i++) {
    const f = splitCSV(lines[i])
    const lat = parseFloat(f[col.lat])
    const lng = parseFloat(f[col.lng])
    if (!isFinite(lat) || !isFinite(lng) || (lat === 0 && lng === 0)) continue
    const alt = col.alt >= 0 ? parseFloat(f[col.alt]) : null
    points.push({ lat, lng, alt: isFinite(alt) ? alt : null })
    times.push(col.time >= 0 ? parseTime(f[col.time], i, col.timeIsMs) : i)
  }
  if (points.length < 2) return null

  // Estadísticas.
  const home = points[0]
  const kx = metersPerDegLon(home.lat)
  let distance = 0, maxHome = 0, maxAlt = -Infinity
  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    if (p.alt != null && p.alt > maxAlt) maxAlt = p.alt
    const hx = (p.lng - home.lng) * kx
    const hy = (p.lat - home.lat) * METERS_PER_DEG_LAT
    const hd = Math.hypot(hx, hy)
    if (hd > maxHome) maxHome = hd
    if (i > 0) {
      const dx = (p.lng - points[i - 1].lng) * kx
      const dy = (p.lat - points[i - 1].lat) * METERS_PER_DEG_LAT
      distance += Math.hypot(dx, dy)
    }
  }
  const durationS = Math.max(0, times[times.length - 1] - times[0])

  return {
    points,
    stats: {
      durationS,
      maxAltM: isFinite(maxAlt) ? maxAlt : null,
      distanceM: distance,
      maxHomeDistM: maxHome,
      pointCount: points.length,
    },
  }
}

/** Formatea segundos como m:ss. */
export function fmtDuration(s) {
  const m = Math.floor(s / 60)
  const sec = Math.round(s % 60)
  return `${m}:${String(sec).padStart(2, '0')}`
}

/** Exporta el libro de vuelos (lista de vuelos) como CSV. */
export function exportLogbookCSV(flights, projectName) {
  const head = 'fecha,nombre,duracion_min,altura_max_m,distancia_m,dist_max_despegue_m'
  const rows = flights.map((f) =>
    [f.date ?? '', (f.name ?? '').replace(/,/g, ' '),
     (f.durationS / 60).toFixed(1), f.maxAltM?.toFixed(1) ?? '', f.distanceM.toFixed(0), f.maxHomeDistM.toFixed(0)].join(','))
  const csv = [head, ...rows].join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${(projectName || 'libro-de-vuelos').replace(/[^a-zA-Z0-9-_]+/g, '-')}-logbook.csv`
  a.click()
  URL.revokeObjectURL(url)
}
