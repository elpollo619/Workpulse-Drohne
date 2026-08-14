import { useEffect, useState } from 'react'
import Pano360View from './Pano360View.jsx'
import FloorPlan from './FloorPlan.jsx'
import { openSessionReport } from './report360.js'

const STORE_KEY = 'workpulse360.measurements.v1'
const NAMES_KEY = 'workpulse360.roomnames.v1'

function loadJSON(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? {}
  } catch {
    return {}
  }
}

/**
 * Workpulse 360 — app independiente para medir espacios con cámaras 360°.
 * Varias fotos (habitaciones), mediciones persistentes por foto, plano de
 * planta y exportación CSV.
 */
export default function App360() {
  const [photos, setPhotos] = useState([]) // { name, url }
  const [activeName, setActiveName] = useState(null)
  const [store, setStore] = useState(() => loadJSON(STORE_KEY)) // { [photoName]: measurements[] }
  const [roomNames, setRoomNames] = useState(() => loadJSON(NAMES_KEY)) // { [photoName]: 'Salón' }
  const [showPlan, setShowPlan] = useState(false)

  // Persistencia por nombre de foto.
  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(store))
  }, [store])
  useEffect(() => {
    localStorage.setItem(NAMES_KEY, JSON.stringify(roomNames))
  }, [roomNames])

  function renameRoom(photoName) {
    const name = prompt('Nombre del espacio (p.ej. Salón, Cocina):', roomNames[photoName] ?? '')
    if (name === null) return
    setRoomNames((prev) => ({ ...prev, [photoName]: name.trim() }))
  }

  function renameMeasurement(id) {
    const ms = store[activeName] ?? []
    const m = ms.find((x) => x.id === id)
    if (!m) return
    const label = prompt('Etiqueta de la medición:', m.label)
    if (!label) return
    setStore((prev) => ({
      ...prev,
      [activeName]: (prev[activeName] ?? []).map((x) => (x.id === id ? { ...x, label: label.trim() } : x)),
    }))
  }

  const active = photos.find((p) => p.name === activeName) ?? null
  const measurements = store[activeName] ?? []

  function onFiles(e) {
    const files = [...(e.target.files ?? [])]
    if (!files.length) return
    const added = files.map((f) => ({ name: f.name, url: URL.createObjectURL(f) }))
    setPhotos((prev) => {
      const names = new Set(prev.map((p) => p.name))
      return [...prev, ...added.filter((a) => !names.has(a.name))]
    })
    setActiveName(added[0].name)
    e.target.value = ''
  }

  function saveMeasurement(m) {
    setStore((prev) => ({
      ...prev,
      [activeName]: [...(prev[activeName] ?? []), m],
    }))
  }

  function deleteMeasurement(id) {
    setStore((prev) => ({
      ...prev,
      [activeName]: (prev[activeName] ?? []).filter((m) => m.id !== id),
    }))
  }

  function exportCSV() {
    const rows = [['foto', 'etiqueta', 'tipo', 'valor', 'unidad', 'perimetro_m']]
    for (const [photo, ms] of Object.entries(store)) {
      for (const m of ms) {
        rows.push([photo, m.label, m.mode, m.value.toFixed(3), m.unit, m.perimeter?.toFixed(3) ?? ''])
      }
    }
    const blob = new Blob([rows.map((r) => r.join(',')).join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'workpulse360-mediciones.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (active) {
    return (
      <div className="app360-stage">
        <Pano360View
          key={active.name}
          imageURL={active.url}
          measurements={measurements}
          onSave={saveMeasurement}
          onDelete={deleteMeasurement}
          onRename={renameMeasurement}
          onOpenPlan={() => setShowPlan(true)}
          onClose={() => setActiveName(null)}
          extraControls={
            <>
              {photos.length > 1 && (
                <select
                  value={activeName}
                  onChange={(e) => setActiveName(e.target.value)}
                  title="Cambiar de foto/habitación"
                >
                  {photos.map((p) => (
                    <option key={p.name} value={p.name}>
                      🖼️ {roomNames[p.name] || p.name} ({(store[p.name] ?? []).length})
                    </option>
                  ))}
                </select>
              )}
              <button onClick={() => renameRoom(active.name)} title="Nombrar este espacio">
                🏷️ {roomNames[active.name] || 'nombrar'}
              </button>
            </>
          }
        />
        {showPlan && (
          <FloorPlan
            measurements={measurements}
            photoName={active.name}
            roomName={roomNames[active.name]}
            onClose={() => setShowPlan(false)}
          />
        )}
      </div>
    )
  }

  const totalMeasurements = Object.values(store).reduce((s, ms) => s + ms.length, 0)
  const totalArea = Object.values(store)
    .flat()
    .filter((m) => m.mode === 'area')
    .reduce((s, m) => s + m.value, 0)

  return (
    <div className="app360-landing">
      <header className="brand">
        <h1>Workpulse<span>360</span></h1>
        <p>Medición de espacios con cámara 360°</p>
      </header>

      <label className="filebtn app360-open">
        📷 Abrir fotos 360° y medir
        <input type="file" accept="image/jpeg,image/png" multiple hidden onChange={onFiles} />
      </label>

      {photos.length > 0 && (
        <section className="app360-rooms">
          <b>Sesión actual{totalArea > 0 ? ` · superficie total ${totalArea.toFixed(2)} m²` : ''}</b>
          <ul className="list">
            {photos.map((p) => (
              <li key={p.name} onClick={() => setActiveName(p.name)} style={{ cursor: 'pointer' }}>
                <span className="mrow">
                  🖼️ {roomNames[p.name] || p.name} · {(store[p.name] ?? []).length} mediciones
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="app360-steps">
        <div className="app360-step">
          <b>1 · Captura</b>
          <p>
            Coloca la cámara (Insta360, Ricoh Theta…) en un trípode o palo a
            <b> altura conocida</b> — p. ej. 1.60 m — en medio de cada estancia.
          </p>
        </div>
        <div className="app360-step">
          <b>2 · Exporta</b>
          <p>
            Desde la app de la cámara, exporta en formato
            <b> equirectangular</b> (la imagen 360 completa "desplegada", 2:1).
          </p>
        </div>
        <div className="app360-step">
          <b>3 · Mide</b>
          <p>
            <b>📏 distancias</b>, <b>📐 áreas</b> y <b>📊 alturas</b>. Cada
            medida se guarda con su color, genera el <b>🗺️ plano de planta</b> y
            se recuerda aunque cierres la app (por nombre de foto).
          </p>
        </div>
      </section>

      {totalMeasurements > 0 && (
        <div className="tools">
          <button onClick={exportCSV}>📄 CSV ({totalMeasurements})</button>
          <button onClick={() => openSessionReport(store, roomNames)}>🖨️ Informe de sesión</button>
        </div>
      )}

      <p className="hint app360-note">
        Todo se procesa en tu dispositivo — las fotos no se suben a ningún
        servidor. Las mediciones se guardan localmente por nombre de archivo.
      </p>

      <footer className="app360-foot">
        ¿Mediciones de terreno con drone? → <a href="../">Workpulse Drohne 🚁</a>
      </footer>
    </div>
  )
}
