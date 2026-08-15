// 📡 Viento y clima MEDIDOS ahora mismo por la red oficial SwissMetNet de
// MeteoSuiza (open data, sin clave): estación automática más cercana y sus
// últimos valores de 10 minutos. Complementa el pronóstico de Open-Meteo con
// la realidad medida en tierra — la diferencia entre "debería poder volar" y
// "el anemómetro dice que sí".
//
// Referencia: https://opendatadocs.meteoswiss.ch/a-data-groundbased/a1-automatic-weather-stations

const BASE = 'https://data.geo.admin.ch/ch.meteoschweiz.ogd-smn'

let stationsPromise = null

/**
 * Lista de estaciones automáticas SwissMetNet (se descarga una vez por sesión).
 * @returns {Promise<Array<{abbr:string, name:string, canton:string, lat:number, lng:number, heightM:number}>>}
 */
export async function loadStations() {
  if (!stationsPromise) {
    stationsPromise = (async () => {
      const res = await fetch(`${BASE}/ogd-smn_meta_stations.csv`)
      if (!res.ok) throw new Error(`MeteoSuiza respondió HTTP ${res.status}`)
      // El CSV viene en ISO-8859-1 (nombres con umlauts).
      const text = new TextDecoder('iso-8859-1').decode(await res.arrayBuffer())
      const lines = text.split('\n').filter((l) => l.trim())
      const head = lines[0].split(';')
      const col = Object.fromEntries(head.map((h, i) => [h.trim(), i]))
      return lines
        .slice(1)
        .map((l) => {
          const f = l.split(';')
          return {
            abbr: f[col.station_abbr],
            name: f[col.station_name],
            canton: f[col.station_canton],
            lat: parseFloat(f[col.station_coordinates_wgs84_lat]),
            lng: parseFloat(f[col.station_coordinates_wgs84_lon]),
            heightM: parseFloat(f[col.station_height_masl]),
          }
        })
        .filter((s) => s.abbr && Number.isFinite(s.lat) && Number.isFinite(s.lng))
    })().catch((err) => {
      stationsPromise = null // permitir reintento si falló la red
      throw err
    })
  }
  return stationsPromise
}

/** Distancia haversine en km. */
export function distanceKM(lng1, lat1, lng2, lat2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

/**
 * Últimos valores de 10 minutos de una estación (archivo *_t_now.csv).
 * Unidades ya normalizadas: viento y rachas en m/s.
 * @returns {Promise<null|{timestamp:Date|null, ageMin:number|null, windMS:number,
 *   gustMS:number|null, windDirDeg:number|null, tempC:number|null,
 *   precipMM10:number|null, radiationWM2:number|null, humidityPct:number|null}>}
 */
export async function fetchStationNow(abbr) {
  const a = abbr.toLowerCase()
  let text
  try {
    const res = await fetch(`${BASE}/${a}/ogd-smn_${a}_t_now.csv`)
    if (!res.ok) return null
    text = await res.text()
  } catch {
    return null
  }
  const lines = text.split('\n').filter((l) => l.trim())
  if (lines.length < 2) return null
  const col = Object.fromEntries(lines[0].split(';').map((h, i) => [h.trim(), i]))

  // Última fila con medición de viento (las más recientes están al final).
  for (let i = lines.length - 1; i >= 1; i--) {
    const f = lines[i].split(';')
    const num = (key) => {
      const j = col[key]
      if (j == null) return null
      const v = parseFloat(f[j])
      return Number.isFinite(v) ? v : null
    }
    const windMS = num('fkl010z0') // media escalar 10 min, ya en m/s
    if (windMS == null) continue

    // reference_timestamp "15.08.2026 00:10" en UTC.
    const m = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})/.exec(f[col.reference_timestamp] ?? '')
    const ts = m ? new Date(Date.UTC(+m[3], +m[2] - 1, +m[1], +m[4], +m[5])) : null
    const gustKMH = num('fu3010z1') // racha máxima (1 s), en km/h
    return {
      timestamp: ts,
      ageMin: ts ? Math.max(0, Math.round((Date.now() - ts.getTime()) / 60000)) : null,
      windMS,
      gustMS: gustKMH != null ? gustKMH / 3.6 : null,
      windDirDeg: num('dkl010z0'),
      tempC: num('tre200s0'),
      precipMM10: num('rre150z0'),
      radiationWM2: num('gre000z0'),
      humidityPct: num('ure200s0'),
    }
  }
  return null
}

/**
 * Datos medidos de la estación con datos más cercana a un punto (prueba hasta
 * 3 estaciones por si la más próxima no publica viento).
 * @returns {Promise<null|{station:object, distanceKM:number, data:object}>}
 */
export async function fetchNearestLive(lng, lat, maxKM = 50) {
  const stations = await loadStations()
  const sorted = stations
    .map((s) => ({ ...s, dist: distanceKM(lng, lat, s.lng, s.lat) }))
    .filter((s) => s.dist <= maxKM)
    .sort((a, b) => a.dist - b.dist)
  for (const s of sorted.slice(0, 3)) {
    const data = await fetchStationNow(s.abbr)
    if (data) return { station: s, distanceKM: s.dist, data }
  }
  return null
}
