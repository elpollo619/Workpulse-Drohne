import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Editor visual de GCP: se cargan las fotos del vuelo, se elige una diana
 * (GCP con coordenadas ya registradas) y se marca con un clic el píxel exacto
 * donde aparece en cada foto. Con las marcas se genera el gcp_list.txt
 * completo que OpenDroneMap usa para georreferenciar con precisión:
 *
 *   EPSG:4326
 *   lng lat elev  px py  foto.jpg  nombre_gcp
 *
 * Cada GCP debe marcarse en al menos 3 fotos distintas.
 */
export default function GcpEditor({ gcps, marks, onAddMark, onDeleteMark, onClose }) {
  const canvasRef = useRef(null)
  const [photos, setPhotos] = useState([]) // { name, url, bitmap }
  const [photoIdx, setPhotoIdx] = useState(-1)
  const [activeGcp, setActiveGcp] = useState(gcps[0]?.id ?? null)
  const [view, setView] = useState({ scale: 1, ox: 0, oy: 0 })
  const dragRef = useRef(null)

  const photo = photos[photoIdx] ?? null
  const marksHere = useMemo(
    () => marks.filter((m) => m.image === photo?.name),
    [marks, photo]
  )
  const countByGcp = useMemo(() => {
    const c = {}
    for (const m of marks) c[m.gcpId] = (c[m.gcpId] ?? 0) + 1
    return c
  }, [marks])

  async function onPhotosSelected(e) {
    const files = [...(e.target.files ?? [])]
    const loaded = []
    for (const f of files) {
      const bitmap = await createImageBitmap(f)
      loaded.push({ name: f.name, bitmap })
    }
    setPhotos((prev) => [...prev, ...loaded])
    if (photoIdx < 0 && loaded.length) setPhotoIdx(photos.length)
    e.target.value = ''
  }

  // Encaja la foto al abrirla.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !photo) return
    const scale = Math.min(canvas.clientWidth / photo.bitmap.width, canvas.clientHeight / photo.bitmap.height)
    setView({
      scale,
      ox: (canvas.clientWidth - photo.bitmap.width * scale) / 2,
      oy: (canvas.clientHeight - photo.bitmap.height * scale) / 2,
    })
  }, [photoIdx, photos.length])

  // Redibuja el lienzo (foto + marcas).
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
    if (!photo) return

    g.save()
    g.translate(view.ox, view.oy)
    g.scale(view.scale, view.scale)
    g.drawImage(photo.bitmap, 0, 0)
    g.restore()

    // Marcas: cruz + etiqueta.
    for (const m of marksHere) {
      const sx = m.x * view.scale + view.ox
      const sy = m.y * view.scale + view.oy
      const isActive = m.gcpId === activeGcp
      g.strokeStyle = isActive ? '#34d399' : '#f59e0b'
      g.lineWidth = 2
      g.beginPath()
      g.moveTo(sx - 12, sy); g.lineTo(sx - 3, sy)
      g.moveTo(sx + 3, sy); g.lineTo(sx + 12, sy)
      g.moveTo(sx, sy - 12); g.lineTo(sx, sy - 3)
      g.moveTo(sx, sy + 3); g.lineTo(sx, sy + 12)
      g.stroke()
      g.beginPath()
      g.arc(sx, sy, 8, 0, Math.PI * 2)
      g.stroke()
      const name = gcps.find((gc) => gc.id === m.gcpId)?.name ?? '?'
      g.fillStyle = g.strokeStyle
      g.font = '12px system-ui'
      g.fillText(name, sx + 12, sy - 8)
    }
  }, [photo, marksHere, view, activeGcp, gcps])

  // Zoom con rueda centrado en el cursor.
  function onWheel(e) {
    if (!photo) return
    const rect = canvasRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15
    setView((v) => {
      const scale = Math.min(12, Math.max(0.05, v.scale * factor))
      const k = scale / v.scale
      return { scale, ox: mx - (mx - v.ox) * k, oy: my - (my - v.oy) * k }
    })
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
    if (d.moved) setView((v) => ({ ...v, ox: d.ox + dx, oy: d.oy + dy }))
  }
  function onPointerUp(e) {
    const d = dragRef.current
    dragRef.current = null
    if (!d || d.moved || !photo || !activeGcp) return
    // Clic limpio: coloca (o recoloca) la marca del GCP activo en esta foto.
    const rect = canvasRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left - view.ox) / view.scale
    const py = (e.clientY - rect.top - view.oy) / view.scale
    if (px < 0 || py < 0 || px > photo.bitmap.width || py > photo.bitmap.height) return
    onAddMark(activeGcp, photo.name, Math.round(px), Math.round(py))
  }

  function exportGcpList() {
    const lines = ['EPSG:4326']
    for (const m of marks) {
      const g = gcps.find((gc) => gc.id === m.gcpId)
      if (!g) continue
      lines.push(`${g.lng} ${g.lat} ${g.elev ?? 0} ${m.x} ${m.y} ${m.image} ${String(g.name || 'gcp').replace(/\s+/g, '_')}`)
    }
    const blob = new Blob([lines.join('\n') + '\n'], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'gcp_list.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const readyGcps = gcps.filter((g) => (countByGcp[g.id] ?? 0) >= 3).length

  return (
    <div className="gcp-editor">
      <div className="gcp-side">
        <div className="gcp-side-head">
          <b>🎯 Editor de GCP</b>
          <button onClick={onClose}>✕ Cerrar</button>
        </div>

        {gcps.length === 0 && (
          <p className="hint">
            Primero registra tus GCP (coordenadas de las dianas) en el panel
            principal: <i>Puntos de control GCP → + añadir</i>.
          </p>
        )}

        <label className="block-label">Diana activa</label>
        <ul className="list">
          {gcps.map((g) => (
            <li
              key={g.id}
              className={g.id === activeGcp ? 'gcp-active' : ''}
              onClick={() => setActiveGcp(g.id)}
              style={{ cursor: 'pointer' }}
            >
              <span className="mrow">
                🎯 {g.name} · {countByGcp[g.id] ?? 0} marcas
                {(countByGcp[g.id] ?? 0) >= 3 ? ' ✅' : ` (faltan ${3 - (countByGcp[g.id] ?? 0)})`}
              </span>
            </li>
          ))}
        </ul>

        <label className="filebtn">
          📷 Añadir fotos del vuelo ({photos.length})
          <input type="file" accept="image/jpeg,image/png" multiple hidden onChange={onPhotosSelected} />
        </label>

        <label className="block-label">Fotos</label>
        <ul className="list gcp-photos">
          {photos.map((p, i) => {
            const n = marks.filter((m) => m.image === p.name).length
            return (
              <li
                key={p.name + i}
                className={i === photoIdx ? 'gcp-active' : ''}
                onClick={() => setPhotoIdx(i)}
                style={{ cursor: 'pointer' }}
              >
                <span className="mrow">🖼️ {p.name}{n > 0 && ` · ${n}`}</span>
              </li>
            )
          })}
          {photos.length === 0 && <li className="muted">Añade las fotos donde se vean las dianas.</li>}
        </ul>

        {marksHere.length > 0 && (
          <>
            <label className="block-label">Marcas en esta foto</label>
            <ul className="list">
              {marksHere.map((m) => (
                <li key={m.id}>
                  <span className="mrow">
                    {gcps.find((g) => g.id === m.gcpId)?.name} — px {m.x}, {m.y}
                  </span>
                  <button className="del" onClick={() => onDeleteMark(m.id)}>✕</button>
                </li>
              ))}
            </ul>
          </>
        )}

        <button disabled={marks.length === 0} onClick={exportGcpList}>
          💾 Exportar gcp_list.txt ({marks.length} marcas)
        </button>
        <p className="hint">
          {readyGcps}/{gcps.length} dianas con ≥3 marcas. Adjunta el archivo al
          procesar (pestaña ⚙️ → gcp_list.txt) para precisión centimétrica.
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
        />
        {!photo && (
          <div className="gcp-empty">
            Añade fotos y toca el centro exacto de la diana en cada una.
            <br />Arrastra para mover · rueda para zoom · clic para marcar.
          </div>
        )}
      </div>
    </div>
  )
}
