import { useEffect, useMemo, useRef, useState } from 'react'
import MapView from './components/MapView.jsx'
import Manual from './components/Manual.jsx'
import GuidedTour from './components/GuidedTour.jsx'
import ProcessPanel from './components/ProcessPanel.jsx'
import Dsm3DView from './components/Dsm3DView.jsx'
import GcpEditor from './components/GcpEditor.jsx'
import ProfileChart from './components/ProfileChart.jsx'
import { loadProjects, saveProjects, newProject } from './lib/storage.js'
import { exportGeoJSON, exportPointsCSV, exportGCP, exportGPX, exportKML } from './lib/export.js'
import { openPrintableReport } from './lib/report.js'
import { fmtDistance, fmtArea, fmtVolume, lineLengthMeters, polygonMetrics } from './lib/measure.js'
import { computeVolume, computeVolumeDiff } from './lib/raster.js'
import { planGrid, downloadMissionKMZ } from './lib/mission.js'
import { fetchFlightConditions } from './lib/weather.js'
import { fetchNearestLive } from './lib/meteoswiss.js'
import { fetchSwissTerrainDSM } from './lib/terrain.js'
import {
  fetchSwissHeight, fetchSwissProfile, fetchSwissHeightGrid, fetchSolarRoof,
  fetchTerrainIntel, searchSwissLocations, wgs84ToLV95, isInSwitzerland,
} from './lib/swiss.js'
import { parsePhotoMeta } from './lib/exif.js'
import { MINI4PRO } from './lib/mission.js'

const TOOLS = [
  { id: 'pan', label: '✋ Mover', hint: 'Navegar por el mapa' },
  { id: 'distance', label: '📏 Distancia', hint: 'Clic para trazar; doble clic para terminar' },
  { id: 'area', label: '⬛ Área', hint: 'Traza un polígono cerrado' },
  { id: 'volume', label: '⛰️ Volumen', hint: 'Requiere DSM cargado; traza el contorno del acopio' },
  { id: 'point', label: '📍 Punto GPS', hint: 'Clic para registrar coordenadas' },
  { id: 'plan', label: '🛫 Plan de vuelo', hint: 'Dibuja la zona a mapear; se genera la rejilla y la misión KMZ' },
  { id: 'solar', label: '☀️ Techo solar', hint: 'Toca un techo: informe solar oficial (sonnendach.ch) al instante' },
  { id: 'intel', label: '🧠 Radiografía', hint: 'Toca cualquier punto: dossier oficial completo del sitio en un segundo' },
]

const BASE_MODES = [
  { id: 'min', label: 'Cota mínima' },
  { id: 'mean', label: 'Cota media' },
  { id: 'perimeter', label: 'Perímetro (interpolado)' },
  { id: 'swiss', label: '🇨🇭 Terreno oficial swissALTI3D' },
  { id: 'prev', label: '⏮️ Vuelo anterior (diferencia)' },
]

