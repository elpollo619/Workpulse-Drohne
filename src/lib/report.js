// Informe imprimible del proyecto: abre una ventana con un resumen limpio de
// mediciones, puntos y GCP, y lanza el diálogo de impresión del navegador
// (desde ahí se puede "Guardar como PDF"). Sin dependencias.

import { fmtDistance, fmtArea, fmtVolume } from './measure.js'
import { wgs84ToLV95, isInSwitzerland } from './swiss.js'

const esc = (s) =>
  String(s ?? '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))

export function openPrintableReport(project) {
  const rows = []

  for (const m of project.measurements) {
    if (m.type === 'distance') {
      const extra = m.result?.elevGainM != null
        ? ` · desnivel ↗${m.result.elevGainM.toFixed(0)} m ↘${m.result.elevLossM.toFixed(0)} m`
        : ''
      rows.push(`<tr><td>📏 Distancia</td><td>${fmtDistance(m.result?.lengthM)}${extra}</td></tr>`)
    } else if (m.type === 'area') {
      rows.push(
        `<tr><td>⬛ Área</td><td>${fmtArea(m.result?.areaM2)} · perímetro ${fmtDistance(m.result?.perimeterM)}</td></tr>`
      )
    } else if (m.type === 'volume') {
      rows.push(
        `<tr><td>⛰️ Volumen</td><td>relleno ${fmtVolume(m.result?.fillM3)} · corte ${fmtVolume(m.result?.cutM3)}` +
          `${m.result?.baseModeUsed ? ` · base: ${esc(m.result.baseModeUsed)}` : ''}</td></tr>`
      )
    }
  }

  const pointRows = project.points.map((p) => {
    const lv95 = isInSwitzerland(p.lng, p.lat) ? wgs84ToLV95(p.lng, p.lat) : null
    return (
      `<tr><td>📍 ${esc(p.label)}</td>` +
      `<td>${p.lat.toFixed(6)}, ${p.lng.toFixed(6)}</td>` +
      `<td>${lv95 ? `${lv95.e.toFixed(2)} / ${lv95.n.toFixed(2)}` : '—'}</td>` +
      `<td>${p.elev != null ? p.elev.toFixed(2) + ' m' : '—'}</td></tr>`
    )
  })

  const gcpRows = project.gcps.map(
    (g) => `<tr><td>🎯 ${esc(g.name)}</td><td>${g.lat.toFixed(6)}, ${g.lng.toFixed(6)}</td><td>${g.elev} m</td></tr>`
  )

  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Informe — ${esc(project.name)}</title>
<style>
  body { font-family: system-ui, sans-serif; color: #111; margin: 32px; }
  h1 { font-size: 22px; margin: 0 0 2px; }
  .sub { color: #666; font-size: 13px; margin-bottom: 24px; }
  h2 { font-size: 15px; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-top: 26px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  td, th { text-align: left; padding: 6px 8px; border-bottom: 1px solid #eee; }
  th { color: #555; font-weight: 600; }
  .empty { color: #999; font-size: 13px; }
  footer { margin-top: 36px; color: #999; font-size: 11px; }
  @media print { body { margin: 12mm; } }
</style></head><body>
<h1>Workpulse Drohne — Informe de medición</h1>
<div class="sub">Proyecto: <b>${esc(project.name)}</b> · Generado: ${new Date().toLocaleString('es-CH')}</div>

<h2>Mediciones (${project.measurements.length})</h2>
${rows.length ? `<table>${rows.join('')}</table>` : '<p class="empty">Sin mediciones.</p>'}

<h2>Puntos GPS (${project.points.length})</h2>
${pointRows.length
    ? `<table><tr><th>Punto</th><th>WGS84 (lat, lon)</th><th>LV95 (E / N)</th><th>Elevación</th></tr>${pointRows.join('')}</table>`
    : '<p class="empty">Sin puntos.</p>'}

<h2>Puntos de control GCP (${project.gcps.length})</h2>
${gcpRows.length
    ? `<table><tr><th>GCP</th><th>WGS84</th><th>Elevación</th></tr>${gcpRows.join('')}</table>`
    : '<p class="empty">Sin GCP.</p>'}

<footer>Coordenadas LV95 = CH1903+ (EPSG:2056). Elevaciones: swissALTI3D (swisstopo) o DSM del vuelo.</footer>
<script>window.onload = () => setTimeout(() => window.print(), 300)</script>
</body></html>`

  const win = window.open('', '_blank')
  if (!win) return false
  win.document.write(html)
  win.document.close()
  return true
}
