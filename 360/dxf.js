// Exportación del plano a DXF (formato CAD universal, AutoCAD R12).
//
// Los competidores (CubiCasa y similares) cobran este export como extra de
// pago; aquí se genera en el navegador a partir de las mediciones. Unidades:
// metros. La cámara está en el origen (0,0). Eje X = derecha, eje Y = -z
// (hacia donde miraba la cámara al frente).
//
// El formato usado es el subconjunto mínimo de DXF que abre cualquier CAD
// (AutoCAD, LibreCAD, QCAD, DraftSight, BricsCAD): entidades LINE y TEXT en
// la sección ENTITIES.

const num = (v) => (Math.round(v * 1000) / 1000).toString()

function line(x1, y1, x2, y2, layer) {
  return ['0', 'LINE', '8', layer, '10', num(x1), '20', num(y1), '11', num(x2), '21', num(y2)]
}

function text(x, y, h, value, layer) {
  return ['0', 'TEXT', '8', layer, '10', num(x), '20', num(y), '40', num(h), '1', value]
}

/**
 * Genera el archivo DXF del plano.
 * @param {Array} measurements  mediciones (points en {x,z}, metros)
 * @param {string} roomName     nombre de la capa base / habitación
 * @returns {string} contenido DXF
 */
export function buildDXF(measurements, roomName = 'HABITACION') {
  const layerName = roomName.toUpperCase().replace(/[^A-Z0-9]/g, '_').slice(0, 30) || 'PLANO'
  const rows = ['0', 'SECTION', '2', 'ENTITIES']

  // La cámara como cruz de referencia en el origen.
  rows.push(...line(-0.15, 0, 0.15, 0, 'CAMARA'))
  rows.push(...line(0, -0.15, 0, 0.15, 'CAMARA'))
  rows.push(...text(0.2, 0.2, 0.15, 'CAMARA', 'CAMARA'))

  for (const m of measurements) {
    const pts = (m.points ?? []).map((p) => ({ x: p.x, y: -p.z }))
    if (m.mode === 'height') {
      const p = pts[0]
      if (!p) continue
      rows.push(...line(p.x - 0.1, p.y - 0.1, p.x + 0.1, p.y + 0.1, layerName))
      rows.push(...line(p.x - 0.1, p.y + 0.1, p.x + 0.1, p.y - 0.1, layerName))
      rows.push(...text(p.x + 0.15, p.y, 0.15, `${m.label} h=${m.value.toFixed(2)}m`, layerName))
      continue
    }
    if (pts.length < 2) continue
    for (let i = 1; i < pts.length; i++) {
      rows.push(...line(pts[i - 1].x, pts[i - 1].y, pts[i].x, pts[i].y, layerName))
    }
    if (m.closed) {
      rows.push(...line(pts[pts.length - 1].x, pts[pts.length - 1].y, pts[0].x, pts[0].y, layerName))
    }
    const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length
    const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length
    rows.push(...text(cx, cy, 0.18, `${m.label} ${m.value.toFixed(2)}${m.unit === 'm²' ? 'm2' : m.unit}`, layerName))
  }

  rows.push('0', 'ENDSEC', '0', 'EOF')
  return rows.join('\r\n') + '\r\n'
}

export function downloadDXF(measurements, roomName) {
  const content = buildDXF(measurements, roomName)
  const blob = new Blob([content], { type: 'application/dxf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${(roomName || 'plano').replace(/\.[^.]+$/, '')}.dxf`
  a.click()
  URL.revokeObjectURL(url)
}
