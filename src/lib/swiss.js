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
    // Tiempo límite: con mala cobertura en campo, mejor un punto sin cota que
    // una app congelada esperando la respuesta.
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
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

/**
 * Consulta genérica identify de geo.admin.ch en un punto WGS84.
 * @returns {Promise<Array>} resultados (attributes por feature)
 */
export async function identifyAt(lng, lat, layer, tolerance = 0) {
  if (!isInSwitzerland(lng, lat)) return []
  const { e, n } = wgs84ToLV95(lng, lat)
  const ext = 1000
  const url =
    'https://api3.geo.admin.ch/rest/services/api/MapServer/identify' +
    `?geometry=${e.toFixed(1)},${n.toFixed(1)}&geometryType=esriGeometryPoint` +
    `&layers=all:${layer}&tolerance=${tolerance}&sr=2056` +
    `&mapExtent=${(e - ext).toFixed(0)},${(n - ext).toFixed(0)},${(e + ext).toFixed(0)},${(n + ext).toFixed(0)}` +
    '&imageDisplay=100,100,96&returnGeometry=false'
  try {
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    return data.results ?? []
  } catch {
    return []
  }
}

/**
 * 🧠 Radiografía del terreno: cruza en paralelo todas las fuentes oficiales
 * para un punto — elevación, restricciones de drones (BAZL), zona de
 * construcción (ARE), techo solar, zonas de tranquilidad para la fauna (WRZ)
 * y paisajes protegidos de importancia nacional (BLN).
 */
export async function fetchTerrainIntel(lng, lat) {
  const [height, bazl, bauzone, solar, wrz, bln] = await Promise.all([
    fetchSwissHeight(lng, lat),
    identifyAt(lng, lat, 'ch.bazl.einschraenkungen-drohnen', 0),
    identifyAt(lng, lat, 'ch.are.bauzonen', 5),
    fetchSolarRoof(lng, lat),
    identifyAt(lng, lat, 'ch.bafu.wrz-wildruhezonen_portal', 5),
    identifyAt(lng, lat, 'ch.bafu.bundesinventare-bln', 5),
  ])
  const { e, n } = wgs84ToLV95(lng, lat)
  return {
    lat, lng, e, n,
    heightM: height,
    wildZones: wrz.map((r) => ({
      name: r.attributes?.wrz_name ?? 'Zona de tranquilidad para la fauna',
      period: r.attributes?.schutzzeit ?? null,
      binding: r.attributes?.schutzs_de === 'rechtsverbindlich', // legalmente vinculante
    })),
    bln: bln[0]
      ? {
          name: bln[0].attributes?.bln_name ?? bln[0].attributes?.label ?? 'Paisaje protegido (BLN)',
          objNr: bln[0].attributes?.bln_obj ?? null,
          sheetUrl: bln[0].attributes?.linkurldescription ?? null,
        }
      : null,
    droneZones: bazl.map((r) => ({
      name: r.attributes?.zone_name_es ?? r.attributes?.zone_name_en ?? r.attributes?.zone_name_de ?? 'Zona restringida',
      restriction: r.attributes?.zone_restriction_en ?? r.attributes?.zone_restriction_de ?? null,
      authUrl: r.attributes?.auth_url_en ?? null,
    })),
    bauzone: bauzone[0]
      ? {
          municipio: bauzone[0].attributes?.name ?? null,
          tipo: bauzone[0].attributes?.ch_bez_d ?? bauzone[0].attributes?.ch_bez_f ?? null,
          canton: bauzone[0].attributes?.kt_kz ?? null,
        }
      : null,
    solar,
  }
}

/**
 * Datos solares oficiales del techo en un punto (BFE/sonnendach.ch), vía la
 * API identify de geo.admin.ch. Devuelve aptitud, radiación, superficie,
 * orientación, inclinación, producción anual estimada y el polígono del techo.
 */
export async function fetchSolarRoof(lng, lat) {
  if (!isInSwitzerland(lng, lat)) return null
  const { e, n } = wgs84ToLV95(lng, lat)
  const ext = 500
  const url =
    'https://api3.geo.admin.ch/rest/services/api/MapServer/identify' +
    `?geometry=${e.toFixed(1)},${n.toFixed(1)}&geometryType=esriGeometryPoint` +
    '&layers=all:ch.bfe.solarenergie-eignung-daecher&tolerance=2&sr=2056' +
    `&mapExtent=${(e - ext).toFixed(0)},${(n - ext).toFixed(0)},${(e + ext).toFixed(0)},${(n + ext).toFixed(0)}` +
    '&imageDisplay=100,100,96&returnGeometry=true'
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    const f = data.results?.[0]
    if (!f) return null
    const a = f.attributes ?? {}
    // Anillos LV95 -> WGS84 para dibujar el techo.
    const rings = (f.geometry?.rings ?? []).map((ring) =>
      ring.map(([re, rn]) => {
        const { lng: rlng, lat: rlat } = lv95ToWGS84(re, rn)
        return [rlat, rlng]
      })
    )
    const KLASSE = { 1: 'Baja', 2: 'Media', 3: 'Buena', 4: 'Muy buena', 5: 'Excelente' }
    return {
      klasse: a.klasse ?? null,
      klasseText: KLASSE[a.klasse] ?? '—',
      radiationKWhM2: a.mstrahlung ?? null, // radiación media kWh/m²·año
      areaM2: a.flaeche ?? null,
      orientationDeg: a.ausrichtung ?? null,
      tiltDeg: a.neigung ?? null,
      yearlyKWh: a.stromertrag ?? null,
      buildingId: a.building_id ?? null,
      rings,
    }
  } catch {
    return null
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
  droneRestrictions: {
    name: '🚫 Restricciones de drones (BAZL)',
    url: 'https://wmts.geo.admin.ch/1.0.0/ch.bazl.einschraenkungen-drohnen/default/current/3857/{z}/{x}/{y}.png',
    attribution: '© BAZL/OFAC',
    maxNativeZoom: 18,
    opacity: 0.6,
  },
  solarRoofs: {
    name: '☀️ Potencial solar de techos (BFE)',
    url: 'https://wmts.geo.admin.ch/1.0.0/ch.bfe.solarenergie-eignung-daecher/default/current/3857/{z}/{x}/{y}.png',
    attribution: '© BFE/OFEN',
    maxNativeZoom: 18,
    opacity: 0.7,
  },
  wildlifeZones: {
    name: '🦌 Zonas de tranquilidad fauna (BAFU)',
    url: 'https://wmts.geo.admin.ch/1.0.0/ch.bafu.wrz-wildruhezonen_portal/default/current/3857/{z}/{x}/{y}.png',
    attribution: '© BAFU/OFEV',
    maxNativeZoom: 18,
    opacity: 0.6,
  },
}

// Berna, plaza federal — centro por defecto de la app.
export const BERN_CENTER = [46.9466, 7.4442]
