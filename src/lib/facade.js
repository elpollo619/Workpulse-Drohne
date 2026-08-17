// 🏢 Plano de fachada (Fassadenplan): a partir de los elementos trazados sobre
// la foto rectificada genera el alzado acotado clásico suizo — líneas negras
// sobre blanco, cotas con trazos oblicuos, cajetín con escala — exportable
// como SVG, PDF a escala real (1:50/1:100/1:200) y DXF 2D en metros para CAD.
//
// Modelo: elements = [{ type: 'outline'|'rect'|'line', pts: [{x, y}, …] }]
// con coordenadas en píxeles de imagen (y hacia abajo) y metersPerPx conocido.

import { t } from './i18n.js'

const S = (v) => (Math.round(v * 100) / 100).toString()

/** Bounding box en píxeles de todos los elementos. */
export function elementsBBox(elements) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const el of elements) {
    for (const p of el.pts) {
      if (p.x < minX) minX = p.x
      if (p.y < minY) minY = p.y
      if (p.x > maxX) maxX = p.x
      if (p.y > maxY) maxY = p.y
    }
  }
  return isFinite(minX) ? { minX, minY, maxX, maxY } : null
}

/** Escala sugerida (1:50/100/200) para que el ancho quepa en un A4 apaisado. */
export function suggestScale(widthM) {
  for (const s of [50, 100, 200]) {
    if ((widthM * 1000) / s <= 240) return s
  }
  return 200
}

/**
 * Construye el SVG del plano acotado.
 * @returns {{ svg: string, widthMM: number, heightMM: number }}
 */
