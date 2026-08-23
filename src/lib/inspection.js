// 📋 Informe de inspección: convierte las fotos anotadas de un vuelo en un
// entregable PDF profesional — mapa de defectos con pines numerados, tabla
// resumen por gravedad y una ficha por defecto con la foto anotada. Es el
// documento que se factura tras un vuelo de tejados, fachadas o daños.

import { fetchSwissimageBackground, lngLatToPixel } from './siteplan.js'
import { wgs84ToLV95, isInSwitzerland } from './swiss.js'
import { t, getLang } from './i18n.js'

export const SEVERITIES = {
  high: { label: 'Grave', labelDe: 'Schwer', color: '#dc2626' },
  med: { label: 'Moderado', labelDe: 'Mittel', color: '#f59e0b' },
  low: { label: 'Leve', labelDe: 'Gering', color: '#22c55e' },
}

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

/**
 * Compone un mapa (ortofoto SWISSIMAGE) con los defectos como pines numerados.
 * Devuelve un dataURL, o null si no hay red o no hay puntos en Suiza.
 */
export async function buildDefectMap(defects, onProgress) {
  const pts = defects.filter((d) => d.lat != null && d.lng != null)
  if (!pts.length || !pts.every((d) => isInSwitzerland(d.lng, d.lat))) return null

  const lngs = pts.map((d) => d.lng)
  const lats = pts.map((d) => d.lat)
  const padLng = Math.max(0.0008, (Math.max(...lngs) - Math.min(...lngs)) * 0.3)
  const padLat = Math.max(0.0006, (Math.max(...lats) - Math.min(...lats)) * 0.3)
  const bounds = {
    west: Math.min(...lngs) - padLng, east: Math.max(...lngs) + padLng,
    south: Math.min(...lats) - padLat, north: Math.max(...lats) + padLat,
  }
  onProgress?.('📋 Componiendo el mapa de defectos…')
  const bg = await fetchSwissimageBackground(bounds, 19, 120).catch(() => null)
  if (!bg) return null

  const canvas = document.createElement('canvas')
  canvas.width = bg.widthPx
  canvas.height = bg.heightPx
  const g = canvas.getContext('2d')
  g.drawImage(bg.canvas, 0, 0)

  // Pines numerados en coordenadas de píxel del mosaico.
  pts.forEach((d, i) => {
    const p = lngLatToPixel(d.lng, d.lat, bg.zoom)
    const x = p.x - bg.originPx.x
    const y = p.y - bg.originPx.y
    const color = SEVERITIES[d.severity]?.color ?? '#dc2626'
    g.beginPath()
    g.arc(x, y, 12, 0, Math.PI * 2)
    g.fillStyle = color
    g.fill()
    g.lineWidth = 2.5
    g.strokeStyle = '#fff'
    g.stroke()
    g.fillStyle = '#fff'
    g.font = 'bold 14px Arial'
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.fillText(String(d.n ?? i + 1), x, y)
  })
  return canvas.toDataURL('image/jpeg', 0.85)
}

/**
 * Abre el informe de inspección en una ventana lista para imprimir/guardar PDF.
 * @param {object} opts
 * @param {{name, defects}} opts.inspection
 * @param {string} opts.projectName
 * @param {Window} opts.win  ventana abierta de forma síncrona al clic
 */
