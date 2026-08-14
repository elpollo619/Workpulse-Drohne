import { useEffect, useMemo, useRef, useState } from 'react'
import MapView from './components/MapView.jsx'
import ProcessPanel from './components/ProcessPanel.jsx'
import Dsm3DView from './components/Dsm3DView.jsx'
import ProfileChart from './components/ProfileChart.jsx'
import { loadProjects, saveProjects, newProject } from './lib/storage.js'
import { exportGeoJSON, exportPointsCSV, exportGCP, exportGPX, exportKML } from './lib/export.js'
import { openPrintableReport } from './lib/report.js'
import { fmtDistance, fmtArea, fmtVolume, lineLengthMeters, polygonMetrics } from './lib/measure.js'
import { computeVolume } from './lib/raster.js'
import {
  fetchSwissHeight, fetchSwissProfile, fetchSwissHeightGrid,
  searchSwissLocations, wgs84ToLV95, isInSwitzerland,
} from './lib/swiss.js'

const TOOLS = [
  { id: 'pan', label: '✋ Mover', hint: 'Navegar por el mapa' },
  { id: 'distance', label: '📏 Distancia', hint: 'Clic para trazar; doble clic para terminar' },
  { id: 'area', label: '⬛ Área', hint: 'Traza un polígono cerrado' },
  { id: 'volume', label: '⛰️ Volumen', hint: 'Requiere DSM cargado; traza el contorno del acopio' },
  { id: 'point', label: '📍 Punto GPS', hint: 'Clic para registrar coordenadas' },
]

const BASE_MODES = [
  { id: 'min', label: 'Cota mínima' },
  { id: 'mean', label: 'Cota media' },
  { id: 'perimeter', label: 'Perímetro (interpolado)' },
  { id: 'swiss', label: '🇨🇭 Terreno oficial swissALTI3D' },
]

