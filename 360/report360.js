// Informe imprimible de la sesión de medición 360: resumen por habitación con
// sus planos, tabla de mediciones y superficie total (equivalente al "GLA" de
// las apps inmobiliarias). Se abre en una ventana y se imprime / guarda PDF.

import { buildPlanSVG } from './plansvg.js'

const esc = (s) =>
  String(s ?? '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))

/**
 * @param {{[photo:string]: Array}} store        mediciones por foto
 * @param {{[photo:string]: string}} roomNames   nombre de habitación por foto
 */
export function openSessionReport(store, roomNames = {}) {
  const rooms = Object.entries(store).filter(([, ms]) => ms.length > 0)
  if (!rooms.length) return false

  let totalArea = 0
  const sections = rooms.map(([photo, ms]) => {
    const name = roomNames[photo] || photo
    const areas = ms.filter((m) => m.mode === 'area')
    const roomArea = areas.reduce((s, m) => s + m.value, 0)
    totalArea += roomArea
    const rows = ms.map((m) => {
      const tipo = { distance: '📏 Distancia', path: '📐 Ruta', area: '⬛ Área', height: '📊 Altura' }[m.mode] ?? m.mode
      return `<tr><td>${esc(m.label)}</td><td>${tipo}</td><td>${m.value.toFixed(2)} ${esc(m.unit)}</td>` +
        `<td>${m.perimeter ? m.perimeter.toFixed(2) + ' m' : '—'}</td></tr>`
    }).join('')
    const plan = ms.some((m) => (m.points?.length ?? 0) >= 2)
      ? buildPlanSVG(ms, { title: name, dark: false })
      : ''
    return `
      <section>
        <h2>${esc(name)}${roomArea > 0 ? ` — ${roomArea.toFixed(2)} m²` : ''}</h2>
        <table><tr><th>Etiqueta</th><th>Tipo</th><th>Valor</th><th>Perímetro</th></tr>${rows}</table>
        ${plan ? `<div class="plan">${plan}</div>` : ''}
      </section>`
  }).join('')

  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Informe 360 — Workpulse</title>
<style>
  body { font-family: system-ui, sans-serif; color: #111; margin: 32px; }
  h1 { font-size: 22px; margin: 0 0 2px; }
  .sub { color: #666; font-size: 13px; margin-bottom: 8px; }
  .total { font-size: 15px; background: #eef7f2; border: 1px solid #bfe3d2;
           border-radius: 8px; padding: 10px 14px; margin: 14px 0 22px; }
  h2 { font-size: 15px; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-top: 26px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 10px; }
  td, th { text-align: left; padding: 6px 8px; border-bottom: 1px solid #eee; }
  th { color: #555; font-weight: 600; }
  .plan { max-width: 560px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
  .plan svg { display: block; width: 100%; height: auto; }
  footer { margin-top: 36px; color: #999; font-size: 11px; }
  section { break-inside: avoid; }
  @media print { body { margin: 12mm; } }
</style></head><body>
<h1>Workpulse 360 — Informe de medición</h1>
<div class="sub">Generado: ${new Date().toLocaleString('es-CH')} · ${rooms.length} espacio(s)</div>
${totalArea > 0 ? `<div class="total"><b>Superficie total medida: ${totalArea.toFixed(2)} m²</b></div>` : ''}
${sections}
<footer>Medidas por trigonometría sobre foto 360° con altura de cámara conocida. Válido en suelos planos;
la exactitud depende de la altura de cámara indicada.</footer>
<script>window.onload = () => setTimeout(() => window.print(), 300)</script>
</body></html>`

  const win = window.open('', '_blank')
  if (!win) return false
  win.document.write(html)
  win.document.close()
  return true
}