export async function openInspectionReport({ inspection, projectName, win, onProgress }) {
  if (win) {
    win.document.write('<title>Inspektionsbericht</title><p style="font-family:system-ui;margin:40px;color:#555">📋 ' + esc(t('Generando el informe…')) + '</p>')
  }
  const defects = inspection.defects.map((d, i) => ({ ...d, n: i + 1 }))
  const mapUrl = await buildDefectMap(defects, onProgress).catch(() => null)

  const counts = { high: 0, med: 0, low: 0 }
  for (const d of defects) counts[d.severity] = (counts[d.severity] ?? 0) + 1
  const sevLabel = (s) => (getLang() === 'de' ? SEVERITIES[s]?.labelDe : SEVERITIES[s]?.label) ?? s

  const lv95 = (d) => {
    if (d.lat == null) return '—'
    const { e, n } = wgs84ToLV95(d.lng, d.lat)
    return `${e.toFixed(1)} / ${n.toFixed(1)}`
  }

  const rows = defects.map((d) => `<tr>
    <td style="text-align:center"><span class="pin" style="background:${SEVERITIES[d.severity]?.color}">${d.n}</span></td>
    <td>${esc(d.category || '—')}</td>
    <td><b style="color:${SEVERITIES[d.severity]?.color}">${esc(sevLabel(d.severity))}</b></td>
    <td>${esc(lv95(d))}</td>
    <td>${esc(d.note || '')}</td>
  </tr>`).join('')

  const cards = defects.map((d) => `<div class="card">
    <div class="card-head">
      <span class="pin" style="background:${SEVERITIES[d.severity]?.color}">${d.n}</span>
      <b>${esc(d.category || t('Defecto'))}</b>
      <span class="sev" style="color:${SEVERITIES[d.severity]?.color}">${esc(sevLabel(d.severity))}</span>
    </div>
    ${d.image ? `<img src="${d.image}" alt="defecto ${d.n}"/>` : ''}
    <div class="card-meta">
      ${d.photoName ? `<span>📷 ${esc(d.photoName)}</span>` : ''}
      ${d.lat != null ? `<span>📍 LV95 ${esc(lv95(d))}</span>` : ''}
    </div>
    ${d.note ? `<p>${esc(d.note)}</p>` : ''}
  </div>`).join('')

  const html = `<!doctype html><html lang="${getLang() === 'de' ? 'de' : 'es'}"><head><meta charset="utf-8">
<title>${esc(t('Informe de inspección'))} — ${esc(inspection.name)}</title>
<style>
  @page { size: A4; margin: 14mm }
  body { font-family: system-ui, -apple-system, Arial, sans-serif; color: #111; margin: 0 }
  h1 { font-size: 22px; margin: 0 0 2px }
  .sub { color: #666; font-size: 12px; margin-bottom: 14px }
  h2 { font-size: 14px; border-bottom: 1px solid #ccc; padding-bottom: 3px; margin: 20px 0 10px }
  .kpis { display: flex; gap: 10px; margin: 10px 0 }
  .kpi { flex: 1; border: 1px solid #ddd; border-radius: 8px; padding: 8px 10px; text-align: center }
  .kpi b { font-size: 22px; display: block }
  .kpi span { font-size: 11px; color: #666 }
  .mapimg { width: 100%; border: 1px solid #ccc; border-radius: 6px; display: block }
  table { width: 100%; border-collapse: collapse; font-size: 12px }
  th, td { border: 1px solid #ddd; padding: 5px 7px; text-align: left; vertical-align: top }
  th { background: #f4f4f2 }
  .pin { display: inline-flex; width: 18px; height: 18px; border-radius: 50%; color: #fff; font-weight: 700; font-size: 11px; align-items: center; justify-content: center }
  .card { border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 12px; page-break-inside: avoid }
  .card-head { display: flex; align-items: center; gap: 8px; margin-bottom: 6px }
  .card-head .sev { margin-left: auto; font-weight: 700; font-size: 12px }
  .card img { width: 100%; max-height: 320px; object-fit: contain; border-radius: 6px; background: #f4f4f2 }
  .card-meta { display: flex; gap: 14px; color: #666; font-size: 11px; margin: 6px 0 }
  .card p { font-size: 13px; margin: 4px 0 0 }
  footer { margin-top: 20px; color: #999; font-size: 10px }
</style></head><body>
<h1>📋 ${esc(t('Informe de inspección'))}</h1>
<div class="sub">${esc(inspection.name)}${projectName ? ` · ${esc(projectName)}` : ''} · ${new Date().toLocaleDateString('es-CH')} · ${defects.length} ${esc(t('defectos'))}</div>
<div class="kpis">
  <div class="kpi"><b style="color:${SEVERITIES.high.color}">${counts.high}</b><span>${esc(sevLabel('high'))}</span></div>
  <div class="kpi"><b style="color:${SEVERITIES.med.color}">${counts.med}</b><span>${esc(sevLabel('med'))}</span></div>
  <div class="kpi"><b style="color:${SEVERITIES.low.color}">${counts.low}</b><span>${esc(sevLabel('low'))}</span></div>
</div>
${mapUrl ? `<h2>${esc(t('Mapa de defectos'))}</h2><img class="mapimg" src="${mapUrl}" alt="mapa"/>` : ''}
<h2>${esc(t('Resumen'))}</h2>
<table><thead><tr><th>#</th><th>${esc(t('Categoría'))}</th><th>${esc(t('Gravedad'))}</th><th>LV95</th><th>${esc(t('Observación'))}</th></tr></thead><tbody>${rows}</tbody></table>
<h2>${esc(t('Detalle'))}</h2>
${cards}
<footer>${esc(t('Fuentes: ortofoto SWISSIMAGE © swisstopo. Documento orientativo generado con Workpulse Drohne.'))}</footer>
<script>window.onload=()=>setTimeout(()=>window.print(),400)</scr` + `ipt></body></html>`

  if (win) {
    win.document.open()
    win.document.write(html)
    win.document.close()
  }
  onProgress?.(mapUrl
    ? `📋 ${t('Informe de inspección listo')} (${defects.length} ${t('defectos')}).`
    : `📋 ${t('Informe generado sin mapa (sin conexión)')} — ${defects.length} ${t('defectos')}.`)
  return { defects: defects.length }
}