export function buildFacadeSVG({ facadeName, projectName, elements, metersPerPx, scale = 100, photo = null }) {
  const bb = elementsBBox(elements)
  if (!bb || !metersPerPx) return null
  const mmPerPx = (metersPerPx * 1000) / scale // px imagen → mm papel
  const M = 18 // margen para cotas
  const TITLE_H = 24

  // Transformación imagen → papel (mm), con el dibujo empezando en el margen.
  const tx = (x) => (x - bb.minX) * mmPerPx + M
  const ty = (y) => (y - bb.minY) * mmPerPx + M
  const drawW = (bb.maxX - bb.minX) * mmPerPx
  const drawH = (bb.maxY - bb.minY) * mmPerPx
  const widthMM = Math.max(drawW + 2 * M, 130)
  const heightMM = drawH + 2 * M + TITLE_H

  const parts = []
  parts.push(`<rect x="0" y="0" width="${S(widthMM)}" height="${S(heightMM)}" fill="#ffffff"/>`)

  // Foto de fondo tenue (opcional) alineada con el dibujo.
  if (photo?.dataUrl) {
    parts.push(
      `<image href="${photo.dataUrl}" x="${S(tx(0))}" y="${S(ty(0))}" ` +
      `width="${S(photo.imgW * mmPerPx)}" height="${S(photo.imgH * mmPerPx)}" opacity="0.22" preserveAspectRatio="none"/>`
    )
  }

  const line = (x1, y1, x2, y2, w = 0.35) =>
    `<line x1="${S(x1)}" y1="${S(y1)}" x2="${S(x2)}" y2="${S(y2)}" stroke="#000" stroke-width="${w}"/>`
  const txt = (x, y, text, size = 2.5, anchor = 'middle') =>
    `<text x="${S(x)}" y="${S(y)}" font-size="${size}" font-family="Helvetica, Arial, sans-serif" text-anchor="${anchor}" fill="#000">${text}</text>`

  // Cota estilo suizo: línea fina con trazos oblicuos y valor encima.
  const dimTick = (x, y) => `<line x1="${S(x - 0.9)}" y1="${S(y + 0.9)}" x2="${S(x + 0.9)}" y2="${S(y - 0.9)}" stroke="#000" stroke-width="0.3"/>`
  const dimH = (x1, x2, y, valueM, size = 2.2) =>
    line(x1, y, x2, y, 0.16) + dimTick(x1, y) + dimTick(x2, y) +
    txt((x1 + x2) / 2, y - 0.8, valueM.toFixed(2), size)
  const dimV = (x, y1, y2, valueM, size = 2.2) =>
    line(x, y1, x, y2, 0.16) + dimTick(x, y1) + dimTick(x, y2) +
    `<text x="${S(x - 0.8)}" y="${S((y1 + y2) / 2)}" font-size="${size}" font-family="Helvetica, Arial, sans-serif" text-anchor="middle" fill="#000" transform="rotate(-90 ${S(x - 0.8)} ${S((y1 + y2) / 2)})">${valueM.toFixed(2)}</text>`

  // Elementos.
  for (const el of elements) {
    if (el.type === 'outline') {
      const d = el.pts.map((p, i) => `${i ? 'L' : 'M'}${S(tx(p.x))} ${S(ty(p.y))}`).join(' ') + ' Z'
      parts.push(`<path d="${d}" fill="none" stroke="#000" stroke-width="0.5"/>`)
    } else if (el.type === 'rect') {
      const [a, b] = el.pts
      const x = tx(Math.min(a.x, b.x))
      const y = ty(Math.min(a.y, b.y))
      const w = Math.abs(b.x - a.x) * mmPerPx
      const h = Math.abs(b.y - a.y) * mmPerPx
      parts.push(`<rect x="${S(x)}" y="${S(y)}" width="${S(w)}" height="${S(h)}" fill="none" stroke="#000" stroke-width="0.35"/>`)
      // Cotas del hueco: ancho encima, alto a la derecha.
      const wM = Math.abs(b.x - a.x) * metersPerPx
      const hM = Math.abs(b.y - a.y) * metersPerPx
      parts.push(dimH(x, x + w, y - 1.6, wM, 1.9))
      parts.push(dimV(x + w + 1.6, y, y + h, hM, 1.9))
    } else if (el.type === 'line') {
      const [a, b] = el.pts
      parts.push(line(tx(a.x), ty(a.y), tx(b.x), ty(b.y), 0.35))
    }
  }

  // Cotas generales del bbox: ancho abajo, alto a la izquierda.
  const totalW = (bb.maxX - bb.minX) * metersPerPx
  const totalH = (bb.maxY - bb.minY) * metersPerPx
  parts.push(dimH(tx(bb.minX), tx(bb.maxX), ty(bb.maxY) + 7, totalW))
  parts.push(dimV(tx(bb.minX) - 7, ty(bb.minY), ty(bb.maxY), totalH))

  // Cajetín.
  const tbW = 92
  const tbX = widthMM - tbW - 4
  const tbY = heightMM - TITLE_H + 2
  parts.push(`<rect x="${S(tbX)}" y="${S(tbY)}" width="${tbW}" height="${TITLE_H - 6}" fill="none" stroke="#000" stroke-width="0.3"/>`)
  parts.push(line(tbX, tbY + 7, tbX + tbW, tbY + 7, 0.2))
  parts.push(txt(tbX + 2, tbY + 5, `${projectName ?? ''}`, 3, 'start'))
  parts.push(txt(tbX + 2, tbY + 12, `${facadeName}`, 3.4, 'start'))
  parts.push(txt(tbX + 2, tbY + 16.5, `${t('Escala')} 1:${scale} · ${new Date().toLocaleDateString('es-CH')} · Workpulse Drohne`, 2.2, 'start'))

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${S(widthMM)}mm" height="${S(heightMM)}mm" ` +
    `viewBox="0 0 ${S(widthMM)} ${S(heightMM)}">${parts.join('')}</svg>`
  return { svg, widthMM, heightMM }
}

