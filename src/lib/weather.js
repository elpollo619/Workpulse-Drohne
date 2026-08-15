// Condiciones de vuelo para drones: meteo en vivo (Open-Meteo, gratis y sin
// clave) + posición solar (fórmulas NOAA simplificadas) + veredicto de vuelo
// pensado para un drone ligero (<250 g) como el DJI Mini 4 Pro.

/** Elevación solar en grados para una posición y fecha (aprox. NOAA, ±1°). */
export function sunElevation(lat, lng, date = new Date()) {
  const rad = Math.PI / 180
  const start = Date.UTC(date.getUTCFullYear(), 0, 0)
  const dayOfYear = Math.floor((date.getTime() - start) / 86400000)
  const decl = 23.45 * Math.sin(rad * (360 / 365) * (284 + dayOfYear))
  const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60
  const solarTime = utcHours + lng / 15
  const hourAngle = (solarTime - 12) * 15
  const elev = Math.asin(
    Math.sin(rad * lat) * Math.sin(rad * decl) +
    Math.cos(rad * lat) * Math.cos(rad * decl) * Math.cos(rad * hourAngle)
  ) / rad
  return elev
}

// Umbrales para un drone <250 g.
const WIND_WARN = 5    // m/s
const WIND_MAX = 8     // m/s (el límite técnico del Mini 4 Pro es ~10.7)
const GUST_MAX = 10    // m/s
const RAIN_PROB_WARN = 40 // %

/**
 * Evalúa condiciones actuales.
 * @returns {{ level:'ok'|'warn'|'no', reasons:string[] }}
 */
export function flightVerdict({ windMS, gustMS, precipMM, tempC, sunElev }) {
  const reasons = []
  let level = 'ok'
  const warn = (msg) => { reasons.push(msg); if (level === 'ok') level = 'warn' }
  const no = (msg) => { reasons.push(msg); level = 'no' }

  if (windMS > WIND_MAX) no(`Viento ${windMS.toFixed(1)} m/s — demasiado para un drone ligero`)
  else if (windMS > WIND_WARN) warn(`Viento ${windMS.toFixed(1)} m/s — volable con cuidado`)
  if (gustMS > GUST_MAX) no(`Rachas de ${gustMS.toFixed(1)} m/s`)
  if (precipMM > 0) no('Está precipitando — los drones no son impermeables')
  if (tempC < 0) warn(`${tempC.toFixed(0)} °C — la batería rinde menos con frío`)
  if (tempC > 38) warn(`${tempC.toFixed(0)} °C — riesgo de sobrecalentamiento`)
  if (sunElev != null) {
    if (sunElev <= 0) warn('Es de noche — vuelo nocturno con requisitos extra')
    else if (sunElev < 20) warn(`Sol bajo (${sunElev.toFixed(0)}°) — sombras largas, peor fotogrametría`)
  }
  if (!reasons.length) reasons.push('Viento suave, sin lluvia y buena luz')
  return { level, reasons }
}

/**
 * Consulta Open-Meteo y devuelve condiciones actuales + veredicto + mejores
 * horas de hoy para fotogrametría.
 */
export async function fetchFlightConditions(lat, lng) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(3)}&longitude=${lng.toFixed(3)}` +
    '&current=temperature_2m,wind_speed_10m,wind_gusts_10m,precipitation' +
    '&hourly=wind_speed_10m,wind_gusts_10m,precipitation_probability' +
    '&forecast_days=1&wind_speed_unit=ms&timezone=auto'
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Meteo no disponible (${res.status})`)
  const data = await res.json()

  const cur = data.current
  const sunNow = sunElevation(lat, lng)
  const verdict = flightVerdict({
    windMS: cur.wind_speed_10m,
    gustMS: cur.wind_gusts_10m,
    precipMM: cur.precipitation,
    tempC: cur.temperature_2m,
    sunElev: sunNow,
  })

  // Mejores horas de hoy: viento suave, pocas probabilidades de lluvia y sol alto.
  const goodHours = []
  const H = data.hourly
  for (let i = 0; i < H.time.length; i++) {
    const t = new Date(H.time[i])
    if (t < new Date()) continue
    const elev = sunElevation(lat, lng, t)
    if (H.wind_speed_10m[i] <= WIND_WARN && (H.precipitation_probability?.[i] ?? 0) < RAIN_PROB_WARN && elev >= 25) {
      goodHours.push(t.getHours())
    }
  }
  // Compacta horas consecutivas en rangos "10–13 h".
  const windows = []
  for (let i = 0; i < goodHours.length; i++) {
    if (windows.length && goodHours[i] === goodHours[i - 1] + 1) windows[windows.length - 1][1] = goodHours[i]
    else windows.push([goodHours[i], goodHours[i]])
  }

  return {
    tempC: cur.temperature_2m,
    windMS: cur.wind_speed_10m,
    gustMS: cur.wind_gusts_10m,
    precipMM: cur.precipitation,
    sunElev: sunNow,
    verdict,
    windows: windows.map(([a, b]) => (a === b ? `${a} h` : `${a}–${b + 1} h`)),
  }
}
