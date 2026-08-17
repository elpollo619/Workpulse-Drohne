import { useEffect, useRef, useState } from 'react'
import { rectifyImage } from '../lib/homography.js'
import { downloadFacadeSVG, downloadFacadeDXF, openFacadePDF, suggestScale, elementsBBox } from '../lib/facade.js'
import { t, useLang } from '../lib/i18n.js'

// 🏢 Editor de fachadas: foto frontal del drone → rectificar (4 esquinas) →
// trazar contorno, ventanas/puertas y líneas → plano acotado (PDF a escala,
// DXF para CAD, SVG). La geometría se guarda en el proyecto; la foto vive
// solo en memoria (súbela de nuevo para retocar sobre ella).

const FTOOLS = [
  { id: 'pan', label: '✋', hint: 'Mover: arrastra la vista · rueda = zoom' },
  { id: 'rectify', label: '📐 Rectificar', hint: 'Toca las 4 esquinas de un rectángulo real (ventana o fachada): ① arriba-izq ② arriba-der ③ abajo-der ④ abajo-izq. Corrige la perspectiva y fija la escala.' },
  { id: 'calibrate', label: '📏 Calibrar', hint: 'Si la foto ya es frontal: toca 2 puntos con distancia conocida (p.ej. ancho de puerta).' },
  { id: 'outline', label: '⬛ Contorno', hint: 'Traza el contorno de la fachada punto a punto; doble clic o Enter para cerrar.' },
  { id: 'rect', label: '🪟 Hueco', hint: 'Ventana/puerta: toca una esquina y la opuesta. La cota se añade sola.' },
  { id: 'line', label: '➖ Línea', hint: 'Detalle (canalón, zócalo…): toca los 2 extremos.' },
  { id: 'delete', label: '🗑️', hint: 'Toca un elemento para borrarlo.' },
]

const FACADE_NAMES = ['Nordfassade', 'Südfassade', 'Ostfassade', 'Westfassade', 'Fachada']

