// Integración con la infraestructura geoespacial oficial suiza (swisstopo /
// geo.admin.ch): sistema de coordenadas LV95, servicio de altura swissALTI3D y
// capas base WMTS. Todo es open data oficial, sin clave de API.
//
// Referencias:
//   https://api3.geo.admin.ch/services/sdiservices.html
//   https://www.swisstopo.admin.ch/en/geodata

import proj4module from 'proj4'

// Interop CJS/ESM: en el build de producción el import puede llegar envuelto
// como { default: fn }; sin este guard, proj4.defs no existe y la app no arranca.
const proj4 = proj4module.default ?? proj4module

// CH1903+ / LV95 (EPSG:2056) — el sistema de referencia oficial suizo.
export const EPSG_2056 =
  '+proj=somerc +lat_0=46.9524055555556 +lon_0=7.43958333333333 +k_0=1 ' +
  '+x_0=2600000 +y_0=1200000 +ellps=bessel ' +
  '+towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs'

proj4.defs('EPSG:2056', EPSG_2056)

/** WGS84 (lng, lat) -> LV95 { e, n } en metros. */
export function wgs84ToLV95(lng, lat) {
  const [e, n] = proj4('EPSG:4326', 'EPSG:2056', [lng, lat])
  return { e, n }
}

/** LV95 (e, n) -> WGS84 { lng, lat }. */
export function lv95ToWGS84(e, n) {
  const [lng, lat] = proj4('EPSG:2056', 'EPSG:4326', [e, n])
  return { lng, lat }
}

/** Bounding box aproximado de Suiza para decidir si aplican los servicios suizos. */
export function isInSwitzerland(lng, lat) {
  return lng >= 5.9 && lng <= 10.6 && lat >= 45.7 && lat <= 47.9
}

/**
 * Elevación oficial (swissALTI3D, ~0.5 m de precisión) para un punto WGS84
 * dentro de Suiza, vía el servicio de altura de geo.admin.ch.
 * @returns {Promise<number|null>} metros sobre el nivel del mar, o null.
 */
export async function fetchSwissHeight(lng, lat) {
  if (!isInSwitzerland(lng, lat)) return null
  const { e, n } = wgs84ToLV95(lng, lat)
  const url = `https://api3.geo.admin.ch/rest/services/height?easting=${e.toFixed(1)}&northing=${n.toFixed(1)}&sr=2056`
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    const h = parseFloat(data.height)
    return isNaN(h) ? null : h
  } catch {
    return null
  }
}

/**
 * Perfil de elevación oficial a lo largo de una línea (hasta 5000 puntos),
 * vía el servicio de perfil de geo.admin.ch. Coordenadas de entrada en WGS84.
 * @param {Array<[lng,lat]>} coords
 * @returns {Promise<Array<{dist:number, alt:number}>|null>}
 */
export async function fetchSwissProfile(coords, nbPoints = 200) {
  if (!coords?.length || !coords.every(([lng, lat]) => isInSwitzerland(lng, lat))) return null
  const lv95 = coords.map(([lng, lat]) => {
    const { e, n } = wgs84ToLV95(lng, lat)
    return [Math.round(e * 10) / 10, Math.round(n * 10) / 10]
  })
  const geom = JSON.stringify({ type: 'LineString', coordinates: lv95 })
  const url = `https://api3.geo.admin.ch/rest/services/profile.json?geom=${encodeURIComponent(geom)}&sr=2056&nb_points=${nbPoints}`
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    return data.map((p) => ({ dist: p.dist, alt: p.alts?.COMB ?? p.alts?.DTM2 ?? null }))
  } catch {
    return null
  }
}

/**
 * Muestrea el terreno oficial (swissALTI3D) en una rejilla dentro del bbox de
 * un polígono. Sirve como superficie base para volúmenes de acopio: el terreno
 * "sin material" bajo el montón. Limitado a ~maxSamples consultas, en lotes.
 *
 * @param {Array<[lng,lat]>} ring
 * @returns {Promise<Array<{lng:number,lat:number,z:number}>|null>}
 */
export async function fetchSwissHeightGrid(ring, maxSamples = 64) {
  if (!ring?.length || !ring.every(([lng, lat]) => isInSwitzerland(lng, lat))) return null
  const lngs = ring.map((p) => p[0])
  const lats = ring.map((p) => p[1])
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)

  const side = Math.max(2, Math.floor(Math.sqrt(maxSamples)))
  const points = []
  for (let i = 0; i < side; i++) {
    for (let j = 0; j < side; j++) {
      points.push({
        lng: minLng + ((i + 0.5) / side) * (maxLng - minLng),
        lat: minLat + ((j + 0.5) / side) * (maxLat - minLat),
      })
    }
  }

  const out = []
  const BATCH = 8
  for (let i = 0; i < points.length; i += BATCH) {
    const batch = points.slice(i, i + BATCH)
    const heights = await Promise.all(batch.map((p) => fetchSwissHeight(p.lng, p.lat)))
    for (let k = 0; k < batch.length; k++) {
      if (heights[k] != null) out.push({ ...batch[k], z: heights[k] })
    }
  }
  return out.length >= 4 ? out : null
}

/**
 * Búsqueda oficial de direcciones y lugares suizos (geo.admin.ch SearchServer).
 * @returns {Promise<Array<{label:string, lat:number, lng:number}>>}
 */
export async function searchSwissLocations(text, limit = 6) {
  if (!text?.trim()) return []
  const url = `https://api3.geo.admin.ch/rest/services/api/SearchServer?sr=4326&searchText=${encodeURIComponent(text)}&type=locations&limit=${limit}`
  try {
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    return (data.results ?? [])
      .filter((r) => r.attrs?.lat != null && r.attrs?.lon != null)
      .map((r) => ({
        // Las etiquetas vienen con HTML (<b>...</b>); se limpia para mostrar.
        label: (r.attrs.label ?? '').replace(/<[^>]*>/g, ''),
        lat: r.attrs.lat,
        lng: r.attrs.lon,
      }))
  } catch {
    return []
  }
}

// Capas base WMTS oficiales de swisstopo (open data, sin clave).
export const SWISS_LAYERS = {
  swissimage: {
    name: 'SWISSIMAGE (ortofoto 10 cm)',
    url: 'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg',
    attribution: '© swisstopo',
    maxNativeZoom: 20,
  },
  pixelkarte: {
    name: 'Mapa nacional suizo',
    url: 'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg',
    attribution: '© swisstopo',
    maxNativeZoom: 18,
  },
}

// Overlays oficiales opcionales (se superponen a la capa base).
export const SWISS_OVERLAYS = {
  cadastral: {
    name: '📐 Catastro (parcelas)',
    url: 'https://wmts.geo.admin.ch/1.0.0/ch.kantone.cadastralwebmap-farbe/default/current/3857/{z}/{x}/{y}.png',
    attribution: '© swisstopo / cantones',
    maxNativeZoom: 18,
    opacity: 0.75,
  },
  hillshade: {
    name: '⛰️ Relieve (sombreado)',
    url: 'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissalti3d-reliefschattierung/default/current/3857/{z}/{x}/{y}.png',
    attribution: '© swisstopo',
    maxNativeZoom: 17,
    opacity: 0.5,
  },
}

// Berna, plaza federal — centro por defecto de la app.
export const BERN_CENTER = [46.9466, 7.4442]