export default function App() {
  const [projects, setProjects] = useState(() => loadProjects())
  const [currentId, setCurrentId] = useState(() => loadProjects()[0]?.id ?? null)
  const [tool, setTool] = useState('pan')
  const [baseMode, setBaseMode] = useState('min')
  const [status, setStatus] = useState(null)
  const [tab, setTab] = useState('measure') // 'measure' | 'process'
  const [show3D, setShow3D] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const mapRef = useRef(null)
  const searchTimer = useRef(null)

  // Buscador de direcciones/lugares suizos (geo.admin.ch), con debounce.
  function onQueryChange(text) {
    setQuery(text)
    clearTimeout(searchTimer.current)
    if (!text.trim()) return setResults([])
    searchTimer.current = setTimeout(async () => {
      setResults(await searchSwissLocations(text))
    }, 300)
  }

  function goToResult(r) {
    setResults([])
    setQuery(r.label)
    mapRef.current?.flyTo(r.lat, r.lng)
    if (window.innerWidth < 768) setSidebarOpen(false)
  }

  // Garantiza que exista al menos un proyecto.
  useEffect(() => {
    if (projects.length === 0) {
      const p = newProject('Vuelo Berna')
      setProjects([p])
      setCurrentId(p.id)
    }
  }, [])

  useEffect(() => { saveProjects(projects) }, [projects])

  const current = useMemo(
    () => projects.find((p) => p.id === currentId) ?? projects[0],
    [projects, currentId]
  )

  // El mapa refleja siempre el estado guardado del proyecto (recargas,
  // cambios de proyecto, borrados).
  useEffect(() => {
    if (current) mapRef.current?.syncProject(current)
  }, [current])

  function updateCurrent(mutator) {
    setProjects((prev) =>
      prev.map((p) => (p.id === current.id ? mutator({ ...p }) : p))
    )
  }

  function addMeasurement(type, coords, result) {
    updateCurrent((p) => {
      p.measurements = [...p.measurements, { id: crypto.randomUUID(), type, coords, result }]
      return p
    })
  }

  // --- Flujo de dibujo: el mapa entrega la geometría cruda y aquí se procesa ---
  async function handleDraw({ tool: drawTool, coords }) {
    if (drawTool === 'distance') {
      let result = { lengthM: lineLengthMeters(coords) }
      // Dentro de Suiza, se enriquece con el desnivel oficial (swissALTI3D).
      if (coords.every(([lng, lat]) => isInSwitzerland(lng, lat))) {
        setStatus('Consultando perfil de elevación oficial…')
        const profile = await fetchSwissProfile(coords)
        if (profile?.length) {
          let gain = 0, loss = 0
          for (let i = 1; i < profile.length; i++) {
            const dz = (profile[i].alt ?? 0) - (profile[i - 1].alt ?? 0)
            if (dz > 0) gain += dz
            else loss -= dz
          }
          // Perfil decimado (~60 puntos) para el mini-gráfico, sin inflar
          // el almacenamiento local.
          const step = Math.max(1, Math.floor(profile.length / 60))
          const decimated = profile.filter((_, i) => i % step === 0 || i === profile.length - 1)
          result = { ...result, elevGainM: gain, elevLossM: loss, profile: decimated }
        }
        setStatus(null)
      }
      addMeasurement('distance', coords, result)
    } else if (drawTool === 'area') {
      addMeasurement('area', coords, polygonMetrics(coords))
    } else if (drawTool === 'volume') {
      await handleVolume(coords)
    } else if (drawTool === 'point') {
      await handlePoint(coords)
    }
  }

  async function handleVolume(ring) {
    const dsm = mapRef.current?.getDSM()
    if (!dsm) {
      setStatus('⚠️ Carga primero un DSM (pestaña Procesar o archivo GeoTIFF) para medir volumen.')
      return
    }
    let opts = { baseMode }
    if (baseMode === 'swiss') {
      // Terreno oficial como superficie base: volumen = DSM − swissALTI3D.
      setStatus('Muestreando terreno oficial swissALTI3D…')
      const samples = await fetchSwissHeightGrid(ring)
      if (!samples) {
        setStatus('⚠️ swissALTI3D no disponible aquí (¿fuera de Suiza?). Usando cota mínima.')
        opts = { baseMode: 'min' }
      } else {
        opts = { baseMode: 'grid', baseSamples: samples }
      }
    }
    setStatus('Calculando volumen…')
    const result = computeVolume(dsm, ring, opts)
    result.baseModeUsed = opts.baseMode === 'grid' ? 'swissALTI3D' : opts.baseMode
    addMeasurement('volume', ring, result)
    setStatus(null)
  }

  async function handlePoint([lng, lat]) {
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

    updateCurrent((p) => {
      p.points = [...p.points, { id: crypto.randomUUID(), label, lng, lat, elev, note: '' }]
      return p
    })
  }

  // --- Carga de archivos GeoTIFF a mano ---
  async function onOrthoFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      await mapRef.current.loadOrtho(await file.arrayBuffer())
    } catch (err) {
      setStatus('Error al cargar el ortomosaico: ' + err.message)
    }
    e.target.value = ''
  }

  async function onDSMFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      await mapRef.current.loadDSM(await file.arrayBuffer())
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

  function deletePoint(id) {
    updateCurrent((p) => {
      p.points = p.points.filter((pt) => pt.id !== id)
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
      <button
        className="sidebar-toggle"
        title={sidebarOpen ? 'Ocultar panel' : 'Mostrar panel'}
        onClick={() => setSidebarOpen((v) => !v)}
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>
      <aside className={sidebarOpen ? 'sidebar' : 'sidebar hidden'}>
        <header className="brand">
          <h1>Workpulse<span>Drohne</span></h1>
          <p>Medición fotogramétrica · Berna 🇨🇭</p>
        </header>

        <section className="block search-block">
          <input
            type="text"
            placeholder="🔍 Buscar dirección o lugar en Suiza…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          {results.length > 0 && (
            <ul className="search-results">
              {results.map((r, i) => (
                <li key={i} onClick={() => goToResult(r)}>{r.label}</li>
              ))}
            </ul>
          )}
        </section>

        <section className="block">
          <label className="block-label">Proyecto</label>
          <div className="row">
            <select value={current.id} onChange={(e) => setCurrentId(e.target.value)}>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <button onClick={createProject} title="Nuevo proyecto">＋</button>
          </div>
        </section>

        <nav className="tabs">
          <button className={tab === 'measure' ? 'active' : ''} onClick={() => setTab('measure')}>📐 Medir</button>
          <button className={tab === 'process' ? 'active' : ''} onClick={() => setTab('process')}>⚙️ Procesar</button>
        </nav>

        {tab === 'process' && (
          <section className="block">
            <label className="block-label">Fotos del vuelo → orto + DSM</label>
            <ProcessPanel
              projectName={current.name}
              onLoadOrtho={(buf) => mapRef.current.loadOrtho(buf)}
              onLoadDSM={(buf) => mapRef.current.loadDSM(buf)}
              onStatus={setStatus}
            />
            <label className="block-label">O carga GeoTIFF a mano</label>
            <label className="filebtn">
              🗺️ Ortomosaico (GeoTIFF)
              <input type="file" accept=".tif,.tiff" onChange={onOrthoFile} hidden />
            </label>
            <label className="filebtn">
              ⛰️ DSM (GeoTIFF)
              <input type="file" accept=".tif,.tiff" onChange={onDSMFile} hidden />
            </label>
            <div className="row small">
              <span>Opacidad orto</span>
              <input
                type="range" min="0" max="1" step="0.05" defaultValue="1"
                onChange={(e) => mapRef.current?.setOrthoOpacity(parseFloat(e.target.value))}
              />
            </div>
            <button
              onClick={() => {
                if (mapRef.current?.getDSM()) setShow3D(true)
                else setStatus('⚠️ Carga primero un DSM para ver el terreno en 3D.')
              }}
            >
              🧊 Vista 3D del terreno
            </button>
          </section>
        )}

        {tab === 'measure' && (
          <>
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
                  <span>Base</span>
                  <select value={baseMode} onChange={(e) => setBaseMode(e.target.value)}>
                    {BASE_MODES.map((b) => (
                      <option key={b.id} value={b.id}>{b.label}</option>
                    ))}
                  </select>
                </div>
              )}
              <p className="hint">{TOOLS.find((t) => t.id === tool)?.hint}</p>
            </section>

            <section className="block grow">
              <label className="block-label">Mediciones ({current.measurements.length})</label>
              <ul className="list">
                {current.measurements.map((m) => (
                  <li key={m.id} className={m.type === 'distance' && m.result.profile ? 'with-chart' : ''}>
                    <div className="mitem">
                      <span className="mrow">
                        {m.type === 'distance' && `📏 ${fmtDistance(m.result.lengthM)}${
                          m.result.elevGainM != null
                            ? ` · ↗${m.result.elevGainM.toFixed(0)}m ↘${m.result.elevLossM.toFixed(0)}m`
                            : ''
                        }`}
                        {m.type === 'area' && `⬛ ${fmtArea(m.result.areaM2)}`}
                        {m.type === 'volume' && `⛰️ ${fmtVolume(m.result.fillM3)}${
                          m.result.baseModeUsed === 'swissALTI3D' ? ' 🇨🇭' : ''
                        }`}
                      </span>
                      {m.type === 'distance' && m.result.profile && (
                        <ProfileChart profile={m.result.profile} />
                      )}
                    </div>
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
                      <button className="del" onClick={() => deletePoint(p.id)}>✕</button>
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
                {current.gcps.length === 0 && (
                  <li className="muted">Sin GCP. Necesarios para precisión topográfica.</li>
                )}
              </ul>
            </section>

            <section className="block export">
              <label className="block-label">Exportar</label>
              <div className="tools">
                <button onClick={() => exportGeoJSON(current)}>GeoJSON</button>
                <button onClick={() => exportGPX(current)}>GPX</button>
                <button onClick={() => exportKML(current)}>KML</button>
                <button onClick={() => exportPointsCSV(current)}>CSV puntos</button>
                <button onClick={() => exportGCP(current)}>Lista GCP</button>
                <button onClick={() => openPrintableReport(current) || setStatus('El navegador bloqueó la ventana del informe.')}>
                  🖨️ Informe
                </button>
              </div>
            </section>
          </>
        )}
      </aside>

      <main className="stage">
        <MapView ref={mapRef} tool={tool} onDraw={handleDraw} onStatus={setStatus} />
        {status && <div className="status">{status}</div>}
        {show3D && (
          <Dsm3DView georaster={mapRef.current.getDSM()} onClose={() => setShow3D(false)} />
        )}
      </main>
    </div>
  )
}
