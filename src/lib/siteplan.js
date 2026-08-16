// 🗺️ Situationsplan (plano de situación) a escala: fondo del catastro oficial
// suizo (tiles WMTS compuestos en canvas — CORS abierto) con las mediciones y
// puntos del proyecto encima, flecha de norte, barra de escala, coordenadas
// LV95 y cajetín. Es el plano que acompaña solicitudes de obra (Baueingabe).
//
// Geometría y fondo comparten el espacio de píxeles Web Mercator del zoom
// elegido, así el encaje es exacto; la escala de papel usa la resolución
// REAL en metros a la latitud del sitio (la fórmula del ground resolution ya
// incluye cos(lat)), con error < 0.01 % en un sitio de cientos de metros.

import { wgs84ToLV95 } from './swiss.js'

const TILE = 256
const CADASTRAL_URL = (z, x, y) =>
  `https://wmts.geo.admin.ch/1.0.0/ch.kantone.cadastralwebmap-farbe/default/current/3857/${z}/${x}/${y}.png`

const S = (v) => (Math.round(v * 100) / 100).toString()

/** lng/lat → píxel global Web Mercator al zoom z. */
export function lngLatToPixel(lng, lat, z) {
  const n = 2 ** z * TILE
  const x = ((lng + 180) / 360) * n
  const rad = (lat * Math.PI) / 180
  const y = ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n
  return { x, y }
}

/** Metros reales por píxel Mercator a esta latitud y zoom. */
export function groundResolution(lat, z) {
  return (156543.03392 * Math.cos((lat * Math.PI) / 180)) / 2 ** z
}

/** Escala de plano (1:x) más detallada cuyo dibujo cabe en ~A4 apaisado. */
export function pickSiteScale(widthM, heightM) {
  for (const s of [200, 500, 1000]) {
    if ((widthM * 1000) / s <= 250 && (heightM * 1000) / s <= 155) return s
  }
  return 1000
}

/** Tramo redondo para la barra de escala (~50 mm de papel). */
export function scaleBarMeters(scale) {
  const targetM = (50 * scale) / 1000
  for (const m of [5, 10, 20, 25, 50, 100, 200, 500]) {
    if (m >= targetM) return m
  }
  return 500
}

const SWISSIMAGE_URL = (z, x, y) =>
  `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/${z}/${x}/${y}.jpeg`

/**
 * Descarga y compone tiles WMTS de un recuadro en un canvas (navegador).
 * Devuelve null si la red falla o el recuadro es demasiado grande.
 */
export async function fetchWMTSBackground(bounds, z, urlFn, maxTiles = 80) {
  const tl = lngLatToPixel(bounds.west, bounds.north, z)
  const br = lngLatToPixel(bounds.east, bounds.south, z)
  const tx0 = Math.floor(tl.x / TILE)
  const ty0 = Math.floor(tl.y / TILE)
  const tx1 = Math.floor(br.x / TILE)
  const ty1 = Math.floor(br.y / TILE)
  if ((tx1 - tx0 + 1) * (ty1 - ty0 + 1) > maxTiles) return null

  const canvas = document.createElement('canvas')
  canvas.width = (tx1 - tx0 + 1) * TILE
  canvas.height = (ty1 - ty0 + 1) * TILE
  const g = canvas.getContext('2d')
  g.fillStyle = '#ffffff'
  g.fillRect(0, 0, canvas.width, canvas.height)

  const jobs = []
  for (let tx = tx0; tx <= tx1; tx++) {
    for (let ty = ty0; ty <= ty1; ty++) {
      jobs.push(
        fetch(urlFn(z, tx, ty), { signal: AbortSignal.timeout(10000) })
          .then((r) => (r.ok ? r.blob() : null))
          .then((b) => (b ? createImageBitmap(b) : null))
          .then((bm) => {
            if (bm) g.drawImage(bm, (tx - tx0) * TILE, (ty - ty0) * TILE)
            return bm ? 1 : 0
          })
          .catch(() => 0)
      )
    }
  }
  const okCount = (await Promise.all(jobs)).reduce((s, v) => s + v, 0)
  if (!okCount) return null
  return {
    canvas,
    dataUrl: canvas.toDataURL('image/jpeg', 0.88),
    originPx: { x: tx0 * TILE, y: ty0 * TILE },
    widthPx: canvas.width,
    heightPx: canvas.height,
    zoom: z,
  }
}

/** Fondo catastral (Situationsplan). */
export function fetchCadastralBackground(bounds, z = 18, maxTiles = 80) {
  return fetchWMTSBackground(bounds, z, CADASTRAL_URL, maxTiles)
}

/** Ortofoto SWISSIMAGE compuesta (textura del terreno 3D). */
export function fetchSwissimageBackground(bounds, z = 18, maxTiles = 80) {
  return fetchWMTSBackground(bounds, z, SWISSIMAGE_URL, maxTiles)
}

