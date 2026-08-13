import { useEffect, useMemo, useRef, useState } from 'react'
import MapView from './components/MapView.jsx'
import { loadProjects, saveProjects, newProject } from './lib/storage.js'
import { exportGeoJSON, exportPointsCSV, exportGCP } from './lib/export.js'
import { fmtDistance, fmtArea, fmtVolume } from './lib/measure.js'
import { fetchSwissHeight, fetchSwissProfile, wgs84ToLV95, isInSwitzerland } from './lib/swiss.js'

const TOOLS = [
  { id: 'pan', label: '✋ Mover', hint: 'Navegar por el mapa' },
  { id: 'distance', label: '📏 Distancia', hint: 'Clic para trazar; doble clic para terminar' },
  { id: 'area', label: '⬛ Área', hint: 'Traza un polígono cerrado' },
  { id: 'volume', label: '⛰️ Volumen', hint: 'Requiere DSM cargado; traza el contorno del acopio' },
  { id: 'point', label: '📍 Punto GPS', hint: 'Clic para registrar coordenadas' },
]

export default function App() {
  const [projects, setProjects] = useState(() => loadProjects())
  const [currentId, setCurrentId] = useState(() => loadProjects()[0]?.id ?? null)
  const [tool, setTool] = useState('pan')
  const [baseMode, setBaseMode] = useState('min')
  const [status, setStatus] = useState(null)
  const mapRef = useRef(null)

  // Garantiza que exista al menos un proyecto.
  useEffect(() => {
    if (projects.length === 0) {
      const p = newProject('Vuelo de ejemplo')
      setProjects([p])
      setCurrentId(p.id)
    }
  }, [])

  useEffect(() => { saveProjects(projects) }, [projects])

  const current = useMemo(
    () => projects.find((p) => p.id === currentId) ?? projects[0],
    [projects, currentId]
  )

  function updateCurrent(mutator) {
    setProjects((prev) =>
      prev.map((p) => (p.id === current.id ? mutator({ ...p }) : p))
    )
  }

  // --- Callbacks del mapa ---
  async function handleMeasurement({ type, coords, result }) {
    // Para distancias dentro de Suiza, se enriquece con el perfil de elevación
    // oficial (swissALTI3D): desnivel acumulado de subida y bajada.
    if (type === 'distance' && coords.every(([lng, lat]) => isInSwitzerland(lng, lat))) {
      setStatus('Consultando perfil de elevación oficial…')
      const profile = await fetchSwissProfile(coords)
      if (profile?.length) {
        let gain = 0, loss = 0
        for (let i = 1; i < profile.length; i++) {
          const dz = (profile[i].alt ?? 0) - (profile[i - 1].alt ?? 0)
          if (dz > 0) gain += dz
          else loss -= dz
        }
        result = { ...result, elevGainM: gain, elevLossM: loss }
      }
      setStatus(null)
    }
    updateCurrent((p) => {
      p.measurements = [
        ...p.measurements,
        { id: crypto.randomUUID(), type, coords, result },
      ]
      return p
    })
  }

  function handleVolume({ ring, result }) {
    updateCurrent((p) => {
      p.measurements = [
        ...p.measurements,
        { id: crypto.randomUUID(), type: 'volume', coords: ring, result },
      ]
      return p
    })
  }

  async function handlePoint({ lng, lat }) {
    const label = prompt('Nombre del punto:', `P${(current.points?.length ?? 0) + 1}`)
    if (label === null) return

    // Dentro de Suiza, la elevación se obtiene automáticamente del servicio
    // oficial swissALTI3D (~0.5 m); fuera, se pide a mano.
    let elev = null
    if (isInSwitzerland(lng, lat)) {
      setStatus('Consultando elevación oficial (swissALTI3D)…')
      elev = await fetchSwissHeight(lng, lat)
      setStatus(elev != null ? `Elevación oficial: ${elev.toFixed(2)} m s.n.m.` : null)
    } else {
      const elevStr = prompt('Elevación (m, opcional):', '')
      elev = elevStr ? parseFloat(elevStr) : null
    }

    const point = { id: crypto.randomUUID(), label, lng, lat, elev, note: '' }
    updateCurrent((p) => {
      p.points = [...p.points, point]
      return p
    })
    mapRef.current?.addPointMarker(point)
  }

  // --- Carga de archivos ---
  async function onOrthoFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const buf = await file.arrayBuffer()
    try {
      await mapRef.current.loadOrtho(buf)
    } catch (err) {
      setStatus('Error al cargar el ortomosaico: ' + err.message)
    }
    e.target.value = ''
  }

  async function onDSMFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const buf = await file.arrayBuffer()
    try {
      await mapRef.current.loadDSM(buf)
    } catch (err) {
      setStatus('Error al cargar el DSM: ' + err.message)
    }
    e.target.value = ''
  }

  function addGCP() {
    const name = prompt('Nombre del GCP (p.ej. GCP1):', `GCP${(current.gcps?.length ?? 0) + 1}`)
    if (!name) return
    const lat = parseFloat(prompt('Latitud (grados decimales):', ''))
    const lng = parseFloat(prompt('Longitud (grados decimales):', ''))
    const elev = parseFloat(prompt('Elevación (m):', '') || '0')
    if (isNaN(lat) || isNaN(lng)) return setStatus('Coordenadas inválidas.')
    updateCurrent((p) => {
      p.gcps = [...p.gcps, { id: crypto.randomUUID(), name, lat, lng, elev, note: '' }]
      return p
    })
  }

  function deleteMeasurement(id) {
    updateCurrent((p) => {
      p.measurements = p.measurements.filter((m) => m.id !== id)
      return p
    })
  }

  function createProject() {
    const name = prompt('Nombre del proyecto:', `Vuelo ${projects.length + 1}`)
    if (!name) return
    const p = newProject(name)
    setProjects((prev) => [...prev, p])
    setCurrentId(p.id)
  }

  if (!current) return null

  return (
    <div className="app">
      <aside className="sidebar">
        <header className="brand">
          <h1>Workpulse<span>Drohne</span></h1>
          <p>Medición fotogramétrica</p>
        </header>

        <section className="block">
          <label className="block-label">Proyecto</label>
          <div className="row">
            <select
              value={current.id}
              onChange={(e) => setCurrentId(e.target.value)}
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <button onClick={createProject} title="Nuevo proyecto">＋</button>
          </div>
        </section>

        <section className="block">
          <label className="block-label">Datos del vuelo</label>
          <label className="filebtn">
            🗺️ Cargar ortomosaico (GeoTIFF)
            <input type="file" accept=".tif,.tiff" onChange={onOrthoFile} hidden />
          </label>
          <label className="filebtn">
            ⛰️ Cargar DSM (GeoTIFF)
            <input type="file" accept=".tif,.tiff" onChange={onDSMFile} hidden />
          </label>
          <div className="row small">
            <span>Opacidad orto</span>
            <input
              type="range" min="0" max="1" step="0.05" defaultValue="1"
              onChange={(e) => mapRef.current?.setOrthoOpacity(parseFloat(e.target.value))}
            />
          </div>
        </section>

        <section className="block">
          <label className="block-label">Herramienta</label>
          <div className="tools">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                className={tool === t.id ? 'tool active' : 'tool'}
                title={t.hint}
                onClick={() => setTool(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          {tool === 'volume' && (
            <div className="row small">
              <span>Plano base</span>
              <select value={baseMode} onChange={(e) => setBaseMode(e.target.value)}>
                <option value="min">Cota mínima</option>
                <option value="mean">Cota media</option>
              </select>
            </div>
          )}
          <p className="hint">{TOOLS.find((t) => t.id === tool)?.hint}</p>
        </section>

        <section className="block grow">
          <label className="block-label">
            Mediciones ({current.measurements.length})
          </label>
          <ul className="list">
            {current.measurements.map((m) => (
              <li key={m.id}>
                <span className="mrow">
                  {m.type === 'distance' && `📏 ${fmtDistance(m.result.lengthM)}${
                    m.result.elevGainM != null
                      ? ` · ↗${m.result.elevGainM.toFixed(0)}m ↘${m.result.elevLossM.toFixed(0)}m`
                      : ''
                  }`}
                  {m.type === 'area' && `⬛ ${fmtArea(m.result.areaM2)}`}
                  {m.type === 'volume' && `⛰️ ${fmtVolume(m.result.volumeM3)}`}
                </span>
                <button className="del" onClick={() => deleteMeasurement(m.id)}>✕</button>
              </li>
            ))}
            {current.measurements.length === 0 && (
              <li className="muted">Sin mediciones todavía.</li>
            )}
          </ul>

          <label className="block-label">Puntos GPS ({current.points.length})</label>
          <ul className="list">
            {current.points.map((p) => {
              const lv95 = isInSwitzerland(p.lng, p.lat) ? wgs84ToLV95(p.lng, p.lat) : null
              return (
                <li key={p.id}>
                  <span className="mrow" title={`${p.lat.toFixed(6)}, ${p.lng.toFixed(6)}`}>
                    📍 {p.label} — {lv95
                      ? `LV95 ${lv95.e.toFixed(1)}/${lv95.n.toFixed(1)}`
                      : `${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}`}
                    {p.elev != null && ` · ${p.elev.toFixed(1)} m`}
                  </span>
                </li>
              )
            })}
            {current.points.length === 0 && <li className="muted">Sin puntos todavía.</li>}
          </ul>

          <label className="block-label">
            Puntos de control GCP ({current.gcps.length})
            <button className="mini" onClick={addGCP}>+ añadir</button>
          </label>
          <ul className="list">
            {current.gcps.map((g) => (
              <li key={g.id}>
                <span className="mrow">🎯 {g.name} — {g.lat.toFixed(5)}, {g.lng.toFixed(5)}, {g.elev} m</span>
              </li>
            ))}
            {current.gcps.length === 0 && <li className="muted">Sin GCP. Necesarios para precisión topográfica.</li>}
          </ul>
        </section>

        <section className="block export">
          <label className="block-label">Exportar</label>
          <div className="tools">
            <button onClick={() => exportGeoJSON(current)}>GeoJSON</button>
            <button onClick={() => exportPointsCSV(current)}>CSV puntos</button>
            <button onClick={() => exportGCP(current)}>Lista GCP</button>
          </div>
        </section>
      </aside>

      <main className="stage">
        <MapView
          ref={mapRef}
          tool={tool}
          baseMode={baseMode}
          onMeasurement={handleMeasurement}
          onPoint={handlePoint}
          onVolume={handleVolume}
          onStatus={setStatus}
        />
        {status && <div className="status">{status}</div>}
      </main>
    </div>
  )
}
