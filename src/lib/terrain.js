// 🏔️ Terreno oficial sin volar: descarga las tejas swissALTI3D (COG de 2 m/px,
// open data de swisstopo vía su API STAC) que cubren una zona y las une en un
// DSM en memoria con la misma forma que un georaster parseado. Así todas las
// herramientas existentes (volumen, 3D, comparación, muestreo) funcionan en
// cualquier punto de Suiza sin necesidad de un vuelo.
//
// Referencia: https://data.geo.admin.ch/api/stac/v0.9/collections/ch.swisstopo.swissalti3d

import parseGeoraster from 'georaster'
import { wgs84ToLV95, isInSwitzerland } from './swiss.js'

const STAC_ITEMS =
  'https://data.geo.admin.ch/api/stac/v0.9/collections/ch.swisstopo.swissalti3d/items'

const RES = 2 // m/px de las tejas usadas
const NODATA = -9999

/** Superficie máxima descargable de una vez (las tejas son de 1 km²). */
export const MAX_TERRAIN_KM2 = 6

/**
 * Descarga y une el terreno oficial de un rectángulo WGS84.
 * @param {{west:number, south:number, east:number, north:number}} bounds
 * @param {(msg:string)=>void} [onProgress]
 * @returns {Promise<object>} objeto georaster (projection 2056, 2 m/px)
 */
export async function fetchSwissTerrainDSM(bounds, onProgress) {
  const { west, south, east, north } = bounds
  if (!isInSwitzerland(west, south) || !isInSwitzerland(east, north)) {
    throw new Error('La vista debe estar dentro de Suiza (swissALTI3D solo cubre Suiza).')
  }
  const a = wgs84ToLV95(west, south)
  const b = wgs84ToLV95(east, north)
  const box = {
    e0: Math.min(a.e, b.e),
    e1: Math.max(a.e, b.e),
    n0: Math.min(a.n, b.n),
    n1: Math.max(a.n, b.n),
  }
  const km2 = ((box.e1 - box.e0) * (box.n1 - box.n0)) / 1e6
  if (km2 > MAX_TERRAIN_KM2) {
    throw new Error(
      `Zona demasiado grande (${km2.toFixed(1)} km²; máx. ${MAX_TERRAIN_KM2} km²). Acércate más en el mapa.`
    )
  }

  onProgress?.('🏔️ Buscando tejas del terreno oficial…')
  const res = await fetch(`${STAC_ITEMS}?bbox=${west},${south},${east},${north}&limit=100`)
  if (!res.ok) throw new Error(`swisstopo STAC respondió HTTP ${res.status}`)
  const { features = [] } = await res.json()
  // El STAC devuelve también tejas que solo TOCAN el borde; con desigualdad
  // estricta se descargan únicamente las que aportan celdas al recorte.
  const overlapping = features.filter(
    (f) => !f.bbox || (f.bbox[0] < east && f.bbox[2] > west && f.bbox[1] < north && f.bbox[3] > south)
  )
  // Cada teja existe en varias ediciones (p.ej. 2019 y 2025) como items
  // separados: "swissalti3d_<año>_<E>-<N>". Nos quedamos con la más reciente.
  const newestByTile = new Map()
  for (const f of overlapping) {
    const m = /^swissalti3d_(\d{4})_(\d+-\d+)$/.exec(f.id ?? '')
    const key = m ? m[2] : f.id
    const year = m ? +m[1] : 0
    if (!newestByTile.has(key) || year > newestByTile.get(key).year) {
      newestByTile.set(key, { year, f })
    }
  }
  // Cada item trae varios assets; se usa el GeoTIFF de 2 m en LV95.
  const hrefs = [...newestByTile.values()]
    .map(({ f }) => Object.values(f.assets ?? {}).find((as) => /_2_2056_\d+\.tif$/.test(as.href))?.href)
    .filter(Boolean)
  if (!hrefs.length) throw new Error('swissALTI3D no tiene tejas para esta zona.')

  onProgress?.(`🏔️ Descargando ${hrefs.length} teja(s) de terreno oficial (~${hrefs.length} MB)…`)
  const tiles = await Promise.all(
    hrefs.map(async (href) => {
      const r = await fetch(href)
      if (!r.ok) throw new Error(`Descarga de teja falló (HTTP ${r.status})`)
      return parseGeoraster(await r.arrayBuffer())
    })
  )
  onProgress?.('🏔️ Uniendo tejas…')
  return mosaicTiles(tiles, box)
}

/**
 * Une tejas georaster (mismo CRS y resolución) en un solo raster recortado al
 * rectángulo LV95 pedido. Exportada aparte para poder probarla con tejas ya
 * descargadas.
 * @param {Array<object>} tiles  georasters (projection 2056, 2 m/px)
 * @param {{e0:number, n0:number, e1:number, n1:number}} box  recorte en LV95
 */
export function mosaicTiles(tiles, { e0, n0, e1, n1 }) {
  // Rejilla de salida alineada al píxel para que las tejas encajen exactas.
  const xmin = Math.floor(e0 / RES) * RES
  const ymax = Math.ceil(n1 / RES) * RES
  const width = Math.max(1, Math.round((Math.ceil(e1 / RES) * RES - xmin) / RES))
  const height = Math.max(1, Math.round((ymax - Math.floor(n0 / RES) * RES) / RES))

  const values = []
  for (let r = 0; r < height; r++) {
    const row = new Float32Array(width).fill(NODATA)
    const y = ymax - (r + 0.5) * RES
    for (let c = 0; c < width; c++) {
      const x = xmin + (c + 0.5) * RES
      for (const t of tiles) {
        if (x <= t.xmin || x >= t.xmax || y <= t.ymin || y >= t.ymax) continue
        const v = t.values[0][Math.floor((t.ymax - y) / t.pixelHeight)][Math.floor((x - t.xmin) / t.pixelWidth)]
        if (v != null && v !== t.noDataValue && !Number.isNaN(v)) row[c] = v
        break
      }
    }
    values.push(row)
  }

  return {
    values: [values],
    width,
    height,
    pixelWidth: RES,
    pixelHeight: RES,
    xmin,
    xmax: xmin + width * RES,
    ymin: ymax - height * RES,
    ymax,
    projection: 2056,
    noDataValue: NODATA,
    numberOfRasters: 1,
    tileCount: tiles.length,
    official: true, // marca "terreno oficial" para la UI
  }
}