/**
 * Compone el SVG del Situationsplan (pura — testeable sin navegador).
 *
 * @param {object} opts
 * @param {object} opts.project      { name, measurements, points }
 * @param {{west,south,east,north}} opts.bounds
 * @param {object|null} opts.background  resultado de fetchCadastralBackground
 * @param {number} [opts.zoom=18]
 * @param {number} [opts.scale]      1:x (auto si se omite)
 * @param {object} [opts.gwr]        edificio GWR para el cajetín
 * @param {object} [opts.parcel]     parcela catastral { number, rings } a resaltar
 * @returns {{ svg: string, widthMM: number, heightMM: number, scale: number }}
 */
export function composeSitePlanSVG({ project, bounds, background = null, zoom = 18, scale = null, gwr = null, parcel = null }) {
  const latC = (bounds.north + bounds.south) / 2
  const res = groundResolution(latC, zoom) // m reales / px mercator
  const tl = lngLatToPixel(bounds.west, bounds.north, zoom)
  const br = lngLatToPixel(bounds.east, bounds.south, zoom)
  const widthM = (br.x - tl.x) * res
  const heightM = (br.y - tl.y) * res
  const sc = scale ?? pickSiteScale(widthM, heightM)
  const mmPerPx = (res * 1000) / sc // px mercator → mm papel

  const M = 12
  const TITLE_H = 26
  const drawW = (br.x - tl.x) * mmPerPx
  const drawH = (br.y - tl.y) * mmPerPx
  const widthMM = Math.max(drawW + 2 * M, 150)
  const heightMM = drawH + 2 * M + TITLE_H

  const px = (lng, lat) => {
    const p = lngLatToPixel(lng, lat, zoom)
    return { x: (p.x - tl.x) * mmPerPx + M, y: (p.y - tl.y) * mmPerPx + M }
  }

  const parts = []
  parts.push(`<rect x="0" y="0" width="${S(widthMM)}" height="${S(heightMM)}" fill="#ffffff"/>`)

  // Fondo catastral (recortado al marco del dibujo).
  parts.push(`<clipPath id="mapclip"><rect x="${M}" y="${M}" width="${S(drawW)}" height="${S(drawH)}"/></clipPath>`)
  if (background) {
    const bx = (background.originPx.x - tl.x) * mmPerPx + M
    const by = (background.originPx.y - tl.y) * mmPerPx + M
    parts.push(
      `<image href="${background.dataUrl}" x="${S(bx)}" y="${S(by)}" ` +
      `width="${S(background.widthPx * mmPerPx)}" height="${S(background.heightPx * mmPerPx)}" ` +
      `clip-path="url(#mapclip)" preserveAspectRatio="none"/>`
    )
  }
  parts.push(`<rect x="${M}" y="${M}" width="${S(drawW)}" height="${S(drawH)}" fill="none" stroke="#000" stroke-width="0.4"/>`)

  const txt = (x, y, text, size = 2.5, anchor = 'middle', color = '#000') =>
    `<text x="${S(x)}" y="${S(y)}" font-size="${size}" font-family="Helvetica, Arial, sans-serif" text-anchor="${anchor}" fill="${color}">${text}</text>`

  // Parcela catastral resaltada (azul discontinuo + número).
  if (parcel?.rings?.length) {
    for (const ring of parcel.rings) {
      const pts = ring.map(([lng, lat]) => px(lng, lat))
      const d = pts.map((p, i) => `${i ? 'L' : 'M'}${S(p.x)} ${S(p.y)}`).join(' ') + ' Z'
      parts.push(`<path d="${d}" fill="#0055cc0d" stroke="#04c" stroke-width="0.6" stroke-dasharray="2.4 1.2" clip-path="url(#mapclip)"/>`)
    }
    if (parcel.number) {
      const ring0 = parcel.rings[0].map(([lng, lat]) => px(lng, lat))
      const cx = ring0.reduce((s, p) => s + p.x, 0) / ring0.length
      const cy = ring0.reduce((s, p) => s + p.y, 0) / ring0.length
      parts.push(txt(cx, cy, `Parz. ${parcel.number}`, 2.4, 'middle', '#04c'))
    }
  }

  // Mediciones del proyecto.
  const fmtM = (v) => (v >= 1000 ? `${(v / 1000).toFixed(2)} km` : `${v.toFixed(1)} m`)
  for (const m of project.measurements ?? []) {
    const pts = m.coords.map(([lng, lat]) => px(lng, lat))
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${S(p.x)} ${S(p.y)}`).join(' ')
    const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length
    const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length
    if (m.type === 'distance') {
      parts.push(`<path d="${d}" fill="none" stroke="#c00" stroke-width="0.5" clip-path="url(#mapclip)"/>`)
      if (m.result?.lengthM) parts.push(txt(cx, cy - 1.2, fmtM(m.result.lengthM), 2.4, 'middle', '#c00'))
    } else {
      parts.push(`<path d="${d} Z" fill="#cc000012" stroke="#c00" stroke-width="0.55" clip-path="url(#mapclip)"/>`)
      const label = m.type === 'area'
        ? `${(m.result?.areaM2 ?? 0).toFixed(0)} m²`
        : `${(m.result?.fillM3 ?? m.result?.volumeM3 ?? 0).toFixed(0)} m³`
      parts.push(txt(cx, cy, label, 2.6, 'middle', '#c00'))
    }
  }
  for (const p of project.points ?? []) {
    const q = px(p.lng, p.lat)
    parts.push(`<circle cx="${S(q.x)}" cy="${S(q.y)}" r="1" fill="#c00" clip-path="url(#mapclip)"/>`)
    parts.push(txt(q.x + 1.8, q.y - 1.2, p.label ?? '', 2.2, 'start', '#c00'))
  }

  // Flecha de norte.
  const nx = widthMM - M - 8
  const ny = M + 12
  parts.push(
    `<path d="M${S(nx)} ${S(ny)} l-2.6 7 2.6-2 2.6 2 z" fill="#000"/>` +
    txt(nx, ny + 11, 'N', 3.2)
  )

  // Barra de escala.
  const barM = scaleBarMeters(sc)
  const barMM = (barM * 1000) / sc
  const bx0 = M + 4
  const by0 = drawH + M - 4
  parts.push(`<rect x="${S(bx0)}" y="${S(by0)}" width="${S(barMM / 2)}" height="1.4" fill="#000"/>`)
  parts.push(`<rect x="${S(bx0 + barMM / 2)}" y="${S(by0)}" width="${S(barMM / 2)}" height="1.4" fill="none" stroke="#000" stroke-width="0.3"/>`)
  parts.push(txt(bx0, by0 - 1.4, '0', 2.2, 'middle'))
  parts.push(txt(bx0 + barMM / 2, by0 - 1.4, String(barM / 2), 2.2))
  parts.push(txt(bx0 + barMM, by0 - 1.4, `${barM} m`, 2.2))

  // Coordenadas LV95 de dos esquinas del marco.
  const c1 = wgs84ToLV95(bounds.west, bounds.south)
  const c2 = wgs84ToLV95(bounds.east, bounds.north)
  parts.push(txt(M + 1, M + drawH + 3.4, `${c1.e.toFixed(0)} / ${c1.n.toFixed(0)}`, 1.9, 'start', '#555'))
  parts.push(txt(M + drawW - 1, M + 3.2, `${c2.e.toFixed(0)} / ${c2.n.toFixed(0)}`, 1.9, 'end', '#555'))

  // Cajetín.
  const tbW = 110
  const tbX = widthMM - tbW - 4
  const tbY = heightMM - TITLE_H + 2
  parts.push(`<rect x="${S(tbX)}" y="${S(tbY)}" width="${tbW}" height="${TITLE_H - 6}" fill="#fff" stroke="#000" stroke-width="0.3"/>`)
  parts.push(txt(tbX + 2, tbY + 5, project.name ?? '', 3, 'start'))
  parts.push(txt(tbX + 2, tbY + 10.5, 'Situationsplan', 3.2, 'start'))
  if (gwr) {
    parts.push(txt(tbX + 2, tbY + 15, `${gwr.address ?? ''}${gwr.parcel ? ` · Parcela ${gwr.parcel}` : ''}${gwr.yearBuilt ? ` · ${gwr.yearBuilt}` : ''}`, 2.1, 'start'))
  }
  parts.push(txt(tbX + 2, tbY + 19, `Escala 1:${sc} · ${new Date().toLocaleDateString('es-CH')} · Fondo: catastro © swisstopo/cantones · Workpulse Drohne`, 1.8, 'start'))

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${S(widthMM)}mm" height="${S(heightMM)}mm" ` +
    `viewBox="0 0 ${S(widthMM)} ${S(heightMM)}">${parts.join('')}</svg>`
  return { svg, widthMM, heightMM, scale: sc }
}

/**
 * Flujo completo en navegador: fondo + composición + impresión.
 * IMPORTANTE: `win` debe abrirse de forma síncrona en el manejador del clic
 * (window.open tras un await sería bloqueado como popup); aquí solo se rellena.
 */
export async function openSitePlanPDF({ project, bounds, gwr = null, parcel = null, win, onProgress }) {
  if (win) {
    win.document.write(
      '<title>Situationsplan</title><p style="font-family:system-ui;margin:40px;color:#555">🗺️ Generando el plano de situación…</p>'
    )
  }
  onProgress?.('🗺️ Componiendo el plano de situación…')
  const background = await fetchCadastralBackground(bounds).catch(() => null)
  const res = composeSitePlanSVG({ project, bounds, background, gwr, parcel })
  const landscape = res.widthMM > res.heightMM
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Situationsplan</title>
<style>@page{size:A4 ${landscape ? 'landscape' : 'portrait'};margin:8mm}body{margin:0;display:flex;justify-content:center}svg{display:block}</style>
</head><body>${res.svg}<script>window.onload=()=>setTimeout(()=>window.print(),400)</scr` + `ipt></body></html>`
  if (win) {
    win.document.open()
    win.document.write(html)
    win.document.close()
  }
  onProgress?.(background
    ? `🗺️ Situationsplan 1:${res.scale} con fondo catastral oficial listo para imprimir.`
    : `🗺️ Situationsplan 1:${res.scale} generado sin fondo (sin conexión) — solo geometría.`)
  return res
}
