import { useEffect, useState } from 'react'
import Pano360View from '../src/components/Pano360View.jsx'
import FloorPlan from './FloorPlan.jsx'

const STORE_KEY = 'workpulse360.measurements.v1'

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) ?? {}
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
  const [store, setStore] = useState(loadStore) // { [photoName]: measurements[] }
  const [showPlan, setShowPlan] = useState(false)

  // Persistencia de mediciones por nombre de foto.
  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(store))
  }, [store])

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
          onOpenPlan={() => setShowPlan(true)}
          onClose={() => setActiveName(null)}
          extraControls={
            photos.length > 1 ? (
              <select
                value={activeName}
                onChange={(e) => setActiveName(e.target.value)}
                title="Cambiar de foto/habitación"
              >
                {photos.map((p) => (
                  <option key={p.name} value={p.name}>
                    🖼️ {p.name} ({(store[p.name] ?? []).length})
                  </option>
                ))}
              </select>
            ) : null
          }
        />
        {showPlan && (
          <FloorPlan
            measurements={measurements}
            photoName={active.name}
            onClose={() => setShowPlan(false)}
          />
        )}
      </div>
    )
  }

  const totalMeasurements = Object.values(store).reduce((s, ms) => s + ms.length, 0)

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
          <b>Sesión actual</b>
          <ul className="list">
            {photos.map((p) => (
              <li key={p.name} onClick={() => setActiveName(p.name)} style={{ cursor: 'pointer' }}>
                <span className="mrow">🖼️ {p.name} · {(store[p.name] ?? []).length} mediciones</span>
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
        <button onClick={exportCSV}>📄 Exportar todas las mediciones (CSV) — {totalMeasurements}</button>
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