export default function App() {
  const [projects, setProjects] = useState(() => loadProjects())
  const [currentId, setCurrentId] = useState(() => loadProjects()[0]?.id ?? null)
  const [tool, setTool] = useState('pan')
  const [baseMode, setBaseMode] = useState('min')
  const [status, setStatus] = useState(null)
  const [tab, setTab] = useState('measure') // 'measure' | 'process'
  const [show3D, setShow3D] = useState(false)
  const [showGcpEditor, setShowGcpEditor] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [plan, setPlan] = useState(null) // { ring, params, result }
  const [weather, setWeather] = useState(null) // condiciones de vuelo
  const [weatherBusy, setWeatherBusy] = useState(false)
  const [intel, setIntel] = useState(null) // radiografía del terreno
  const [showManual, setShowManual] = useState(false)
  const [showTour, setShowTour] = useState(false)

  // Primera visita: se abre el manual solo, una única vez.
  useEffect(() => {
    if (!localStorage.getItem('workpulse.manual.seen')) {
      localStorage.setItem('workpulse.manual.seen', '1')
      setShowManual(true)
    }
  }, [])

  // "Probar ahora" del manual: cierra y deja la herramienta real activada.
  function onManualAction(action) {
    setShowManual(false)
    if (action.tool) {
      setTab('measure')
      setTool(action.tool)
      setStatus(`▶️ Herramienta activada. ${TOOLS.find((t) => t.id === action.tool)?.hint ?? ''}`)
    } else if (action.tab) {
      setTab(action.tab)
      setSidebarOpen(true)
    } else if (action.weather) {
      setTab('measure')
      checkWeather()
    } else if (action.gcp) {
      setShowGcpEditor(true)
    } else if (action.href) {
      window.open(action.href, '_blank')
    }
  }

  async function checkWeather() {
    const c = mapRef.current?.getCenter()
    if (!c) return
    setWeatherBusy(true)
    setWeather(null)
    try {
      // Pronóstico (Open-Meteo) + medición real de la estación SwissMetNet
      // más cercana, en paralelo. La estación puede fallar sin romper nada.
      const [forecast, live] = await Promise.all([
        fetchFlightConditions(c.lat, c.lng),
        fetchNearestLive(c.lng, c.lat).catch(() => null),
      ])
      setWeather({ ...forecast, live })
    } catch (err) {
      setStatus(`No se pudo consultar la meteo: ${err.message}`)
    } finally {
      setWeatherBusy(false)
    }
  }

  // 🏔️ Terreno oficial swissALTI3D de la vista actual, como DSM medible
  // ('dsm') o como base de comparación contra el vuelo ('prev').
  async function loadOfficialTerrain(target) {
    const b = mapRef.current?.getBounds()
    if (!b) return
    try {
      const g = await fetchSwissTerrainDSM(b, setStatus)
      if (target === 'prev') {
        mapRef.current.setDSMPrevObject(g)
        setStatus(
          `🏔️ Terreno oficial cargado como base (${g.tileCount} teja(s), 2 m/px). ` +
          'Usa el modo de volumen "Vuelo anterior" o el 🔥 mapa de calor para ver qué cambió respecto al terreno oficial.'
        )
      } else {
        mapRef.current.setDSMObject(g)
        setStatus(
          `🏔️ Terreno oficial cargado (${g.tileCount} teja(s), 2 m/px, ${g.width}×${g.height} celdas). ` +
          'Ya puedes medir volúmenes y abrir la vista 3D — sin necesidad de vuelo.'
        )
      }
    } catch (err) {
      setStatus(`⚠️ ${err.message}`)
    }
  }
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

  const isDrawingTool = ['distance', 'area', 'volume', 'plan'].includes(tool)

  // Atajos de teclado durante el dibujo: Esc reinicia, Retroceso deshace punto,
  // Enter termina.
  useEffect(() => {
    if (!isDrawingTool) return
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'Escape') mapRef.current?.cancelDraw(tool)
      else if (e.key === 'Backspace') {
        e.preventDefault()
        mapRef.current?.undoVertex()
      } else if (e.key === 'Enter') mapRef.current?.finishDraw()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tool, isDrawingTool])

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
    } else if (drawTool === 'plan') {
      updatePlan(coords, plan?.params)
    } else if (drawTool === 'solar') {
      await handleSolar(coords)
    } else if (drawTool === 'intel') {
      await handleIntel(coords)
    }
  }

  // 🧠 Radiografía del terreno: todas las fuentes oficiales + meteo, a la vez.
  async function handleIntel([lng, lat]) {
    setStatus('🧠 Cruzando todas las fuentes oficiales…')
    try {
      const [terrain, wx, live] = await Promise.all([
        fetchTerrainIntel(lng, lat),
        fetchFlightConditions(lat, lng).catch(() => null),
        fetchNearestLive(lng, lat).catch(() => null),
      ])
      setIntel({ ...terrain, weather: wx, live })
      setStatus(null)
    } catch (err) {
      setStatus(`No se pudo completar la radiografía: ${err.message}`)
    }
  }

  function printIntel() {
    if (!intel) return
    const esc = (s) => String(s ?? '—')
    const w = intel.weather
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Radiografía del terreno</title>
<style>body{font-family:system-ui,sans-serif;color:#111;margin:32px;max-width:640px}h1{font-size:20px;margin:0 0 4px}
.sub{color:#666;font-size:12px;margin-bottom:18px}h2{font-size:14px;border-bottom:1px solid #ccc;padding-bottom:3px;margin-top:18px}
p{font-size:13px;margin:6px 0}.warn{color:#b45309}.no{color:#b91c1c}footer{margin-top:28px;color:#999;font-size:10px}</style></head><body>
<h1>🧠 Radiografía del terreno — Workpulse Drohne</h1>
<div class="sub">Generado: ${new Date().toLocaleString('es-CH')} · WGS84 ${intel.lat.toFixed(6)}, ${intel.lng.toFixed(6)} · LV95 ${intel.e.toFixed(1)} / ${intel.n.toFixed(1)}</div>
<h2>Terreno</h2><p>Elevación oficial (swissALTI3D): <b>${intel.heightM != null ? intel.heightM.toFixed(1) + ' m s.n.m.' : '—'}</b></p>
<h2>Drones (BAZL)</h2>${intel.droneZones.length
      ? intel.droneZones.map((z) => `<p class="no">🚫 <b>${esc(z.name)}</b>${z.restriction ? ' — ' + esc(z.restriction) : ''}</p>`).join('')
      : '<p>✅ Sin zonas de restricción registradas en este punto.</p>'}
<h2>Fauna (BAFU)</h2>${intel.wildZones?.length
      ? intel.wildZones.map((z) => `<p class="warn">🦌 <b>${esc(z.name)}</b>${z.period ? ' — período de protección: ' + esc(z.period) : ''}${z.binding ? ' (legalmente vinculante)' : ''}</p>`).join('')
      : '<p>✅ Fuera de zonas de tranquilidad para la fauna.</p>'}
<h2>Paisaje protegido (BLN)</h2><p>${intel.bln
      ? `🏞️ <b>${esc(intel.bln.name)}</b>${intel.bln.objNr ? ` (objeto n.º ${intel.bln.objNr})` : ''} — paisaje de importancia nacional: vuela con especial consideración.`
      : 'Fuera del inventario federal de paisajes (BLN).'}</p>
<h2>Ordenación del territorio (ARE)</h2><p>${intel.bauzone
      ? `Zona de construcción: <b>${esc(intel.bauzone.tipo)}</b> · ${esc(intel.bauzone.municipio)} (${esc(intel.bauzone.canton)})`
      : 'Fuera de zona de construcción registrada.'}</p>
<h2>Solar (BFE)</h2><p>${intel.solar
      ? `Techo: aptitud <b>${esc(intel.solar.klasseText)}</b> · ${intel.solar.areaM2?.toFixed(0)} m² · ${Math.round(intel.solar.yearlyKWh ?? 0).toLocaleString('es-CH')} kWh/año estimados`
      : 'Sin techo en el catastro solar en este punto.'}</p>
<h2>Meteo ahora</h2><p>${w
      ? `${w.verdict.level === 'ok' ? '✅' : w.verdict.level === 'warn' ? '⚠️' : '❌'} viento ${w.windMS.toFixed(1)} m/s · rachas ${w.gustMS.toFixed(1)} · ${w.tempC.toFixed(0)} °C · sol ${w.sunElev.toFixed(0)}°${w.windows.length ? ` · mejores horas: ${w.windows.join(', ')}` : ''}`
      : 'No disponible.'}</p>${intel.live
      ? `<p>📡 Medido por la estación <b>${esc(intel.live.station.name)}</b> (${intel.live.distanceKM.toFixed(0)} km, hace ${intel.live.data.ageMin ?? '?'} min): viento ${intel.live.data.windMS.toFixed(1)} m/s${intel.live.data.gustMS != null ? ` · rachas ${intel.live.data.gustMS.toFixed(1)} m/s` : ''}${intel.live.data.tempC != null ? ` · ${intel.live.data.tempC.toFixed(1)} °C` : ''}</p>`
      : ''}
<footer>Fuentes oficiales: swisstopo (swissALTI3D), BAZL/OFAC, ARE, BFE/sonnendach.ch, BAFU/OFEV (fauna y BLN), MeteoSuiza (SwissMetNet), Open-Meteo. Informe orientativo; verifica la normativa vigente antes de volar.</footer>
<script>window.onload=()=>setTimeout(()=>window.print(),300)</script></body></html>`
    const win = window.open('', '_blank')
    if (win) {
      win.document.write(html)
      win.document.close()
    }
  }

  // Informe solar oficial del techo tocado (BFE/sonnendach.ch).
  async function handleSolar([lng, lat]) {
    setStatus('Consultando el catastro solar oficial…')
    const roof = await fetchSolarRoof(lng, lat)
    if (!roof) {
      setStatus('⚠️ Ahí no hay ningún techo en el catastro solar (¿tocaste un edificio en Suiza?).')
      return
    }
    const html =
      `<b>☀️ Informe solar oficial</b><br>` +
      `Aptitud: <b>${roof.klasseText}</b> (${roof.klasse}/5)<br>` +
      (roof.areaM2 != null ? `Superficie: ${roof.areaM2.toFixed(0)} m²<br>` : '') +
      (roof.tiltDeg != null ? `Inclinación: ${roof.tiltDeg}°· ` : '') +
      (roof.orientationDeg != null ? `Orientación: ${roof.orientationDeg}°<br>` : '') +
      (roof.radiationKWhM2 != null ? `Radiación: ${roof.radiationKWhM2.toFixed(0)} kWh/m²·año<br>` : '') +
      (roof.yearlyKWh != null ? `<b>Producción estimada: ${Math.round(roof.yearlyKWh).toLocaleString('es-CH')} kWh/año</b><br>` : '') +
      `<small>Fuente: BFE / sonnendach.ch</small>`
    mapRef.current?.drawSolarRoof(roof.rings, html)
    setStatus(null)
  }

  // Verificación de cobertura: lee el GPS EXIF de las fotos del vuelo y las
  // pinta sobre el mapa con su huella aproximada.
  async function onCoverageFiles(e) {
    const files = [...(e.target.files ?? [])]
    if (!files.length) return
    setStatus(`Leyendo ${files.length} fotos…`)
    const metas = []
    let noGPS = 0
    for (const f of files) {
      const meta = parsePhotoMeta(await f.arrayBuffer())
      if (meta) metas.push({ ...meta, name: f.name })
      else noGPS++
    }
    if (!metas.length) {
      setStatus('⚠️ Ninguna foto tiene GPS. ¿Son originales del drone (sin editar)?')
      e.target.value = ''
      return
    }
    const footprintRadiusFor = (m) => {
      const alt = m.altAGL ?? 70
      return ((MINI4PRO.sensorWidthMM / 1000) * alt / (MINI4PRO.focalMM / 1000)) / 2
    }
    mapRef.current?.showFlightPhotos(metas, footprintRadiusFor)
    const alts = metas.map((m) => m.altAGL).filter((a) => a != null)
    const avgAlt = alts.length ? alts.reduce((s, a) => s + a, 0) / alts.length : null
    setStatus(
      `📷 ${metas.length} fotos con GPS${noGPS ? ` (${noGPS} sin GPS)` : ''}` +
      (avgAlt != null ? ` · altura media ${avgAlt.toFixed(0)} m` : '') +
      ' · revisa que las huellas celestes cubran toda la zona sin huecos.'
    )
    e.target.value = ''
  }

  // Recalcula la rejilla del plan de vuelo y la dibuja en el mapa.
  function updatePlan(ring, params) {
    const p = { altitude: 70, frontOverlap: 0.8, sideOverlap: 0.7, speed: 5, ...params }
    const result = planGrid(ring, p)
    setPlan({ ring, params: p, result })
    mapRef.current?.drawFlightPlan(ring, result.waypoints)
  }

  function clearPlan() {
    setPlan(null)
    mapRef.current?.clearFlightPlan()
  }

  async function handleVolume(ring) {
    const dsm = mapRef.current?.getDSM()
    if (!dsm) {
      setStatus('⚠️ Carga primero un DSM (pestaña Procesar o archivo GeoTIFF) para medir volumen.')
      return
    }
    // Comparación entre vuelos: diferencia DSM actual − DSM anterior.
    if (baseMode === 'prev') {
      const dsmPrev = mapRef.current?.getDSMPrev()
      if (!dsmPrev) {
        setStatus('⚠️ Carga el DSM del vuelo anterior (pestaña Procesar) para comparar.')
        return
      }
      setStatus('Comparando vuelos…')
      const result = computeVolumeDiff(dsm, dsmPrev, ring)
      result.baseModeUsed = 'diff'
      if (result.coverage < 0.9) {
        setStatus(`⚠️ Solo el ${(result.coverage * 100).toFixed(0)}% de la zona existe en ambos vuelos — resultado parcial.`)
      } else {
        setStatus(null)
      }
      addMeasurement('volume', ring, result)
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

  function backupProject() {
    const blob = new Blob([JSON.stringify(current, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${current.name.replace(/[^a-zA-Z0-9-_]+/g, '-')}-backup.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function restoreProject(e) {
    const f = e.target.files?.[0]
    if (!f) return
    try {
      const data = JSON.parse(await f.text())
      if (!data.measurements || !data.points) throw new Error('formato no reconocido')
      const p = { ...newProject(data.name ? `${data.name} (restaurado)` : 'Restaurado'), ...data, id: crypto.randomUUID() }
      setProjects((prev) => [...prev, p])
      setCurrentId(p.id)
      setStatus(`Proyecto "${p.name}" restaurado con ${p.measurements.length} mediciones.`)
    } catch (err) {
      setStatus(`No se pudo restaurar: ${err.message}`)
    }
    e.target.value = ''
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
          <div className="help-row">
            <button className="mini" data-tour="manual" onClick={() => setShowManual(true)}>
              📖 Manual
            </button>
            <button className="mini" onClick={() => { setSidebarOpen(true); setTab('measure'); setShowTour(true) }}>
              🎓 Tour guiado
            </button>
          </div>
        </header>

        <section className="block search-block" data-tour="search">
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

        <section className="block" data-tour="project">
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

        <nav className="tabs" data-tour="tabs">
          <button className={tab === 'measure' ? 'active' : ''} onClick={() => setTab('measure')}>📐 Medir</button>
          <button className={tab === 'process' ? 'active' : ''} onClick={() => setTab('process')}>⚙️ Procesar</button>
        </nav>

        {tab === 'process' && (
          <section className="block">
            <label className="block-label">Verificación en campo</label>
            <label className="filebtn">
              📷 Verificar cobertura del vuelo
              <input type="file" accept="image/jpeg" multiple hidden onChange={onCoverageFiles} />
            </label>
            <p className="hint">
              Selecciona las fotos recién sacadas: el mapa muestra dónde disparó
              el drone y su huella — comprueba que no hay huecos <b>antes de
              irte del sitio</b>.
            </p>

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
            <label className="filebtn">
              ⏮️ DSM del vuelo anterior (comparar)
              <input
                type="file" accept=".tif,.tiff" hidden
                onChange={async (e) => {
                  const f = e.target.files?.[0]
                  if (!f) return
                  try {
                    await mapRef.current.loadDSMPrev(await f.arrayBuffer())
                  } catch (err) {
                    setStatus('Error al cargar el DSM anterior: ' + err.message)
                  }
                  e.target.value = ''
                }}
              />
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
            <button
              onClick={() => {
                const res = mapRef.current?.toggleDiffHeatmap()
                if (res === undefined) {
                  setStatus('⚠️ Carga el DSM actual y el del vuelo anterior para el mapa de calor.')
                } else if (res === null) {
                  setStatus('Mapa de calor retirado.')
                } else {
                  setStatus(`🔥 Cambios entre vuelos: de ${res.minDz.toFixed(1)} m (azul, retirado) a +${res.maxDz.toFixed(1)} m (rojo, añadido).`)
                }
              }}
            >
              🔥 Mapa de calor de cambios
            </button>

            <label className="block-label">🇨🇭 Terreno oficial — sin volar</label>
            <button onClick={() => loadOfficialTerrain('dsm')}>
              🏔️ Cargar terreno oficial (vista actual)
            </button>
            <button onClick={() => loadOfficialTerrain('prev')}>
              🏔️→⏮️ Terreno oficial como base de comparación
            </button>
            <p className="hint">
              swissALTI3D (2 m/px): mide volúmenes, perfiles y 3D en cualquier
              punto de Suiza <b>sin necesidad de vuelo</b>. O cárgalo como base
              y compara tu vuelo contra el terreno oficial (🔥 mapa de calor)
              para ver acopios, edificios o excavaciones nuevas.
            </p>

            <label className="block-label">Interiores / cámara 360°</label>
            <a className="filebtn applink" href="./360/">
              📷 Abrir Workpulse 360 ↗
            </a>
            <p className="hint">
              La medición con cámaras 360° (Insta360) es una app aparte, hecha
              para espacios interiores.
            </p>
          </section>
        )}

        {tab === 'measure' && (
          <>
            <section className="block" data-tour="tools">
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

            <section className="block" data-tour="weather">
              <button onClick={checkWeather} disabled={weatherBusy}>
                🌤️ {weatherBusy ? 'Consultando…' : '¿Puedo volar ahora aquí?'}
              </button>
              {weather && (
                <div className={`weather-card weather-${weather.verdict.level}`}>
                  <div className="weather-head">
                    {weather.verdict.level === 'ok' && '✅ Buenas condiciones'}
                    {weather.verdict.level === 'warn' && '⚠️ Volable con precaución'}
                    {weather.verdict.level === 'no' && '❌ No recomendado'}
                  </div>
                  <div className="weather-data">
                    <span>💨 {weather.windMS.toFixed(1)} m/s</span>
                    <span>💥 rachas {weather.gustMS.toFixed(1)}</span>
                    <span>🌡️ {weather.tempC.toFixed(0)} °C</span>
                    <span>☀️ sol {weather.sunElev.toFixed(0)}°</span>
                  </div>
                  {weather.live && (
                    <p className="hint">
                      📡 <b>Medido ahora</b> en {weather.live.station.name}{' '}
                      ({weather.live.distanceKM.toFixed(0)} km
                      {weather.live.data.ageMin != null && `, hace ${weather.live.data.ageMin} min`}):{' '}
                      💨 {weather.live.data.windMS.toFixed(1)} m/s
                      {weather.live.data.gustMS != null && ` · rachas ${weather.live.data.gustMS.toFixed(1)}`}
                      {weather.live.data.tempC != null && ` · 🌡️ ${weather.live.data.tempC.toFixed(1)} °C`}
                      {weather.live.data.precipMM10 != null && weather.live.data.precipMM10 > 0 &&
                        ` · 🌧️ ${weather.live.data.precipMM10.toFixed(1)} mm/10min`}
                    </p>
                  )}
                  <ul className="weather-reasons">
                    {weather.verdict.reasons.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                  {weather.windows.length > 0 && (
                    <p className="hint">📸 Mejores horas hoy para mapear: {weather.windows.join(', ')}</p>
                  )}
                  <p className="hint">
                    Activa la capa 🚫 (control de capas) para ver las zonas de
                    restricción de drones oficiales (BAZL).
                  </p>
                </div>
              )}
            </section>

            {plan && (
              <section className="block plan-panel">
                <label className="block-label">
                  🛫 Plan de vuelo
                  <button className="mini" onClick={clearPlan}>✕ quitar</button>
                </label>
                <div className="row small">
                  <span>Altura: <b>{plan.params.altitude} m</b></span>
                  <input
                    type="range" min="40" max="120" step="5"
                    value={plan.params.altitude}
                    onChange={(e) => updatePlan(plan.ring, { ...plan.params, altitude: +e.target.value })}
                  />
                </div>
                <div className="row small">
                  <span>Solape frontal: <b>{Math.round(plan.params.frontOverlap * 100)}%</b></span>
                  <input
                    type="range" min="70" max="90" step="5"
                    value={plan.params.frontOverlap * 100}
                    onChange={(e) => updatePlan(plan.ring, { ...plan.params, frontOverlap: +e.target.value / 100 })}
                  />
                </div>
                <div className="row small">
                  <span>Solape lateral: <b>{Math.round(plan.params.sideOverlap * 100)}%</b></span>
                  <input
                    type="range" min="60" max="85" step="5"
                    value={plan.params.sideOverlap * 100}
                    onChange={(e) => updatePlan(plan.ring, { ...plan.params, sideOverlap: +e.target.value / 100 })}
                  />
                </div>
                <div className="row small">
                  <span>Velocidad: <b>{plan.params.speed} m/s</b></span>
                  <input
                    type="range" min="2" max="8" step="1"
                    value={plan.params.speed}
                    onChange={(e) => updatePlan(plan.ring, { ...plan.params, speed: +e.target.value })}
                  />
                </div>
                <div className="plan-stats">
                  <span>📷 {plan.result.photoCount} fotos</span>
                  <span>📏 GSD {plan.result.gsdCM.toFixed(1)} cm/px</span>
                  <span>➰ {plan.result.lines} líneas</span>
                  <span>🛣️ {(plan.result.distanceM / 1000).toFixed(2)} km</span>
                  <span>⏱️ ~{Math.ceil(plan.result.durationMin)} min</span>
                </div>
                {plan.result.tooMany && (
                  <p className="hint">
                    ⚠️ Demasiados waypoints para DJI Fly (~180 máx). Sube la altura
                    o reduce la zona.
                  </p>
                )}
                {plan.result.durationMin > 25 && (
                  <p className="hint">⚠️ Supera una batería (~30 min reales). Divide la zona en dos vuelos.</p>
                )}
                <button
                  disabled={plan.result.tooMany}
                  onClick={() => downloadMissionKMZ(current.name, plan.result.waypoints, plan.params)}
                >
                  💾 Descargar misión KMZ (DJI Fly)
                </button>
                <p className="hint">
                  Instálala en el mando reemplazando el archivo de una misión creada
                  en DJI Fly (guía: <code>docs/PLAN-DE-VUELO.md</code>). Verifica el
                  primer vuelo visualmente.
                </p>
              </section>
            )}

            <section className="block grow" data-tour="lists">
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
                        {m.type === 'volume' && (m.result.baseModeUsed === 'diff'
                          ? `⏮️ Δ ${fmtVolume(m.result.volumeM3)} (＋${fmtVolume(m.result.fillM3)} −${fmtVolume(m.result.cutM3)})`
                          : `⛰️ ${fmtVolume(m.result.fillM3)}${
                              m.result.baseModeUsed === 'swissALTI3D' ? ' 🇨🇭' : ''
                            }`)}
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
                <span>
                  <button className="mini" onClick={addGCP}>+ añadir</button>{' '}
                  <button className="mini" onClick={() => setShowGcpEditor(true)}>🎯 editor</button>
                </span>
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

            <section className="block export" data-tour="export">
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
                <button onClick={backupProject} title="Descarga el proyecto completo como archivo JSON">
                  💾 Copia
                </button>
                <label className="filebtn" style={{ flex: 1, padding: '8px 10px' }} title="Restaura un proyecto desde su copia JSON">
                  📂 Restaurar
                  <input type="file" accept=".json" hidden onChange={restoreProject} />
                </label>
              </div>
            </section>
          </>
        )}
      </aside>

      <main className="stage" data-tour="map">
        <MapView ref={mapRef} tool={tool} onDraw={handleDraw} onStatus={setStatus} />
        {isDrawingTool && (
          <div className="draw-toolbar">
            <button onClick={() => mapRef.current?.undoVertex()} title="Deshacer último punto (Retroceso)">
              ↩️ Deshacer punto
            </button>
            <button onClick={() => mapRef.current?.finishDraw()} title="Terminar con los puntos puestos (Enter)">
              ✔️ Terminar
            </button>
            <button onClick={() => mapRef.current?.cancelDraw(tool)} title="Borrar todo y empezar de nuevo (Esc)">
              🗑️ Reiniciar
            </button>
            <button onClick={() => setTool('pan')} title="Salir del modo dibujo">
              ✕ Salir
            </button>
          </div>
        )}
        {intel && (
          <div className="intel-card">
            <div className="intel-head">
              <b>🧠 Radiografía del terreno</b>
              <span>
                <button className="mini" onClick={printIntel}>🖨️ PDF</button>{' '}
                <button className="mini" onClick={() => setIntel(null)}>✕</button>
              </span>
            </div>
            <div className="intel-row">📍 LV95 {intel.e.toFixed(1)} / {intel.n.toFixed(1)} · {intel.heightM != null ? `${intel.heightM.toFixed(1)} m s.n.m.` : ''}</div>
            <div className="intel-row">
              {intel.droneZones.length
                ? intel.droneZones.map((z, i) => (
                    <div key={i} className="intel-no">🚫 {z.name}{z.restriction ? ` — ${z.restriction}` : ''}</div>
                  ))
                : <span className="intel-ok">✅ Sin restricciones de drones registradas aquí</span>}
            </div>
            {intel.wildZones?.length > 0 && intel.wildZones.map((z, i) => (
              <div key={`w${i}`} className="intel-row">
                <span className="intel-no">🦌 {z.name}{z.period ? ` · protección ${z.period}` : ''}{z.binding ? ' · vinculante' : ''}</span>
              </div>
            ))}
            {intel.bln && (
              <div className="intel-row">
                🏞️ Paisaje protegido BLN: {intel.bln.name}
                {intel.bln.objNr ? ` (n.º ${intel.bln.objNr})` : ''}
              </div>
            )}
            <div className="intel-row">
              🏗️ {intel.bauzone
                ? `${intel.bauzone.tipo ?? 'Zona de construcción'} · ${intel.bauzone.municipio ?? ''} (${intel.bauzone.canton ?? ''})`
                : 'Fuera de zona de construcción registrada'}
            </div>
            {intel.solar && (
              <div className="intel-row">
                ☀️ Techo: {intel.solar.klasseText} · {intel.solar.areaM2?.toFixed(0)} m² ·{' '}
                {Math.round(intel.solar.yearlyKWh ?? 0).toLocaleString('es-CH')} kWh/año
              </div>
            )}
            {intel.weather && (
              <div className="intel-row">
                {intel.weather.verdict.level === 'ok' ? '✅' : intel.weather.verdict.level === 'warn' ? '⚠️' : '❌'}{' '}
                💨 {intel.weather.windMS.toFixed(1)} m/s · 🌡️ {intel.weather.tempC.toFixed(0)} °C · ☀️ {intel.weather.sunElev.toFixed(0)}°
                {intel.weather.windows.length > 0 && ` · mejores horas: ${intel.weather.windows.join(', ')}`}
              </div>
            )}
            {intel.live && (
              <div className="intel-row">
                📡 {intel.live.station.name} ({intel.live.distanceKM.toFixed(0)} km
                {intel.live.data.ageMin != null && `, hace ${intel.live.data.ageMin} min`}):{' '}
                💨 {intel.live.data.windMS.toFixed(1)} m/s
                {intel.live.data.gustMS != null && ` · rachas ${intel.live.data.gustMS.toFixed(1)}`}
                {intel.live.data.tempC != null && ` · ${intel.live.data.tempC.toFixed(1)} °C`}
              </div>
            )}
          </div>
        )}
        {status && <div className="status">{status}</div>}
        {show3D && (
          <Dsm3DView georaster={mapRef.current.getDSM()} onClose={() => setShow3D(false)} />
        )}
        {showManual && (
          <Manual onClose={() => setShowManual(false)} onAction={onManualAction} />
        )}
        {showTour && <GuidedTour onClose={() => setShowTour(false)} />}
        {showGcpEditor && (
          <GcpEditor
            gcps={current.gcps}
            marks={current.gcpMarks ?? []}
            onAddMark={(gcpId, image, x, y) =>
              updateCurrent((p) => {
                // Una marca por diana y foto: recolocar reemplaza.
                const rest = (p.gcpMarks ?? []).filter(
                  (m) => !(m.gcpId === gcpId && m.image === image)
                )
                p.gcpMarks = [...rest, { id: crypto.randomUUID(), gcpId, image, x, y }]
                return p
              })
            }
            onDeleteMark={(id) =>
              updateCurrent((p) => {
                p.gcpMarks = (p.gcpMarks ?? []).filter((m) => m.id !== id)
                return p
              })
            }
            onClose={() => setShowGcpEditor(false)}
          />
        )}
      </main>
    </div>
  )
}
