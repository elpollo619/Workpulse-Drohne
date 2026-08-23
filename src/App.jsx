import { useEffect, useMemo, useRef, useState } from 'react'
import MapView from './components/MapView.jsx'
import Manual from './components/Manual.jsx'
import GuidedTour from './components/GuidedTour.jsx'
import ProcessPanel from './components/ProcessPanel.jsx'
import Dsm3DView from './components/Dsm3DView.jsx'
import Swiss3DView from './components/Swiss3DView.jsx'
import GcpEditor from './components/GcpEditor.jsx'
import FacadeEditor from './components/FacadeEditor.jsx'
import InspectionEditor from './components/InspectionEditor.jsx'
import ProfileChart from './components/ProfileChart.jsx'
import { loadProjects, saveProjects, newProject } from './lib/storage.js'
import { exportGeoJSON, exportPointsCSV, exportGCP, exportGPX, exportKML } from './lib/export.js'
import { openPrintableReport } from './lib/report.js'
import { fmtDistance, fmtArea, fmtVolume, lineLengthMeters, polygonMetrics } from './lib/measure.js'
import { computeVolume, computeVolumeDiff } from './lib/raster.js'
import { planGrid, planOrbit, applyTerrainFollow, downloadMissionKMZ } from './lib/mission.js'
import { blurScoreFromBitmap, analyzeTrack, flagBlurry } from './lib/quality.js'
import { t, useLang, setLang, getLang } from './lib/i18n.js'
import { downloadDXF3D, downloadXYZ } from './lib/dxf3d.js'
import { fetchFlightConditions } from './lib/weather.js'
import { fetchNearestLive } from './lib/meteoswiss.js'
import { fetchSwissTerrainDSM } from './lib/terrain.js'
import {
  fetchSwissHeight, fetchSwissProfile, fetchSwissHeightGrid, fetchSolarRoof,
  fetchTerrainIntel, fetchBuildingInfo, fetchParcelAt, searchSwissLocations, wgs84ToLV95, isInSwitzerland,
} from './lib/swiss.js'
import { openSitePlanPDF } from './lib/siteplan.js'
import { fetchOerebExtract } from './lib/oereb.js'
import { parsePhotoMeta } from './lib/exif.js'
import { MINI4PRO } from './lib/mission.js'

