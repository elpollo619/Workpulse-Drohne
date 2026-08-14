import { useMemo } from 'react'
import { buildPlanSVG } from './plansvg.js'
import { downloadDXF } from './dxf.js'

/**
 * Plano de planta: vista cenital a escala real de las mediciones, con
 * exportación a SVG, PNG y DXF (CAD).
 */
export default function FloorPlan({ measurements, photoName, roomName, onClose }) {
  const svgString = useMemo(
    () => buildPlanSVG(measurements, { title: roomName || photoName }),
    [measurements, roomName, photoName]
  )
  const baseName = (roomName || photoName || 'plano').replace(/\.[^.]+$/, '')

  function downloadSVG() {
    const blob = new Blob(['<?xml version="1.0" encoding="UTF-8"?>\n' + svgString], { type: 'image/svg+xml' })
    trigger(blob, `${baseName}-plano.svg`)
  }

  function downloadPNG() {
    const img = new Image()
    const url = URL.createObjectURL(new Blob([svgString], { type: 'image/svg+xml' }))
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1280
      canvas.height = 960
      const g = canvas.getContext('2d')
      g.drawImage(img, 0, 0, 1280, 960)
      URL.revokeObjectURL(url)
      canvas.toBlob((blob) => blob && trigger(blob, `${baseName}-plano.png`), 'image/png')
    }
    img.src = url
  }

  function trigger(blob, name) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="floorplan">
      <div className="floorplan-card">
        <div className="floorplan-head">
          <b>🗺️ {roomName || photoName}</b>
          <span>
            <button onClick={downloadSVG}>SVG</button>{' '}
            <button onClick={downloadPNG}>PNG</button>{' '}
            <button onClick={() => downloadDXF(measurements, baseName)} title="Formato CAD: AutoCAD, LibreCAD, QCAD…">
              📐 DXF (CAD)
            </button>{' '}
            <button onClick={onClose}>✕</button>
          </span>
        </div>
        <div className="floorplan-svgwrap" dangerouslySetInnerHTML={{ __html: svgString }} />
        <p className="hint">
          Vista cenital a escala real. El DXF abre en cualquier CAD (unidades en
          metros, cámara en el origen) — lo que otras apps cobran aparte, aquí
          gratis.
        </p>
      </div>
    </div>
  )
}