export default function FacadeEditor({ projectName, facade, onSave, onClose }) {
  useLang() // re-renderiza al cambiar de idioma
  const canvasRef = useRef(null)
  const [bitmap, setBitmap] = useState(null) // foto (original o rectificada)
  const [imgSize, setImgSize] = useState(facade?.imgW ? { w: facade.imgW, h: facade.imgH } : null)
  const [elements, setElements] = useState(facade?.elements ?? [])
  const [mpp, setMpp] = useState(facade?.metersPerPx ?? null)
  const [name, setName] = useState(facade?.name ?? 'Nordfassade')
  const [tool, setTool] = useState('pan')
  const [temp, setTemp] = useState([]) // puntos en curso de la herramienta activa
  const [view, setView] = useState({ scale: 1, ox: 0, oy: 0 })
  const [msg, setMsg] = useState(null)
  const dragRef = useRef(null)

  async function onPhoto(e) {
    const f = e.target.files?.[0]
    if (!f) return
    const bm = await createImageBitmap(f)
    setBitmap(bm)
    setImgSize({ w: bm.width, h: bm.height })
    fitView(bm.width, bm.height)
    setTemp([])
    setMsg('Foto cargada. 📐 Rectifica la perspectiva (o 📏 calibra si ya es frontal).')
    e.target.value = ''
  }

  function fitView(w, h) {
    const canvas = canvasRef.current
    if (!canvas) return
    const scale = Math.min(canvas.clientWidth / w, canvas.clientHeight / h) * 0.95
    setView({ scale, ox: (canvas.clientWidth - w * scale) / 2, oy: (canvas.clientHeight - h * scale) / 2 })
  }

  // --- redibujo ---
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = canvas.clientWidth * dpr
    canvas.height = canvas.clientHeight * dpr
    const g = canvas.getContext('2d')
    g.setTransform(dpr, 0, 0, dpr, 0, 0)
    g.fillStyle = '#0b0f12'
    g.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    g.save()
    g.translate(view.ox, view.oy)
    g.scale(view.scale, view.scale)
    if (bitmap) g.drawImage(bitmap, 0, 0)
    else if (imgSize) {
      g.fillStyle = '#f4f4f2'
      g.fillRect(0, 0, imgSize.w, imgSize.h)
    }
    g.restore()

    const P = (p) => ({ x: p.x * view.scale + view.ox, y: p.y * view.scale + view.oy })
    const drawPts = (pts, close, color, width = 2) => {
      if (!pts.length) return
      g.strokeStyle = color
      g.lineWidth = width
      g.beginPath()
      pts.forEach((p, i) => {
        const s = P(p)
        i ? g.lineTo(s.x, s.y) : g.moveTo(s.x, s.y)
      })
      if (close) g.closePath()
      g.stroke()
    }
    const label = (p, text, color) => {
      const s = P(p)
      g.fillStyle = color
      g.font = 'bold 12px system-ui'
      g.fillText(text, s.x + 5, s.y - 5)
    }

    for (const el of elements) {
      if (el.type === 'outline') drawPts(el.pts, true, '#34d399', 2.5)
      else if (el.type === 'rect') {
        const [a, b] = el.pts
        const pts = [a, { x: b.x, y: a.y }, b, { x: a.x, y: b.y }]
        drawPts(pts, true, '#60a5fa')
        if (mpp) {
          label({ x: Math.min(a.x, b.x), y: Math.min(a.y, b.y) },
            `${(Math.abs(b.x - a.x) * mpp).toFixed(2)} × ${(Math.abs(b.y - a.y) * mpp).toFixed(2)} m`, '#93c5fd')
        }
      } else if (el.type === 'line') {
        drawPts(el.pts, false, '#fbbf24')
        if (mpp) {
          const [a, b] = el.pts
          label({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
            `${(Math.hypot(b.x - a.x, b.y - a.y) * mpp).toFixed(2)} m`, '#fde68a')
        }
      }
    }

    // puntos temporales de la herramienta activa
    if (temp.length) {
      drawPts(temp, false, '#f87171')
      temp.forEach((p, i) => {
        const s = P(p)
        g.fillStyle = '#f87171'
        g.beginPath()
        g.arc(s.x, s.y, 5, 0, Math.PI * 2)
        g.fill()
        g.fillStyle = '#fff'
        g.font = 'bold 10px system-ui'
        g.fillText(String(i + 1), s.x - 3, s.y + 3.5)
      })
    }
  }, [bitmap, imgSize, elements, temp, view, mpp])

  // --- interacción ---
  function onWheel(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15
    setView((v) => {
      const scale = Math.min(20, Math.max(0.03, v.scale * factor))
      const k = scale / v.scale
      return { scale, ox: mx - (mx - v.ox) * k, oy: my - (my - v.oy) * k }
    })
  }
  function toImg(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left - view.ox) / view.scale,
      y: (e.clientY - rect.top - view.oy) / view.scale,
    }
  }
  function onPointerDown(e) {
    dragRef.current = { x: e.clientX, y: e.clientY, ox: view.ox, oy: view.oy, moved: false }
  }
  function onPointerMove(e) {
    const d = dragRef.current
    if (!d) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.hypot(dx, dy) > 5) d.moved = true
    if (d.moved && tool === 'pan') setView((v) => ({ ...v, ox: d.ox + dx, oy: d.oy + dy }))
  }
  function onPointerUp(e) {
    const d = dragRef.current
    dragRef.current = null
    if (!d || (d.moved && tool === 'pan')) return
    if (d.moved) return
    if (tool === 'pan' || !imgSize) return
    const p = toImg(e)

    if (tool === 'rectify') {
      const pts = [...temp, p]
      setTemp(pts)
      if (pts.length === 4) rectify(pts)
    } else if (tool === 'calibrate') {
      const pts = [...temp, p]
      setTemp(pts)
      if (pts.length === 2) {
        const dist = parseFloat(prompt('Distancia real entre los 2 puntos (m):', '1.00') ?? '')
        setTemp([])
        if (!isNaN(dist) && dist > 0) {
          const px = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y)
          setMpp(dist / px)
          setMsg(`📏 Escala fijada: ${(dist / px * 1000).toFixed(1)} mm/px. Ya puedes trazar.`)
        }
      }
    } else if (tool === 'rect') {
      const pts = [...temp, p]
      setTemp(pts)
      if (pts.length === 2) {
        setElements((els) => [...els, { id: crypto.randomUUID(), type: 'rect', pts }])
        setTemp([])
      }
    } else if (tool === 'line') {
      const pts = [...temp, p]
      setTemp(pts)
      if (pts.length === 2) {
        setElements((els) => [...els, { id: crypto.randomUUID(), type: 'line', pts }])
        setTemp([])
      }
    } else if (tool === 'outline') {
      setTemp((t) => [...t, p])
    } else if (tool === 'delete') {
      deleteNear(p)
    }
  }
  function onDoubleClick() {
    if (tool === 'outline') closeOutline()
  }
  function closeOutline() {
    setTemp((t) => {
      if (t.length >= 3) {
        setElements((els) => [
          ...els.filter((el) => el.type !== 'outline'),
          { id: crypto.randomUUID(), type: 'outline', pts: t },
        ])
      }
      return []
    })
  }
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setTemp([])
      else if (e.key === 'Enter' && tool === 'outline') closeOutline()
      else if (e.key === 'Backspace' && temp.length) {
        e.preventDefault()
        setTemp((t) => t.slice(0, -1))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tool, temp.length])

  function deleteNear(p) {
    let best = null
    let bestD = 20 / view.scale
    for (const el of elements) {
      for (const q of el.pts) {
        const d = Math.hypot(q.x - p.x, q.y - p.y)
        if (d < bestD) {
          bestD = d
          best = el.id
        }
      }
    }
    if (best) setElements((els) => els.filter((el) => el.id !== best))
  }

  // Rectificación: 4 esquinas (TL,TR,BR,BL) + medidas reales del rectángulo.
  function rectify(corners) {
    const wReal = parseFloat(prompt('Ancho real del rectángulo marcado (m):', '10.0') ?? '')
    const hReal = parseFloat(prompt('Alto real del rectángulo marcado (m):', '6.0') ?? '')
    setTemp([])
    if (isNaN(wReal) || isNaN(hReal) || wReal <= 0 || hReal <= 0) return
    if (!bitmap) return
    setMsg('📐 Rectificando…')
    // Resolución de salida: ~ mantiene el detalle de la foto en la zona marcada.
    const pxW = Math.hypot(corners[1].x - corners[0].x, corners[1].y - corners[0].y)
    const outW = Math.round(Math.min(3200, Math.max(800, pxW)))
    const outH = Math.round(outW * (hReal / wReal))
    setTimeout(() => {
      const canvas = rectifyImage(bitmap, corners, outW, outH)
      if (!canvas) return setMsg('⚠️ Las esquinas marcadas no forman un rectángulo válido.')
      createImageBitmap(canvas).then((bm) => {
        setBitmap(bm)
        setImgSize({ w: outW, h: outH })
        setElements([]) // la geometría previa ya no coincide con la foto nueva
        setMpp(wReal / outW)
        fitView(outW, outH)
        setMsg(`📐 Foto rectificada y escala fijada (${((wReal / outW) * 1000).toFixed(1)} mm/px). Traza el contorno y los huecos.`)
      })
    }, 30)
  }

  function save() {
    onSave({
      id: facade?.id ?? crypto.randomUUID(),
      name,
      elements,
      metersPerPx: mpp,
      imgW: imgSize?.w ?? null,
      imgH: imgSize?.h ?? null,
    })
  }

  function exportOpts() {
    return {
      facadeName: name,
      projectName,
      elements,
      metersPerPx: mpp,
      imgH: imgSize?.h ?? 0,
      scale: suggestScale((elementsBBox(elements)?.maxX - elementsBBox(elements)?.minX) * mpp || 10),
    }
  }
  const canExport = mpp && elements.length > 0

  return (
    <div className="gcp-editor facade-editor">
      <div className="gcp-side">
        <div className="gcp-side-head">
          <b>{t('🏢 Editor de fachadas')}</b>
          <button onClick={() => { save(); onClose() }}>{t('✕ Guardar y cerrar')}</button>
        </div>

        <label className="block-label">{t('Fachada')}</label>
        <div className="row">
          <select value={name} onChange={(e) => setName(e.target.value)}>
            {FACADE_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <label className="filebtn">
          {bitmap ? t('📷 Cambiar foto') : t('📷 Cargar foto de la fachada')}
          <input type="file" accept="image/jpeg,image/png" hidden onChange={onPhoto} />
        </label>

        <label className="block-label">{t('Herramienta')}</label>
        <div className="tools">
          {FTOOLS.map((tl) => (
            <button
              key={tl.id}
              className={tool === tl.id ? 'tool active' : 'tool'}
              title={t(tl.hint)}
              onClick={() => { setTool(tl.id); setTemp([]); setMsg(tl.hint) }}
            >
              {t(tl.label)}
            </button>
          ))}
        </div>
        <p className="hint">{t(msg ?? FTOOLS.find((tl) => tl.id === tool)?.hint ?? '')}</p>

        <label className="block-label">{t('Estado')}</label>
        <ul className="list">
          <li><span className="mrow">{mpp ? `📏 Escala: ${(mpp * 1000).toFixed(1)} mm/px ✅` : '📏 Sin escala — rectifica o calibra'}</span></li>
          <li><span className="mrow">⬛ Contorno: {elements.some((e) => e.type === 'outline') ? '✅' : '—'}</span></li>
          <li><span className="mrow">🪟 Huecos: {elements.filter((e) => e.type === 'rect').length} · ➖ Líneas: {elements.filter((e) => e.type === 'line').length}</span></li>
        </ul>

        <label className="block-label">{t('Exportar plano')}</label>
        <div className="tools">
          <button disabled={!canExport} onClick={() => { const r = openFacadePDF(exportOpts()); if (r) setMsg(`🖨️ Plano 1:${exportOpts().scale} listo para imprimir/guardar PDF.`) }}>
            {t('🖨️ PDF a escala')}
          </button>
          <button disabled={!canExport} onClick={() => downloadFacadeDXF(`${name}`, exportOpts())}>
            {t('📐 DXF (CAD)')}
          </button>
          <button disabled={!canExport} onClick={() => downloadFacadeSVG(`${name}`, exportOpts())}>
            {t('🖼️ SVG')}
          </button>
        </div>
        <p className="hint">
          El PDF sale a escala real (1:{canExport ? exportOpts().scale : '—'}) con
          cotas de cada hueco y generales — como un Fassadenplan de arquitecto.
          El DXF (metros) se importa en ArchiCAD/Vectorworks.
        </p>
      </div>

      <div className="gcp-canvas-wrap">
        <canvas
          ref={canvasRef}
          className="gcp-canvas"
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onDoubleClick={onDoubleClick}
        />
        {!bitmap && !imgSize && (
          <div className="gcp-empty">
            Carga la foto frontal de la fachada (del vuelo de órbita 🏠).
            <br />📐 Rectifica la perspectiva → traza contorno y huecos → exporta el plano.
          </div>
        )}
      </div>
    </div>
  )
}
