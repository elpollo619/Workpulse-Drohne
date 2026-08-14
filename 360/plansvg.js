// Generación del plano de planta como SVG (cadena de texto), compartida por el
// visor de plano, el informe y el export PNG. La cámara está en el origen y
// las posiciones vienen de la trigonometría sobre el plano del suelo.

import { MEASURE_COLORS } from '../src/components/Pano360View.jsx'

export function planGeometry(measurements, W = 640, H = 480, PAD = 40) {
  const pts = [{ x: 0, z: 0 }]
  for (const m of measurements) for (const p of m.points ?? []) pts.push(p)
  const xs = pts.map((p) => p.x)
  const zs = pts.map((p) => p.z)
  const minX = Math.min(...xs) - 1
  const maxX = Math.max(...xs) + 1
  const minZ = Math.min(...zs) - 1
  const maxZ = Math.max(...zs) + 1
  const scale = Math.min((W - PAD * 2) / (maxX - minX), (H - PAD * 2) / (maxZ - minZ))
  const sx = (x) => PAD + (x - minX) * scale
  const sy = (z) => H - PAD - (z - minZ) * scale
  return { W, H, minX, maxX, minZ, maxZ, scale, sx, sy }
}

/**
 * Construye el SVG completo del plano como cadena.
 * @param {Array} measurements
 * @param {{title?:string, dark?:boolean}} opts
 */
export function buildPlanSVG(measurements, opts = {}) {
  const { title = '', dark = true } = opts
  const geo = planGeometry(measurements)
  const gridStep = geo.scale > 60 ? 1 : geo.scale > 25 ? 2 : 5
  const bg = dark ? '#0f1418' : '#ffffff'
  const gridC = dark ? '#2a3742' : '#dde3e8'
  const textC = dark ? '#e6edf3' : '#1c2733'
  const dimC = dark ? '#8b9aa7' : '#5c6b78'

  const parts = []
  parts.push(
    `<svg viewBox="0 0 ${geo.W} ${geo.H}" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">`,
    `<rect x="0" y="0" width="${geo.W}" height="${geo.H}" fill="${bg}"/>`
  )

  for (let x = Math.ceil(geo.minX / gridStep) * gridStep; x <= geo.maxX; x += gridStep) {
    parts.push(`<line x1="${geo.sx(x).toFixed(1)}" y1="${geo.sy(geo.minZ).toFixed(1)}" x2="${geo.sx(x).toFixed(1)}" y2="${geo.sy(geo.maxZ).toFixed(1)}" stroke="${gridC}" stroke-width="0.5"/>`)
  }
  for (let z = Math.ceil(geo.minZ / gridStep) * gridStep; z <= geo.maxZ; z += gridStep) {
    parts.push(`<line x1="${geo.sx(geo.minX).toFixed(1)}" y1="${geo.sy(z).toFixed(1)}" x2="${geo.sx(geo.maxX).toFixed(1)}" y2="${geo.sy(z).toFixed(1)}" stroke="${gridC}" stroke-width="0.5"/>`)
  }
  parts.push(`<text x="${geo.W - 12}" y="${geo.H - 10}" text-anchor="end" font-size="11" fill="${dimC}">cuadrícula ${gridStep} m</text>`)
  if (title) {
    parts.push(`<text x="12" y="20" font-size="13" fill="${textC}" font-weight="bold">${escapeXML(title)}</text>`)
  }

  measurements.forEach((m, idx) => {
    const color = MEASURE_COLORS[idx % MEASURE_COLORS.length]
    const pts = m.points ?? []
    if (m.mode === 'height') {
      const p = pts[0]
      if (!p) return
      parts.push(
        `<circle cx="${geo.sx(p.x).toFixed(1)}" cy="${geo.sy(p.z).toFixed(1)}" r="4" fill="${color}"/>`,
        `<text x="${(geo.sx(p.x) + 7).toFixed(1)}" y="${(geo.sy(p.z) - 6).toFixed(1)}" font-size="12" fill="${color}">${escapeXML(m.label)}: ${m.value.toFixed(2)} m ↑</text>`
      )
      return
    }
    if (pts.length < 2) return
    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${geo.sx(p.x).toFixed(1)},${geo.sy(p.z).toFixed(1)}`).join(' ')
    const cx = pts.reduce((s, p) => s + geo.sx(p.x), 0) / pts.length
    const cz = pts.reduce((s, p) => s + geo.sy(p.z), 0) / pts.length
    parts.push(
      m.closed
        ? `<path d="${d} Z" fill="${color}" fill-opacity="0.12" stroke="${color}" stroke-width="2"/>`
        : `<path d="${d}" fill="none" stroke="${color}" stroke-width="2"/>`
    )
    for (const p of pts) {
      parts.push(`<circle cx="${geo.sx(p.x).toFixed(1)}" cy="${geo.sy(p.z).toFixed(1)}" r="3" fill="${color}"/>`)
    }
    parts.push(
      `<text x="${cx.toFixed(1)}" y="${cz.toFixed(1)}" text-anchor="middle" font-size="12" fill="${color}">${escapeXML(m.label)}: ${m.value.toFixed(2)} ${m.unit}</text>`
    )
  })

  parts.push(
    `<circle cx="${geo.sx(0).toFixed(1)}" cy="${geo.sy(0).toFixed(1)}" r="6" fill="${textC}"/>`,
    `<circle cx="${geo.sx(0).toFixed(1)}" cy="${geo.sy(0).toFixed(1)}" r="10" fill="none" stroke="${textC}" stroke-dasharray="2 2"/>`,
    `<text x="${(geo.sx(0) + 12).toFixed(1)}" y="${(geo.sy(0) + 4).toFixed(1)}" font-size="11" fill="${dimC}">cámara</text>`,
    '</svg>'
  )
  return parts.join('\n')
}

function escapeXML(s) {
  return String(s ?? '').replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]))
}