/** DXF 2D del alzado en metros (y hacia arriba), por capas CAD. */
export function buildFacadeDXF({ facadeName, elements, metersPerPx, imgH }) {
  const bb = elementsBBox(elements)
  if (!bb || !metersPerPx) return null
  // Origen del plano: esquina inferior izquierda del dibujo.
  const X = (x) => S((x - bb.minX) * metersPerPx)
  const Y = (y) => S((bb.maxY - y) * metersPerPx)

  const E = []
  const push = (...c) => E.push(...c)
  const lineEnt = (layer, x1, y1, x2, y2) =>
    push('0', 'LINE', '8', layer, '10', X(x1), '20', Y(y1), '11', X(x2), '21', Y(y2))

  for (const el of elements) {
    if (el.type === 'outline') {
      for (let i = 0; i < el.pts.length; i++) {
        const a = el.pts[i]
        const b = el.pts[(i + 1) % el.pts.length]
        lineEnt('FACHADA', a.x, a.y, b.x, b.y)
      }
    } else if (el.type === 'rect') {
      const [a, b] = el.pts
      const x1 = Math.min(a.x, b.x), x2 = Math.max(a.x, b.x)
      const y1 = Math.min(a.y, b.y), y2 = Math.max(a.y, b.y)
      lineEnt('HUECOS', x1, y1, x2, y1)
      lineEnt('HUECOS', x2, y1, x2, y2)
      lineEnt('HUECOS', x2, y2, x1, y2)
      lineEnt('HUECOS', x1, y2, x1, y1)
      const wM = (x2 - x1) * metersPerPx
      const hM = (y2 - y1) * metersPerPx
      push('0', 'TEXT', '8', 'COTAS',
        '10', X((x1 + x2) / 2), '20', S(parseFloat(Y(y1)) + 0.08), '30', '0',
        '40', '0.12', '72', '1', '11', X((x1 + x2) / 2), '21', S(parseFloat(Y(y1)) + 0.08), '31', '0',
        '1', `${wM.toFixed(2)} x ${hM.toFixed(2)}`)
    } else if (el.type === 'line') {
      lineEnt('DETALLE', el.pts[0].x, el.pts[0].y, el.pts[1].x, el.pts[1].y)
    }
  }

  const layers = [['FACHADA', 7], ['HUECOS', 5], ['DETALLE', 8], ['COTAS', 2]]
  return [
    '999', `Workpulse Drohne - alzado ${facadeName} (metros)`,
    '0', 'SECTION', '2', 'HEADER', '9', '$INSUNITS', '70', '6', '0', 'ENDSEC',
    '0', 'SECTION', '2', 'TABLES',
    '0', 'TABLE', '2', 'LAYER', '70', String(layers.length),
    ...layers.flatMap(([n, c]) => ['0', 'LAYER', '2', n, '70', '0', '62', String(c), '6', 'CONTINUOUS']),
    '0', 'ENDTAB', '0', 'ENDSEC',
    '0', 'SECTION', '2', 'ENTITIES', ...E, '0', 'ENDSEC', '0', 'EOF',
  ].join('\r\n')
}

function download(filename, content, mime) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function downloadFacadeSVG(name, opts) {
  const res = buildFacadeSVG(opts)
  if (res) download(`${name}.svg`, res.svg, 'image/svg+xml')
  return res
}

export function downloadFacadeDXF(name, opts) {
  const dxf = buildFacadeDXF(opts)
  if (dxf) download(`${name}.dxf`, dxf, 'application/dxf')
  return dxf
}

/** Abre el plano en una ventana lista para imprimir/guardar como PDF a escala. */
export function openFacadePDF(opts) {
  const res = buildFacadeSVG(opts)
  if (!res) return null
  const landscape = res.widthMM > res.heightMM
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${opts.facadeName}</title>
<style>@page{size:A4 ${landscape ? 'landscape' : 'portrait'};margin:8mm}body{margin:0;display:flex;justify-content:center}
svg{display:block}@media print{body{width:auto}}</style></head><body>${res.svg}
<script>window.onload=()=>setTimeout(()=>window.print(),300)</scr` + `ipt></body></html>`
  const win = window.open('', '_blank')
  if (win) {
    win.document.write(html)
    win.document.close()
  }
  return res
}
