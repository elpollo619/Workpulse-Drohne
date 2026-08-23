import { useEffect, useMemo, useRef, useState } from 'react'
import { parsePhotoMeta } from '../lib/exif.js'
import { SEVERITIES, openInspectionReport } from '../lib/inspection.js'
import { t, useLang, getLang } from '../lib/i18n.js'

// 📋 Editor de inspección: carga las fotos del vuelo, las anota (flecha, caja,
// punto) sobre la foto, y registra cada defecto con categoría, gravedad y nota
// más su posición GPS. Genera el informe PDF. Los defectos se guardan en el
// proyecto (metadatos + miniatura anotada); las fotos originales viven en
// memoria de esta sesión.

const ANNO_COLOR = '#ef4444'
const CATEGORIES = ['Grieta', 'Humedad', 'Teja rota', 'Corrosión', 'Desprendimiento', 'Obstrucción', 'Otro']
const CAT_DE = { Grieta: 'Riss', Humedad: 'Feuchtigkeit', 'Teja rota': 'Defekter Ziegel', Corrosión: 'Korrosion', Desprendimiento: 'Ablösung', Obstrucción: 'Verstopfung', Otro: 'Andere' }

export default function InspectionEditor({ projectName, inspection, onSave, onClose, onStatus }) {
  useLang()
  const canvasRef = useRef(null)
  const [photos, setPhotos] = useState([]) // { name, bitmap, meta }
  const [photoIdx, setPhotoIdx] = useState(-1)
  const [defects, setDefects] = useState(inspection?.defects ?? [])
  const [name, setName] = useState(inspection?.name ?? `${t('Inspección')} ${new Date().toLocaleDateString('es-CH')}`)
  const [tool, setTool] = useState('arrow') // arrow | box | point | pan
  const [annos, setAnnos] = useState([]) // anotaciones de la foto actual (px de imagen)
  const [draft, setDraft] = useState(null) // anotación en curso
  const [view, setView] = useState({ scale: 1, ox: 0, oy: 0 })
  const [severity, setSeverity] = useState('med')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [note, setNote] = useState('')
  const dragRef = useRef(null)

  const photo = photos[photoIdx] ?? null

  async function onPhotos(e) {
    const files = [...(e.target.files ?? [])]
    const loaded = []
    for (const f of files) {
      try {
        const bitmap = await createImageBitmap(f)
        let meta = null
        try { meta = parsePhotoMeta(await f.arrayBuffer()) } catch { /* sin GPS */ }
        loaded.push({ name: f.name, bitmap, meta })
      } catch { /* archivo no válido */ }
    }
    setPhotos((prev) => [...prev, ...loaded])
    if (photoIdx < 0 && loaded.length) selectPhoto(photos.length)
    e.target.value = ''
  }

  function selectPhoto(i) {
    setPhotoIdx(i)
    setAnnos([])
    setDraft(null)
  }

  // Encaja la foto al abrirla.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !photo) return
    const scale = Math.min(canvas.clientWidth / photo.bitmap.width, canvas.clientHeight / photo.bitmap.height) * 0.98
    setView({ scale, ox: (canvas.clientWidth - photo.bitmap.width * scale) / 2, oy: (canvas.clientHeight - photo.bitmap.height * scale) / 2 })
  }, [photoIdx])

  // Redibuja foto + anotaciones (compartido con la exportación de miniatura).
  function paint(g, sc, ox, oy, forExport = false) {
    const P = (p) => ({ x: p.x * sc + ox, y: p.y * sc + oy })
    if (photo) g.drawImage(photo.bitmap, ox, oy, photo.bitmap.width * sc, photo.bitmap.height * sc)
    const all = draft ? [...annos, draft] : annos
    g.lineWidth = Math.max(2, 4 * sc * (forExport ? 1 : 1))
    g.strokeStyle = ANNO_COLOR
    g.fillStyle = ANNO_COLOR
    for (const a of all) {
      if (a.type === 'box') {
        const p1 = P(a.p1), p2 = P(a.p2)
        g.strokeRect(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y), Math.abs(p2.x - p1.x), Math.abs(p2.y - p1.y))
      } else if (a.type === 'arrow') {
        const p1 = P(a.p1), p2 = P(a.p2)
        g.beginPath(); g.moveTo(p1.x, p1.y); g.lineTo(p2.x, p2.y); g.stroke()
        const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x)
        const h = 14 * Math.max(1, sc)
        g.beginPath()
        g.moveTo(p2.x, p2.y)
        g.lineTo(p2.x - h * Math.cos(ang - 0.4), p2.y - h * Math.sin(ang - 0.4))
        g.lineTo(p2.x - h * Math.cos(ang + 0.4), p2.y - h * Math.sin(ang + 0.4))
        g.closePath(); g.fill()
      } else if (a.type === 'point') {
        const p = P(a.p1)
        g.beginPath(); g.arc(p.x, p.y, 8 * Math.max(1, sc), 0, Math.PI * 2); g.stroke()
        g.beginPath(); g.arc(p.x, p.y, 2.5 * Math.max(1, sc), 0, Math.PI * 2); g.fill()
      }
    }
  }

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
    if (photo) paint(g, view.scale, view.ox, view.oy)
  }, [photo, annos, draft, view])

  function toImg(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    return { x: (e.clientX - rect.left - view.ox) / view.scale, y: (e.clientY - rect.top - view.oy) / view.scale }
  }
  function onWheel(e) {
    if (!photo) return
    const rect = canvasRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left, my = e.clientY - rect.top
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15
    setView((v) => {
      const scale = Math.min(20, Math.max(0.03, v.scale * factor))
      const k = scale / v.scale
      return { scale, ox: mx - (mx - v.ox) * k, oy: my - (my - v.oy) * k }
    })
  }
  function onDown(e) {
    if (!photo) return
    const p = toImg(e)
    if (tool === 'pan') { dragRef.current = { pan: true, x: e.clientX, y: e.clientY, ox: view.ox, oy: view.oy }; return }
    if (tool === 'point') { setAnnos((a) => [...a, { type: 'point', p1: p }]); return }
    dragRef.current = { draw: true }
    setDraft({ type: tool, p1: p, p2: p })
  }
  function onMove(e) {
    const d = dragRef.current
    if (!d) return
    if (d.pan) { setView((v) => ({ ...v, ox: d.ox + (e.clientX - d.x), oy: d.oy + (e.clientY - d.y) })); return }
    if (d.draw) setDraft((dr) => (dr ? { ...dr, p2: toImg(e) } : dr))
  }
  function onUp() {
    const d = dragRef.current
    dragRef.current = null
    if (d?.draw && draft) {
      const len = Math.hypot(draft.p2.x - draft.p1.x, draft.p2.y - draft.p1.y)
      if (len > 3) setAnnos((a) => [...a, draft])
      setDraft(null)
    }
  }

  // Renderiza la foto actual con sus anotaciones a una miniatura JPEG (~1000 px).
  function renderThumb() {
    if (!photo) return null
    const maxW = 1000
    const sc = Math.min(1, maxW / photo.bitmap.width)
    const c = document.createElement('canvas')
    c.width = Math.round(photo.bitmap.width * sc)
    c.height = Math.round(photo.bitmap.height * sc)
    paint(c.getContext('2d'), sc, 0, 0, true)
    return c.toDataURL('image/jpeg', 0.82)
  }

  function addDefect() {
    if (!photo) return
    const d = {
      id: crypto.randomUUID(),
      photoName: photo.name,
      lat: photo.meta?.lat ?? null,
      lng: photo.meta?.lng ?? null,
      severity, category, note: note.trim(),
      image: renderThumb(),
    }
    setDefects((prev) => [...prev, d])
    setAnnos([]); setDraft(null); setNote('')
    onStatus?.(`📋 ${t('Defecto registrado')} (${defects.length + 1}).`)
  }

  function removeDefect(id) {
    setDefects((prev) => prev.filter((d) => d.id !== id))
  }

  function save() {
    onSave({ id: inspection?.id ?? crypto.randomUUID(), name, defects, createdAt: inspection?.createdAt ?? new Date().toISOString() })
  }

  async function exportPDF() {
    if (!defects.length) return onStatus?.(`⚠️ ${t('Registra al menos un defecto para el informe.')}`)
    const win = window.open('', '_blank')
    if (!win) return onStatus?.(`⚠️ ${t('El navegador bloqueó la ventana del informe.')}`)
    await openInspectionReport({ inspection: { name, defects }, projectName, win, onProgress: onStatus })
  }

  return (
    <div className="gcp-editor inspection-editor">
      <div className="gcp-side">
        <div className="gcp-side-head">
          <b>📋 {t('Editor de inspección')}</b>
          <button onClick={() => { save(); onClose() }}>{t('✕ Guardar y cerrar')}</button>
        </div>

        <label className="block-label">{t('Nombre del informe')}</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label className="filebtn">
          📷 {t('Añadir fotos del vuelo')} ({photos.length})
          <input type="file" accept="image/jpeg,image/png" multiple hidden onChange={onPhotos} />
        </label>

        {photos.length > 0 && (
          <>
            <label className="block-label">{t('Fotos')}</label>
            <ul className="list gcp-photos">
              {photos.map((p, i) => (
                <li key={p.name + i} className={i === photoIdx ? 'gcp-active' : ''} onClick={() => selectPhoto(i)} style={{ cursor: 'pointer' }}>
                  <span className="mrow">🖼️ {p.name}{p.meta ? ' · 📍' : ` · ${t('sin GPS')}`}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {photo && (
          <>
            <label className="block-label">{t('Anotar')}</label>
            <div className="tools">
              {[['arrow', '➡️'], ['box', '⬜'], ['point', '⊙'], ['pan', '✋']].map(([id, ic]) => (
                <button key={id} className={tool === id ? 'tool active' : 'tool'} onClick={() => setTool(id)}>{ic}</button>
              ))}
              <button className="tool" onClick={() => { setAnnos([]); setDraft(null) }} title={t('Borrar anotaciones')}>🗑️</button>
            </div>

            <label className="block-label">{t('Gravedad')}</label>
            <div className="tools">
              {Object.entries(SEVERITIES).map(([id, s]) => (
                <button
                  key={id}
                  className={severity === id ? 'tool active' : 'tool'}
                  style={severity === id ? { background: s.color, borderColor: s.color, color: '#fff' } : { borderColor: s.color }}
                  onClick={() => setSeverity(id)}
                >
                  {getSevLabel(id)}
                </button>
              ))}
            </div>

            <label className="block-label">{t('Categoría')}</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{getCatLabel(c)}</option>)}
            </select>

            <label className="block-label">{t('Observación')}</label>
            <textarea rows="2" value={note} onChange={(e) => setNote(e.target.value)} placeholder={t('Descripción del defecto…')} />

            <button className="manual-try" onClick={addDefect}>➕ {t('Registrar defecto')}</button>
          </>
        )}

        <label className="block-label">{t('Defectos')} ({defects.length})</label>
        <ul className="list">
          {defects.map((d, i) => (
            <li key={d.id}>
              <span className="mrow">
                <span className="ins-pin" style={{ background: SEVERITIES[d.severity]?.color }}>{i + 1}</span>{' '}
                {getCatLabel(d.category)}{d.lat != null ? ' · 📍' : ''}
              </span>
              <button className="del" onClick={() => removeDefect(d.id)}>✕</button>
            </li>
          ))}
          {defects.length === 0 && <li className="muted">{t('Anota una foto y registra el defecto.')}</li>}
        </ul>

        <button disabled={!defects.length} onClick={exportPDF}>🖨️ {t('Informe PDF')}</button>
      </div>

      <div className="gcp-canvas-wrap">
        <canvas
          ref={canvasRef}
          className="gcp-canvas"
          onWheel={onWheel}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
        />
        {!photo && (
          <div className="gcp-empty">
            {t('Añade las fotos del vuelo, anótalas (flecha/caja/punto) y registra cada defecto.')}
            <br />{t('Rueda = zoom · ✋ mover.')}
          </div>
        )}
      </div>
    </div>
  )
}

// Etiquetas de gravedad/categoría según idioma (fuera del componente para no
// recrearse; leen el idioma en tiempo de render vía t()).
function getSevLabel(id) {
  return getLang() === 'de' ? SEVERITIES[id].labelDe : SEVERITIES[id].label
}
function getCatLabel(c) {
  const map = { Grieta: 'Riss', Humedad: 'Feuchtigkeit', 'Teja rota': 'Defekter Ziegel', Corrosión: 'Korrosion', Desprendimiento: 'Ablösung', Obstrucción: 'Verstopfung', Otro: 'Andere' }
  return getLang() === 'de' ? (map[c] ?? c) : c
}
