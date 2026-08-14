import { useMemo, useRef } from 'react'
import { MEASURE_COLORS } from '../src/components/Pano360View.jsx'

/**
 * Plano de planta: vista cenital (SVG) de las mediciones de suelo hechas en la
 * foto 360, a escala real, con cotas. La cámara está en el origen. Descargable
 * como SVG.
 */
export default function FloorPlan({ measurements, photoName, onClose }) {
  const svgRef = useRef(null)

  const geo = useMemo(() => {
    const pts = []
    for (const m of measurements) for (const p of m.points ?? []) pts.push(p)
    pts.push({ x: 0, z: 0 }) // la cámara
    const xs = pts.map((p) => p.x)
    const zs = pts.map((p) => p.z)
    const minX = Math.min(...xs) - 1
    const maxX = Math.max(...xs) + 1
    const minZ = Math.min(...zs) - 1
    const maxZ = Math.max(...zs) + 1
    const W = 640
    const H = 480
    const PAD = 40
    const scale = Math.min((W - PAD * 2) / (maxX - minX), (H - PAD * 2) / (maxZ - minZ))
    // x -> derecha; z (hacia -z se mira "al frente") -> arriba.
    const sx = (x) => PAD + (x - minX) * scale
    const sy = (z) => H - PAD - (z - minZ) * scale
    return { W, H, minX, maxX, minZ, maxZ, scale, sx, sy }
  }, [measurements])

  const gridStep = geo.scale > 60 ? 1 : geo.scale > 25 ? 2 : 5

  function download() {
    const svg = svgRef.current
    if (!svg) return
    const blob = new Blob(
      ['<?xml version="1.0" encoding="UTF-8"?>\n' + svg.outerHTML],
      { type: 'image/svg+xml' }
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(photoName || 'plano').replace(/\.[^.]+$/, '')}-plano.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  const gridLines = []
  for (let x = Math.ceil(geo.minX / gridStep) * gridStep; x <= geo.maxX; x += gridStep) {
    gridLines.push(<line key={`vx${x}`} x1={geo.sx(x)} y1={geo.sy(geo.minZ)} x2={geo.sx(x)} y2={geo.sy(geo.maxZ)} className="fp-grid" />)
  }
  for (let z = Math.ceil(geo.minZ / gridStep) * gridStep; z <= geo.maxZ; z += gridStep) {
    gridLines.push(<line key={`hz${z}`} x1={geo.sx(geo.minX)} y1={geo.sy(z)} x2={geo.sx(geo.maxX)} y2={geo.sy(z)} className="fp-grid" />)
  }

  return (
    <div className="floorplan">
      <div className="floorplan-card">
        <div className="floorplan-head">
          <b>🗺️ Plano de planta — {photoName}</b>
          <span>
            <button onClick={download}>💾 SVG</button>{' '}
            <button onClick={onClose}>✕ Cerrar</button>
          </span>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${geo.W} ${geo.H}`}
          xmlns="http://www.w3.org/2000/svg"
          className="floorplan-svg"
        >
          <style>{`
            .fp-grid { stroke: #2a3742; stroke-width: 0.5; }
            .fp-line { fill: none; stroke-width: 2; }
            .fp-area { fill-opacity: 0.12; stroke-width: 2; }
            .fp-label { font: 12px system-ui, sans-serif; fill: #e6edf3; }
            .fp-dim { font: 11px system-ui, sans-serif; fill: #8b9aa7; }
            .fp-bg { fill: #0f1418; }
          `}</style>
          <rect x="0" y="0" width={geo.W} height={geo.H} className="fp-bg" />
          {gridLines}
          <text x={geo.W - 12} y={geo.H - 10} textAnchor="end" className="fp-dim">
            cuadrícula {gridStep} m
          </text>

          {measurements.map((m, idx) => {
            const color = MEASURE_COLORS[idx % MEASURE_COLORS.length]
            const pts = m.points ?? []
            if (m.mode === 'height') {
              const p = pts[0]
              if (!p) return null
              return (
                <g key={m.id}>
                  <circle cx={geo.sx(p.x)} cy={geo.sy(p.z)} r="4" fill={color} />
                  <text x={geo.sx(p.x) + 7} y={geo.sy(p.z) - 6} className="fp-label" fill={color}>
                    {m.label}: {m.value.toFixed(2)} m ↑
                  </text>
                </g>
              )
            }
            if (pts.length < 2) return null
            const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${geo.sx(p.x).toFixed(1)},${geo.sy(p.z).toFixed(1)}`).join(' ')
            const cx = pts.reduce((s, p) => s + geo.sx(p.x), 0) / pts.length
            const cz = pts.reduce((s, p) => s + geo.sy(p.z), 0) / pts.length
            return (
              <g key={m.id}>
                <path
                  d={m.closed ? `${d} Z` : d}
                  className={m.closed ? 'fp-area' : 'fp-line'}
                  stroke={color}
                  fill={m.closed ? color : 'none'}
                />
                {pts.map((p, i) => (
                  <circle key={i} cx={geo.sx(p.x)} cy={geo.sy(p.z)} r="3" fill={color} />
                ))}
                <text x={cx} y={cz} textAnchor="middle" className="fp-label" fill={color}>
                  {m.label}: {m.value.toFixed(2)} {m.unit}
                </text>
              </g>
            )
          })}

          {/* La cámara en el origen */}
          <g>
            <circle cx={geo.sx(0)} cy={geo.sy(0)} r="6" fill="#ffffff" />
            <circle cx={geo.sx(0)} cy={geo.sy(0)} r="10" fill="none" stroke="#ffffff" strokeDasharray="2 2" />
            <text x={geo.sx(0) + 12} y={geo.sy(0) + 4} className="fp-dim">📷 cámara</text>
          </g>
        </svg>

        <p className="hint">
          Vista cenital a escala real de tus mediciones. La cámara está en el
          centro del sistema; las posiciones salen de la trigonometría sobre el
          plano del suelo.
        </p>
      </div>
    </div>
  )
}