const TOOLS = [
  { id: 'pan', label: '✋ Mover', hint: 'Navegar por el mapa' },
  { id: 'distance', label: '📏 Distancia', hint: 'Clic para trazar; doble clic para terminar' },
  { id: 'area', label: '⬛ Área', hint: 'Traza un polígono cerrado' },
  { id: 'volume', label: '⛰️ Volumen', hint: 'Requiere DSM cargado; traza el contorno del acopio' },
  { id: 'point', label: '📍 Punto GPS', hint: 'Clic para registrar coordenadas' },
  { id: 'plan', label: '🛫 Plan de vuelo', hint: 'Dibuja la zona a mapear; se genera la rejilla y la misión KMZ' },
  { id: 'orbit', label: '🏠 Órbita fachadas', hint: 'Toca el centro del edificio: 3 órbitas a distintas alturas para fachadas, ventanas y techo' },
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
  const lang = useLang() // re-renderiza toda la app al cambiar de idioma
  const [projects, setProjects] = useState(() => loadProjects())
  const [currentId, setCurrentId] = useState(() => loadProjects()[0]?.id ?? null)
  const [tool, setTool] = useState('pan')
  const [baseMode, setBaseMode] = useState('min')
  const [status, setStatus] = useState(null)
  const [tab, setTab] = useState('measure') // 'measure' | 'process'
  const [show3D, setShow3D] = useState(false)
  const [swiss3D, setSwiss3D] = useState(null) // centro [lng,lat] del visor Suiza 3D
  const [showGcpEditor, setShowGcpEditor] = useState(false)
  const [facadeEditing, setFacadeEditing] = useState(null) // null | 'new' | facade obj
  const [inspectionEditing, setInspectionEditing] = useState(null) // null | 'new' | inspection obj
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [plan, setPlan] = useState(null) // { ring, params, result }
  const [orbit, setOrbit] = useState(null) // { center, params, result }
  const [qa, setQa] = useState(null) // control de calidad del vuelo
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
    } else if (action.facade) {
      setTab('measure')
      setFacadeEditing('new')
    } else if (action.inspection) {
      setTab('measure')
      setInspectionEditing('new')
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
  const planReqRef = useRef(null) // última petición de terrain-follow en curso

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
    } else if (drawTool === 'orbit') {
      updateOrbit(coords, orbit?.params)
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
      const [terrain, wx, live, oereb] = await Promise.all([
        fetchTerrainIntel(lng, lat),
        fetchFlightConditions(lat, lng).catch(() => null),
        fetchNearestLive(lng, lat).catch(() => null),
        fetchOerebExtract(lng, lat).catch(() => null),
      ])
      setIntel({ ...terrain, weather: wx, live, oereb })
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
<h2>Edificio (registro federal GWR)</h2><p>${intel.building
      ? `🏘️ <b>${esc(intel.building.address)}</b> · ${esc(intel.building.municipality)}${intel.building.yearBuilt ? ` · construido ${intel.building.yearBuilt}` : ''}${intel.building.parcel ? ` · parcela n.º ${esc(intel.building.parcel)}` : ''}${intel.building.areaM2 ? ` · superficie de planta ${intel.building.areaM2} m²` : ''}${intel.building.floors ? ` · ${intel.building.floors} plantas` : ''}${intel.building.egid ? ` · EGID ${esc(intel.building.egid)}` : ''}`
      : 'Sin edificio registrado en este punto.'}</p>
<h2>Ordenación del territorio (ARE)</h2><p>${intel.bauzone
      ? `Zona de construcción: <b>${esc(intel.bauzone.tipo)}</b> · ${esc(intel.bauzone.municipio)} (${esc(intel.bauzone.canton)})`
      : 'Fuera de zona de construcción registrada.'}</p>
<h2>Restricciones legales de la parcela (ÖREB)</h2>${intel.oereb?.available && intel.oereb.restrictions.length
      ? `<p>Parcela n.º ${esc(intel.oereb.parcel)} · EGRID ${esc(intel.oereb.egrid)}</p>` +
        intel.oereb.restrictions.map((r) => `<p>⚖️ <b>${esc(r.themeLabel.es)}</b>${r.text ? ' — ' + esc(r.text) : ''}</p>`).join('')
      : intel.oereb
        ? `<p>Extracto no disponible aquí (cantón ${esc(intel.oereb.canton) || '—'}). Consulta el catastro ÖREB cantonal.</p>`
        : '<p>Sin datos ÖREB en este punto.</p>'}
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
    setQa(null)
    const metas = []
    const scores = []
    let noGPS = 0
    for (let i = 0; i < files.length; i++) {
      const f = files[i]
      setStatus(`✅ Analizando foto ${i + 1}/${files.length} (GPS + nitidez)…`)
      const meta = parsePhotoMeta(await f.arrayBuffer())
      if (meta) metas.push({ ...meta, name: f.name })
      else noGPS++
      // Nitidez: laplaciano sobre miniatura de 512 px.
      try {
        const bm = await createImageBitmap(f, { resizeWidth: 512 })
        scores.push({ name: f.name, score: blurScoreFromBitmap(bm) })
        bm.close?.()
      } catch {
        scores.push({ name: f.name, score: null })
      }
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
    const track = analyzeTrack(metas)
    const blurry = flagBlurry(scores)
    setQa({ track, blurry, photoCount: metas.length, noGPS })
    setStatus(null)
    e.target.value = ''
  }

  // Recalcula la rejilla del plan de vuelo y la dibuja en el mapa. Con
  // terrain-follow activo, el plan se muestra al instante con altura fija y
  // las alturas por waypoint llegan cuando responde el perfil oficial.
  async function updatePlan(ring, params) {
    const p = { altitude: 70, frontOverlap: 0.8, sideOverlap: 0.7, speed: 5, terrain: false, ...params }
    const result = planGrid(ring, p)
    setPlan({ ring, params: p, result })
    mapRef.current?.drawFlightPlan(ring, result.waypoints)
    if (!p.terrain || result.waypoints.length < 2 || !isInSwitzerland(...result.waypoints[0])) return

    setStatus('⛰️ Consultando el perfil del terreno oficial…')
    // Solo se descarta una respuesta si llegó DESPUÉS de otra petición más
    // nueva (deslizadores movidos rápido).
    const token = Symbol('plan')
    planReqRef.current = token
    // Para la URL del perfil solo hacen falta los vértices (las fotos de una
    // línea recta son colineales); la distancia del camino no cambia.
    const corners = [result.waypoints[0]]
    for (let i = 1; i < result.waypoints.length - 1; i++) {
      const [a, b, c] = [result.waypoints[i - 1], result.waypoints[i], result.waypoints[i + 1]]
      const cross = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0])
      if (Math.abs(cross) > 1e-12) corners.push(b)
    }
    corners.push(result.waypoints[result.waypoints.length - 1])
    const profile = await fetchSwissProfile(corners, 200)
    if (planReqRef.current !== token) return // llegó una petición más nueva
    const tf = profile ? applyTerrainFollow(result.waypoints, profile, p.altitude) : null
    if (tf) {
      const result2 = { ...result, waypoints: tf.waypoints, terrain: tf }
      setPlan({ ring, params: p, result: result2 })
      mapRef.current?.drawFlightPlan(ring, tf.waypoints)
      setStatus(null)
    } else {
      setStatus('⚠️ Perfil oficial no disponible — plan con altura fija.')
    }
  }

  function clearPlan() {
    setPlan(null)
    mapRef.current?.clearFlightPlan()
  }

  // Recalcula la misión de órbita alrededor del edificio y la dibuja.
  function updateOrbit(center, params) {
    const p = { radius: 15, buildingHeightM: 8, photosPerOrbit: 24, speed: 2.5, ...params }
    const result = planOrbit(center, p)
    setOrbit({ center, params: p, result })
    mapRef.current?.drawOrbit(center, p.radius, result.waypoints)
  }

  function clearOrbit() {
    setOrbit(null)
    mapRef.current?.clearFlightPlan()
  }

  // 🏗️ Exportación CAD: DXF 3D con terreno (si hay DSM), mediciones y puntos.
  function exportCAD() {
    const dsm = mapRef.current?.getDSM()
    const measurements = current.measurements.map((m) => ({
      coords: m.coords,
      closed: m.type !== 'distance',
      label:
        m.type === 'distance' ? fmtDistance(m.result?.lengthM)
        : m.type === 'area' ? fmtArea(m.result?.areaM2)
        : fmtVolume(m.result?.volumeM3 ?? m.result?.fillM3),
    }))
    const points = current.points.map((p) => ({ lng: p.lng, lat: p.lat, elev: p.elev, label: p.label }))
    if (!dsm && !measurements.length && !points.length) {
      setStatus('⚠️ No hay nada que exportar: mide algo o carga un DSM/terreno oficial primero.')
      return
    }
    const { faces, origin } = downloadDXF3D(current.name, {
      dsm, measurements, points, gcps: current.gcps,
    })
    setStatus(
      `🏗️ DXF 3D descargado (${faces ? `terreno de ${faces.toLocaleString('es-CH')} caras, ` : ''}` +
      `${measurements.length} mediciones, ${points.length + current.gcps.length} puntos). ` +
      `Origen local E+${origin.e}/N+${origin.n} (nota incluida en el archivo). Se importa en ArchiCAD, Vectorworks, AutoCAD…`
    )
  }

  // 🗺️ Situationsplan: recuadro = bbox de la geometría del proyecto (o vista
  // actual acotada), fondo catastral oficial y cajetín con datos GWR.
  async function exportSitePlan() {
    // La ventana debe abrirse AHORA (síncrono con el clic) o el navegador la
    // bloqueará como popup; se rellena cuando el plano esté compuesto.
    const win = window.open('', '_blank')
    if (!win) {
      setStatus('⚠️ El navegador bloqueó la ventana del plano — permite popups para esta página.')
      return
    }
    const geo = [
      ...current.measurements.flatMap((m) => m.coords),
      ...current.points.map((p) => [p.lng, p.lat]),
    ]
    let bounds
    if (geo.length >= 2 || (geo.length === 1 && current.points.length)) {
      const lngs = geo.map((c) => c[0])
      const lats = geo.map((c) => c[1])
      const dLng = Math.max(0.0012, (Math.max(...lngs) - Math.min(...lngs)) * 0.25)
      const dLat = Math.max(0.0008, (Math.max(...lats) - Math.min(...lats)) * 0.25)
      bounds = {
        west: Math.min(...lngs) - dLng,
        east: Math.max(...lngs) + dLng,
        south: Math.min(...lats) - dLat,
        north: Math.max(...lats) + dLat,
      }
    } else {
      // Sin geometría: recuadro de ~250 m alrededor del centro del mapa.
      const c = mapRef.current?.getCenter()
      if (!c) {
        win.close()
        return
      }
      bounds = { west: c.lng - 0.0016, east: c.lng + 0.0016, south: c.lat - 0.0011, north: c.lat + 0.0011 }
    }
    if (!isInSwitzerland(bounds.west, bounds.south)) {
      win.close()
      setStatus('⚠️ El Situationsplan usa el catastro suizo: la zona debe estar en Suiza.')
      return
    }
    const cLng = (bounds.west + bounds.east) / 2
    const cLat = (bounds.south + bounds.north) / 2
    const [gwr, parcel] = await Promise.all([
      fetchBuildingInfo(cLng, cLat).catch(() => null),
      fetchParcelAt(cLng, cLat).catch(() => null),
    ])
    await openSitePlanPDF({ project: current, bounds, gwr, parcel, win, onProgress: setStatus })
  }

  function exportXYZ() {
    const dsm = mapRef.current?.getDSM()
    if (!dsm) {
      setStatus('⚠️ Carga primero un DSM (vuelo procesado o 🏔️ terreno oficial) para exportar la nube XYZ.')
      return
    }
    const res = downloadXYZ(current.name, dsm)
    setStatus(res
      ? `☁️ Nube XYZ descargada (${res.points.toLocaleString('es-CH')} puntos, LV95 absoluto, precisión cm).`
      : '⚠️ No se pudo generar la nube (proyección del DSM no soportada).')
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
          <p>{t('Medición fotogramétrica · Berna 🇨🇭')}</p>
          <div className="help-row">
            <button className="mini" data-tour="manual" onClick={() => setShowManual(true)}>
              {t('📖 Manual')}
            </button>
            <button className="mini" onClick={() => { setSidebarOpen(true); setTab('measure'); setShowTour(true) }}>
              {t('🎓 Tour guiado')}
            </button>
            <button
              className={lang === 'es' ? 'mini lang-active' : 'mini'}
              onClick={() => setLang('es')}
              title="Español"
            >
              ES
            </button>
            <button
              className={lang === 'de' ? 'mini lang-active' : 'mini'}
              onClick={() => setLang('de')}
              title="Deutsch (Schweiz)"
            >
              DE
            </button>
          </div>
        </header>

        <section className="block search-block" data-tour="search">
          <input
            type="text"
            placeholder={t('🔍 Buscar dirección o lugar en Suiza…')}
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
          <label className="block-label">{t('Proyecto')}</label>
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
          <button className={tab === 'measure' ? 'active' : ''} onClick={() => setTab('measure')}>{t('📐 Medir')}</button>
          <button className={tab === 'process' ? 'active' : ''} onClick={() => setTab('process')}>{t('⚙️ Procesar')}</button>
        </nav>

        {tab === 'process' && (
          <section className="block">
            <label className="block-label">{t('Verificación en campo')}</label>
            <label className="filebtn">
              {t('📷 Verificar cobertura del vuelo')}
              <input type="file" accept="image/jpeg" multiple hidden onChange={onCoverageFiles} />
            </label>
            <p className="hint">
              Selecciona las fotos recién sacadas: el mapa muestra dónde disparó
              el drone, y la app mide el <b>solape real</b>, busca <b>huecos</b> y
              detecta <b>fotos borrosas</b> — todo <b>antes de irte del sitio</b>.
            </p>
            {qa && (
              <div className={`weather-card weather-${qa.track?.level ?? 'warn'}`}>
                <div className="weather-head">
                  {(!qa.track || qa.track.level === 'warn') && '⚠️ Revisable antes de procesar'}
                  {qa.track?.level === 'ok' && '✅ Vuelo apto para procesar'}
                  {qa.track?.level === 'no' && '❌ Solape insuficiente — repite el vuelo'}
                </div>
                {qa.track ? (
                  <div className="weather-data">
                    <span>📷 {qa.photoCount} fotos</span>
                    <span>🔁 solape {Math.round(qa.track.avgOverlap * 100)}%</span>
                    <span>min {Math.round(qa.track.minOverlap * 100)}%</span>
                    {qa.track.avgAltM != null && <span>⬆️ {qa.track.avgAltM.toFixed(0)} m</span>}
                  </div>
                ) : (
                  <p className="hint">No se pudo derivar el solape (pocas fotos o sin patrón de rejilla).</p>
                )}
                {qa.track?.gaps.length > 0 && (
                  <ul className="weather-reasons">
                    {qa.track.gaps.map((g, i) => (
                      <li key={i}>🕳️ Hueco tras {g.after}: {g.distM.toFixed(0)} m entre fotos ({Math.round(g.overlap * 100)}% solape)</li>
                    ))}
                  </ul>
                )}
                {qa.blurry.length > 0 && (
                  <ul className="weather-reasons">
                    {qa.blurry.slice(0, 6).map((b, i) => (
                      <li key={i}>😵‍💫 Posible borrosa: {b.name}</li>
                    ))}
                    {qa.blurry.length > 6 && <li>… y {qa.blurry.length - 6} más</li>}
                  </ul>
                )}
                {qa.blurry.length === 0 && qa.track && (
                  <p className="hint">Nitidez uniforme en todas las fotos ✅</p>
                )}
                {qa.noGPS > 0 && <p className="hint">⚠️ {qa.noGPS} foto(s) sin GPS excluidas.</p>}
              </div>
            )}

            <label className="block-label">{t('Fotos del vuelo → orto + DSM')}</label>
            <ProcessPanel
              projectName={current.name}
              onLoadOrtho={(buf) => mapRef.current.loadOrtho(buf)}
              onLoadDSM={(buf) => mapRef.current.loadDSM(buf)}
              onStatus={setStatus}
            />
            <label className="block-label">{t('O carga GeoTIFF a mano')}</label>
            <label className="filebtn">
              {t('🗺️ Ortomosaico (GeoTIFF)')}
              <input type="file" accept=".tif,.tiff" onChange={onOrthoFile} hidden />
            </label>
            <label className="filebtn">
              {t('⛰️ DSM (GeoTIFF)')}
              <input type="file" accept=".tif,.tiff" onChange={onDSMFile} hidden />
            </label>
            <label className="filebtn">
              {t('⏮️ DSM del vuelo anterior (comparar)')}
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
              <span>{t('Opacidad orto')}</span>
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
              {t('🧊 Vista 3D del terreno')}
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
              {t('🔥 Mapa de calor de cambios')}
            </button>

            <label className="block-label">{t('🇨🇭 Terreno oficial — sin volar')}</label>
            <button onClick={() => loadOfficialTerrain('dsm')}>
              {t('🏔️ Cargar terreno oficial (vista actual)')}
            </button>
            <button onClick={() => loadOfficialTerrain('prev')}>
              {t('🏔️→⏮️ Terreno oficial como base de comparación')}
            </button>
            <p className="hint">
              swissALTI3D (2 m/px): mide volúmenes, perfiles y 3D en cualquier
              punto de Suiza <b>sin necesidad de vuelo</b>. O cárgalo como base
              y compara tu vuelo contra el terreno oficial (🔥 mapa de calor)
              para ver acopios, edificios o excavaciones nuevas.
            </p>

            <label className="block-label">{t('Interiores / cámara 360°')}</label>
            <a className="filebtn applink" href="./360/">
              {t('📷 Abrir Workpulse 360 ↗')}
            </a>
            <p className="hint">
              {t('La medición con cámaras 360° (Insta360) es una app aparte, hecha para espacios interiores.')}
            </p>
          </section>
        )}

        {tab === 'measure' && (
          <>
            <section className="block" data-tour="tools">
              <label className="block-label">{t('Herramienta')}</label>
              <div className="tools">
                {TOOLS.map((tl) => (
                  <button
                    key={tl.id}
                    className={tool === tl.id ? 'tool active' : 'tool'}
                    title={t(tl.hint)}
                    onClick={() => setTool(tl.id)}
                  >
                    {t(tl.label)}
                  </button>
                ))}
              </div>
              {tool === 'volume' && (
                <div className="row small">
                  <span>{t('Base')}</span>
                  <select value={baseMode} onChange={(e) => setBaseMode(e.target.value)}>
                    {BASE_MODES.map((b) => (
                      <option key={b.id} value={b.id}>{t(b.label)}</option>
                    ))}
                  </select>
                </div>
              )}
              <p className="hint">{t(TOOLS.find((tl) => tl.id === tool)?.hint ?? '')}</p>
            </section>

            <section className="block">
              <button
                onClick={() => {
                  const c = mapRef.current?.getCenter()
                  if (!c) return
                  if (!isInSwitzerland(c.lng, c.lat)) return setStatus('⚠️ Suiza 3D solo cubre Suiza.')
                  setSwiss3D([c.lng, c.lat])
                }}
                title="Todos los edificios oficiales de Suiza en 3D sobre el terreno con ortofoto — mide alturas y distancias antes de volar"
              >
                {t('🏙️ Suiza 3D — casas y terreno oficiales')}
              </button>
              <p className="hint">
                {t('Centra el mapa en la casa y ábrelo: la ves en 3D con su entorno y mides alturas reales — antes de volar.')}
              </p>
            </section>

            <section className="block" data-tour="weather">
              <button onClick={checkWeather} disabled={weatherBusy}>
                🌤️ {weatherBusy ? t('Consultando…') : t('¿Puedo volar ahora aquí?')}
              </button>
              {weather && (
                <div className={`weather-card weather-${weather.verdict.level}`}>
                  <div className="weather-head">
                    {weather.verdict.level === 'ok' && t('✅ Buenas condiciones')}
                    {weather.verdict.level === 'warn' && t('⚠️ Volable con precaución')}
                    {weather.verdict.level === 'no' && t('❌ No recomendado')}
                  </div>
                  <div className="weather-data">
                    <span>💨 {weather.windMS.toFixed(1)} m/s</span>
                    <span>💥 {t('rachas')} {weather.gustMS.toFixed(1)}</span>
                    <span>🌡️ {weather.tempC.toFixed(0)} °C</span>
                    <span>☀️ {t('sol')} {weather.sunElev.toFixed(0)}°</span>
                  </div>
                  {weather.live && (
                    <p className="hint">
                      <b>{t('📡 Medido ahora')}</b> · {weather.live.station.name}{' '}
                      ({weather.live.distanceKM.toFixed(0)} km
                      {weather.live.data.ageMin != null && `, ${t('hace {n} min', { n: weather.live.data.ageMin })}`}):{' '}
                      💨 {weather.live.data.windMS.toFixed(1)} m/s
                      {weather.live.data.gustMS != null && ` · ${t('rachas')} ${weather.live.data.gustMS.toFixed(1)}`}
                      {weather.live.data.tempC != null && ` · 🌡️ ${weather.live.data.tempC.toFixed(1)} °C`}
                      {weather.live.data.precipMM10 != null && weather.live.data.precipMM10 > 0 &&
                        ` · 🌧️ ${weather.live.data.precipMM10.toFixed(1)} mm/10min`}
                    </p>
                  )}
                  <ul className="weather-reasons">
                    {weather.verdict.reasons.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                  {weather.windows.length > 0 && (
                    <p className="hint">{t('📸 Mejores horas hoy para mapear:')} {weather.windows.join(', ')}</p>
                  )}
                  <p className="hint">
                    {t('Activa la capa 🚫 (control de capas) para ver las zonas de restricción de drones oficiales (BAZL).')}
                  </p>
                </div>
              )}
            </section>

            {plan && (
              <section className="block plan-panel">
                <label className="block-label">
                  {t('🛫 Plan de vuelo')}
                  <button className="mini" onClick={clearPlan}>{t('✕ quitar')}</button>
                </label>
                <div className="row small">
                  <span>{t('Altura:')} <b>{plan.params.altitude} m</b></span>
                  <input
                    type="range" min="40" max="120" step="5"
                    value={plan.params.altitude}
                    onChange={(e) => updatePlan(plan.ring, { ...plan.params, altitude: +e.target.value })}
                  />
                </div>
                <div className="row small">
                  <span>{t('Solape frontal:')} <b>{Math.round(plan.params.frontOverlap * 100)}%</b></span>
                  <input
                    type="range" min="70" max="90" step="5"
                    value={plan.params.frontOverlap * 100}
                    onChange={(e) => updatePlan(plan.ring, { ...plan.params, frontOverlap: +e.target.value / 100 })}
                  />
                </div>
                <div className="row small">
                  <span>{t('Solape lateral:')} <b>{Math.round(plan.params.sideOverlap * 100)}%</b></span>
                  <input
                    type="range" min="60" max="85" step="5"
                    value={plan.params.sideOverlap * 100}
                    onChange={(e) => updatePlan(plan.ring, { ...plan.params, sideOverlap: +e.target.value / 100 })}
                  />
                </div>
                <div className="row small">
                  <span>{t('Velocidad:')} <b>{plan.params.speed} m/s</b></span>
                  <input
                    type="range" min="2" max="8" step="1"
                    value={plan.params.speed}
                    onChange={(e) => updatePlan(plan.ring, { ...plan.params, speed: +e.target.value })}
                  />
                </div>
                <div className="row small">
                  <label style={{ display: 'flex', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={plan.params.terrain}
                      onChange={(e) => updatePlan(plan.ring, { ...plan.params, terrain: e.target.checked })}
                    />
                    <span>{t('⛰️ Seguir el terreno (GSD constante)')}</span>
                  </label>
                </div>
                {plan.result.terrain && (
                  <p className="hint">
                    ⛰️ Desnivel del terreno: {plan.result.terrain.rangeM.toFixed(0)} m · alturas{' '}
                    {Math.min(...plan.result.waypoints.map((w) => w.alt)).toFixed(0)}–
                    {Math.max(...plan.result.waypoints.map((w) => w.alt)).toFixed(0)} m
                    {plan.result.terrain.clampedCount > 0 && ` · ⚠️ ${plan.result.terrain.clampedCount} waypoints limitados a 20–120 m`}
                    . <b>Despega junto al primer waypoint</b> (las alturas son relativas a su terreno).
                  </p>
                )}
                <div className="plan-stats">
                  <span>📷 {plan.result.photoCount} {t('fotos')}</span>
                  <span>📏 GSD {plan.result.gsdCM.toFixed(1)} cm/px</span>
                  <span>➰ {plan.result.lines} {t('líneas')}</span>
                  <span>🛣️ {(plan.result.distanceM / 1000).toFixed(2)} km</span>
                  <span>⏱️ ~{Math.ceil(plan.result.durationMin)} min</span>
                </div>
                {plan.result.tooMany && (
                  <p className="hint">
                    {t('⚠️ Demasiados waypoints para DJI Fly (~180 máx). Sube la altura o reduce la zona.')}
                  </p>
                )}
                {plan.result.durationMin > 25 && (
                  <p className="hint">{t('⚠️ Supera una batería (~30 min reales). Divide la zona en dos vuelos.')}</p>
                )}
                <button
                  disabled={plan.result.tooMany}
                  onClick={() => downloadMissionKMZ(current.name, plan.result.waypoints, {
                    ...plan.params,
                    altitude: plan.result.terrain
                      ? Math.max(...plan.result.waypoints.map((w) => w.alt))
                      : plan.params.altitude,
                  })}
                >
                  {t('💾 Descargar misión KMZ (DJI Fly)')}
                </button>
                <p className="hint">
                  Instálala en el mando reemplazando el archivo de una misión creada
                  en DJI Fly (guía: <code>docs/PLAN-DE-VUELO.md</code>). Verifica el
                  primer vuelo visualmente.
                </p>
              </section>
            )}

            {orbit && (
              <section className="block plan-panel">
                <label className="block-label">
                  {t('🏠 Órbita de fachadas')}
                  <button className="mini" onClick={clearOrbit}>{t('✕ quitar')}</button>
                </label>
                <div className="row small">
                  <span>{t('Radio:')} <b>{orbit.params.radius} m</b></span>
                  <input
                    type="range" min="8" max="40" step="1"
                    value={orbit.params.radius}
                    onChange={(e) => updateOrbit(orbit.center, { ...orbit.params, radius: +e.target.value })}
                  />
                </div>
                <div className="row small">
                  <span>{t('Altura edificio:')} <b>{orbit.params.buildingHeightM} m</b></span>
                  <input
                    type="range" min="3" max="25" step="1"
                    value={orbit.params.buildingHeightM}
                    onChange={(e) => updateOrbit(orbit.center, { ...orbit.params, buildingHeightM: +e.target.value })}
                  />
                </div>
                <div className="row small">
                  <span>{t('Fotos por vuelta:')} <b>{orbit.params.photosPerOrbit}</b></span>
                  <input
                    type="range" min="12" max="36" step="4"
                    value={orbit.params.photosPerOrbit}
                    onChange={(e) => updateOrbit(orbit.center, { ...orbit.params, photosPerOrbit: +e.target.value })}
                  />
                </div>
                <div className="plan-stats">
                  <span>📷 {orbit.result.photoCount} {t('fotos')}</span>
                  <span>📏 {orbit.result.gsdCM.toFixed(1)} cm/px {t('en fachada')}</span>
                  <span>⏱️ ~{Math.ceil(orbit.result.durationMin)} min</span>
                </div>
                <p className="hint">
                  Niveles: {orbit.result.levels.map((l) => `${l.alt} m (cámara ${l.pitch}°)`).join(' · ')}
                </p>
                {orbit.result.tooMany && (
                  <p className="hint">⚠️ Demasiados waypoints (~180 máx). Baja las fotos por vuelta.</p>
                )}
                <button
                  disabled={orbit.result.tooMany}
                  onClick={() => downloadMissionKMZ(`${current.name}-orbita`, orbit.result.waypoints, {
                    altitude: orbit.result.maxAlt, speed: orbit.params.speed,
                  })}
                >
                  {t('💾 Descargar misión órbita (KMZ)')}
                </button>
                <p className="hint">
                  ⚠️ Comprueba que el radio libra árboles y cables — el drone vuela
                  el círculo completo a las 3 alturas mirando siempre al edificio.
                  Con radio ≤ 20 m y GCP consigues detalle de ventanas y puertas
                  a 1–3 cm/px.
                </p>
              </section>
            )}

            <section className="block grow" data-tour="lists">
              <label className="block-label">{t('Mediciones')} ({current.measurements.length})</label>
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
                  <li className="muted">{t('Sin mediciones todavía.')}</li>
                )}
              </ul>

              <label className="block-label">{t('Puntos GPS')} ({current.points.length})</label>
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
                {current.points.length === 0 && <li className="muted">{t('Sin puntos todavía.')}</li>}
              </ul>

              <label className="block-label">
                {t('🏢 Planos de fachada')} ({(current.facades ?? []).length})
                <button className="mini" onClick={() => setFacadeEditing('new')}>{t('✏️ nuevo')}</button>
              </label>
              <ul className="list">
                {(current.facades ?? []).map((f) => (
                  <li key={f.id}>
                    <span className="mrow" style={{ cursor: 'pointer' }} onClick={() => setFacadeEditing(f)}>
                      🏢 {f.name} · {f.elements.filter((e) => e.type === 'rect').length} huecos
                      {f.metersPerPx ? ' · 📏✅' : ' · sin escala'}
                    </span>
                    <button
                      className="del"
                      onClick={() => updateCurrent((p) => {
                        p.facades = (p.facades ?? []).filter((x) => x.id !== f.id)
                        return p
                      })}
                    >
                      ✕
                    </button>
                  </li>
                ))}
                {(current.facades ?? []).length === 0 && (
                  <li className="muted">{t('Alzados acotados desde fotos de fachada (vuelo 🏠).')}</li>
                )}
              </ul>

              <label className="block-label">
                {t('📋 Inspecciones')} ({(current.inspections ?? []).length})
                <button className="mini" onClick={() => setInspectionEditing('new')}>{t('✏️ nuevo')}</button>
              </label>
              <ul className="list">
                {(current.inspections ?? []).map((ins) => (
                  <li key={ins.id}>
                    <span className="mrow" style={{ cursor: 'pointer' }} onClick={() => setInspectionEditing(ins)}>
                      📋 {ins.name} · {ins.defects.length} {t('defectos')}
                    </span>
                    <button
                      className="del"
                      onClick={() => updateCurrent((p) => {
                        p.inspections = (p.inspections ?? []).filter((x) => x.id !== ins.id)
                        return p
                      })}
                    >
                      ✕
                    </button>
                  </li>
                ))}
                {(current.inspections ?? []).length === 0 && (
                  <li className="muted">{t('Informe de defectos con fotos anotadas (tejados, fachadas).')}</li>
                )}
              </ul>

              <label className="block-label">
                {t('Puntos de control GCP')} ({current.gcps.length})
                <span>
                  <button className="mini" onClick={addGCP}>{t('+ añadir')}</button>{' '}
                  <button className="mini" onClick={() => setShowGcpEditor(true)}>{t('🎯 editor')}</button>
                </span>
              </label>
              <ul className="list">
                {current.gcps.map((g) => (
                  <li key={g.id}>
                    <span className="mrow">🎯 {g.name} — {g.lat.toFixed(5)}, {g.lng.toFixed(5)}, {g.elev} m</span>
                  </li>
                ))}
                {current.gcps.length === 0 && (
                  <li className="muted">{t('Sin GCP. Necesarios para precisión topográfica.')}</li>
                )}
              </ul>
            </section>

            <section className="block export" data-tour="export">
              <label className="block-label">{t('Exportar')}</label>
              <div className="tools">
                <button onClick={() => exportGeoJSON(current)}>GeoJSON</button>
                <button onClick={() => exportGPX(current)}>GPX</button>
                <button onClick={() => exportKML(current)}>KML</button>
                <button onClick={() => exportPointsCSV(current)}>{t('CSV puntos')}</button>
                <button onClick={() => exportGCP(current)}>{t('Lista GCP')}</button>
                <button onClick={exportCAD} title="DXF 3D con terreno, mediciones y puntos — ArchiCAD, Vectorworks, AutoCAD, BricsCAD">
                  {t('🏗️ DXF 3D (CAD)')}
                </button>
                <button onClick={exportXYZ} title="Nube de puntos XYZ del terreno en LV95 absoluto — ArchiCAD, Vectorworks, CloudCompare">
                  {t('☁️ Nube XYZ')}
                </button>
                <button onClick={exportSitePlan} title="Plano de situación a escala (1:200/1:500/1:1000) con fondo del catastro oficial, tus mediciones, norte, barra de escala y datos del edificio (GWR) — para solicitudes de obra">
                  {t('🗺️ Situationsplan')}
                </button>
                <button onClick={() => openPrintableReport(current) || setStatus('El navegador bloqueó la ventana del informe.')}>
                  {t('🖨️ Informe')}
                </button>
                <button onClick={backupProject} title="Descarga el proyecto completo como archivo JSON">
                  {t('💾 Copia')}
                </button>
                <label className="filebtn" style={{ flex: 1, padding: '8px 10px' }} title="Restaura un proyecto desde su copia JSON">
                  {t('📂 Restaurar')}
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
              {t('↩️ Deshacer punto')}
            </button>
            <button onClick={() => mapRef.current?.finishDraw()} title="Terminar con los puntos puestos (Enter)">
              {t('✔️ Terminar')}
            </button>
            <button onClick={() => mapRef.current?.cancelDraw(tool)} title="Borrar todo y empezar de nuevo (Esc)">
              {t('🗑️ Reiniciar')}
            </button>
            <button onClick={() => setTool('pan')} title="Salir del modo dibujo">
              {t('✕ Salir')}
            </button>
          </div>
        )}
        {intel && (
          <div className="intel-card">
            <div className="intel-head">
              <b>{t('🧠 Radiografía del terreno')}</b>
              <span>
                <button className="mini" onClick={printIntel}>{t('🖨️ PDF')}</button>{' '}
                <button className="mini" onClick={() => setIntel(null)}>✕</button>
              </span>
            </div>
            <div className="intel-row">📍 LV95 {intel.e.toFixed(1)} / {intel.n.toFixed(1)} · {intel.heightM != null ? `${intel.heightM.toFixed(1)} m s.n.m.` : ''}</div>
            <div className="intel-row">
              {intel.droneZones.length
                ? intel.droneZones.map((z, i) => (
                    <div key={i} className="intel-no">🚫 {z.name}{z.restriction ? ` — ${z.restriction}` : ''}</div>
                  ))
                : <span className="intel-ok">{t('✅ Sin restricciones de drones registradas aquí')}</span>}
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
            {intel.building && (
              <div className="intel-row">
                🏘️ {intel.building.address ?? 'Edificio'}
                {intel.building.yearBuilt ? ` · ${t('construido')} ${intel.building.yearBuilt}` : ''}
                {intel.building.parcel ? ` · ${t('parcela')} ${intel.building.parcel}` : ''}
                {intel.building.areaM2 ? ` · ${intel.building.areaM2} m²` : ''}
              </div>
            )}
            <div className="intel-row">
              🏗️ {intel.bauzone
                ? `${intel.bauzone.tipo ?? 'Zona de construcción'} · ${intel.bauzone.municipio ?? ''} (${intel.bauzone.canton ?? ''})`
                : t('Fuera de zona de construcción registrada')}
            </div>
            {intel.oereb?.available && intel.oereb.restrictions.length > 0 && (
              <div className="intel-row">
                ⚖️ {t('Restricciones legales (ÖREB)')}:
                {intel.oereb.restrictions.slice(0, 4).map((r, i) => (
                  <div key={i} className="intel-sub">
                    · {getLang() === 'de' ? r.themeLabel.de : r.themeLabel.es}{r.text ? ` — ${r.text}` : ''}
                  </div>
                ))}
              </div>
            )}
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
        {swiss3D && <Swiss3DView center={swiss3D} onClose={() => setSwiss3D(null)} />}
        {showManual && (
          <Manual onClose={() => setShowManual(false)} onAction={onManualAction} />
        )}
        {facadeEditing && (
          <FacadeEditor
            projectName={current.name}
            facade={facadeEditing === 'new' ? null : facadeEditing}
            onSave={(f) => {
              if (!f.elements.length && !f.metersPerPx) return // nada que guardar
              updateCurrent((p) => {
                const rest = (p.facades ?? []).filter((x) => x.id !== f.id)
                p.facades = [...rest, f]
                return p
              })
            }}
            onClose={() => setFacadeEditing(null)}
          />
        )}
        {inspectionEditing && (
          <InspectionEditor
            projectName={current.name}
            inspection={inspectionEditing === 'new' ? null : inspectionEditing}
            onStatus={setStatus}
            onSave={(ins) => {
              if (!ins.defects.length) return // nada que guardar
              updateCurrent((p) => {
                const rest = (p.inspections ?? []).filter((x) => x.id !== ins.id)
                p.inspections = [...rest, ins]
                return p
              })
            }}
            onClose={() => setInspectionEditing(null)}
          />
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
