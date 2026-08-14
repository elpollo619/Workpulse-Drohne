import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import {
  floorPointFromDirection, floorDistance, floorPathLength,
  floorPolygonArea, objectHeight,
} from '../lib/pano.js'

const MODES = [
  { id: 'distance', label: '📏 Distancia', hint: 'Toca dos puntos del SUELO' },
  { id: 'path', label: '📐 Ruta / Área', hint: 'Encadena puntos del suelo; cierra la figura para el área' },
  { id: 'height', label: '📊 Altura', hint: 'Toca el PIE del objeto (en el suelo) y luego su parte ALTA' },
]

export const MEASURE_COLORS = [
  '#34d399', '#60a5fa', '#f472b6', '#f59e0b',
  '#a78bfa', '#f87171', '#4ade80', '#22d3ee',
]

/**
 * Visor de fotos 360° con medición real y mediciones persistentes.
 * Las medidas completadas se guardan (onSave) y se dibujan con un color por
 * medición; el borrador en curso va en blanco.
 */
export default function Pano360View({
  imageURL, measurements = [], onSave, onDelete, onOpenPlan, onClose, extraControls,
}) {
  const mountRef = useRef(null)
  const stateRef = useRef({})
  const [camHeight, setCamHeight] = useState(1.6)
  const camHeightRef = useRef(1.6)
  const [mode, setMode] = useState('distance')
  const modeRef = useRef('distance')
  const [taps, setTaps] = useState([])
  const tapsRef = useRef([])
  const [message, setMessage] = useState(MODES[0].hint)
  const [panelOpen, setPanelOpen] = useState(true)
  const measurementsRef = useRef(measurements)

  useEffect(() => { tapsRef.current = taps }, [taps])

  // El listener de clic se registra una sola vez; esta ref le da siempre las
  // funciones de guardado del render actual (evita cierres obsoletos).
  const apiRef = useRef({})

  useEffect(() => { camHeightRef.current = camHeight }, [camHeight])
  useEffect(() => { measurementsRef.current = measurements }, [measurements])
  useEffect(() => {
    modeRef.current = mode
    setTaps([])
    setMessage(MODES.find((m) => m.id === mode)?.hint ?? '')
  }, [mode])

  function nextLabel(m) {
    const prefix = m === 'distance' ? 'D' : m === 'path' ? 'A' : 'H'
    const n = measurementsRef.current.filter((x) => x.label?.startsWith(prefix)).length + 1
    return `${prefix}${n}`
  }

  function saveDistance(a, b) {
    const value = floorDistance(a.fp, b.fp)
    onSave?.({
      id: crypto.randomUUID(),
      mode: 'distance',
      label: nextLabel('distance'),
      value,
      unit: 'm',
      points: [a.fp, b.fp],
      dirs: [a.dir, b.dir],
      camHeight: camHeightRef.current,
    })
    setMessage(`📏 Guardado: ${value.toFixed(2)} m`)
    setTaps([])
  }

  function saveHeight(foot, topDir) {
    const value = objectHeight(foot.fp, topDir, camHeightRef.current)
    if (value == null || value <= 0) {
      setMessage('⚠️ No se pudo calcular. Toca el tope en la misma vertical del pie.')
      setTaps([])
      return
    }
    onSave?.({
      id: crypto.randomUUID(),
      mode: 'height',
      label: nextLabel('height'),
      value,
      unit: 'm',
      points: [foot.fp],
      dirs: [foot.dir, topDir],
      camHeight: camHeightRef.current,
    })
    setMessage(`📊 Guardado: altura ${value.toFixed(2)} m`)
    setTaps([])
  }

  function savePath(close) {
    const floorPts = taps.filter((t) => t.fp).map((t) => t.fp)
    if (floorPts.length < 2) return
    const isArea = close && floorPts.length >= 3
    const value = isArea
      ? floorPolygonArea(floorPts)
      : floorPathLength(floorPts)
    onSave?.({
      id: crypto.randomUUID(),
      mode: isArea ? 'area' : 'path',
      label: nextLabel('path'),
      value,
      unit: isArea ? 'm²' : 'm',
      perimeter: isArea ? floorPathLength([...floorPts, floorPts[0]]) : undefined,
      points: floorPts,
      dirs: taps.map((t) => t.dir),
      closed: isArea,
      camHeight: camHeightRef.current,
    })
    setMessage(isArea
      ? `📐 Guardado: área ${value.toFixed(2)} m²`
      : `📐 Guardado: ruta ${value.toFixed(2)} m`)
    setTaps([])
  }

  apiRef.current = { saveDistance, saveHeight }

  useEffect(() => {
    if (!imageURL || !mountRef.current) return
    const mount = mountRef.current

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 200)
    camera.position.set(0, 0, 0.01)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(50, 64, 48),
      new THREE.MeshBasicMaterial({ side: THREE.BackSide })
    )
    scene.add(sphere)
    new THREE.TextureLoader().load(imageURL, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      sphere.material.map = tex
      sphere.material.needsUpdate = true
    })

    const savedGroup = new THREE.Group()
    const draftGroup = new THREE.Group()
    scene.add(savedGroup, draftGroup)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false
    controls.enablePan = false
    controls.rotateSpeed = -0.35

    const onWheel = (e) => {
      camera.fov = Math.min(100, Math.max(30, camera.fov + e.deltaY * 0.05))
      camera.updateProjectionMatrix()
    }
    renderer.domElement.addEventListener('wheel', onWheel)

    const raycaster = new THREE.Raycaster()
    let downAt = null
    const onDown = (e) => { downAt = [e.clientX, e.clientY] }
    const onUp = (e) => {
      if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 6) return
      const rect = renderer.domElement.getBoundingClientRect()
      const ndc = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      )
      raycaster.setFromCamera(ndc, camera)
      const dir = raycaster.ray.direction.clone().normalize()
      const m = modeRef.current
      const fp = floorPointFromDirection(dir, camHeightRef.current)

      // Lógica fuera del actualizador de estado para no duplicar guardados.
      const prev = tapsRef.current
      const tap = { dir: { x: dir.x, y: dir.y, z: dir.z }, fp }
      if (m === 'distance') {
        if (!fp) { setMessage('⚠️ Ese punto no está en el suelo. Apunta más abajo.'); return }
        if (prev.length === 1) apiRef.current.saveDistance(prev[0], tap)
        else setTaps([tap])
      } else if (m === 'path') {
        if (!fp) { setMessage('⚠️ Ese punto no está en el suelo. Apunta más abajo.'); return }
        setTaps([...prev, tap])
      } else {
        // height
        if (prev.length === 0) {
          if (!fp) { setMessage('⚠️ El PIE debe estar en el suelo. Toca la base del objeto.'); return }
          setTaps([tap])
        } else {
          apiRef.current.saveHeight(prev[0], tap.dir)
        }
      }
    }
    renderer.domElement.addEventListener('pointerdown', onDown)
    renderer.domElement.addEventListener('pointerup', onUp)

    stateRef.current = { scene, camera, renderer, savedGroup, draftGroup, controls, sphere }

    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('wheel', onWheel)
      renderer.domElement.removeEventListener('pointerdown', onDown)
      renderer.domElement.removeEventListener('pointerup', onUp)
      controls.dispose()
      sphere.geometry.dispose()
      sphere.material.map?.dispose()
      sphere.material.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [imageURL])

  const anchor = (dir) =>
    new THREE.Vector3(dir.x, dir.y, dir.z).normalize().multiplyScalar(48)

  // Dibuja las mediciones guardadas (un color por medición).
  useEffect(() => {
    const { savedGroup } = stateRef.current
    if (!savedGroup) return
    savedGroup.clear()
    measurements.forEach((mm, idx) => {
      const color = new THREE.Color(MEASURE_COLORS[idx % MEASURE_COLORS.length])
      const anchors = (mm.dirs ?? []).map(anchor)
      for (const a of anchors) {
        const s = new THREE.Mesh(
          new THREE.SphereGeometry(0.55, 14, 10),
          new THREE.MeshBasicMaterial({ color })
        )
        s.position.copy(a)
        savedGroup.add(s)
      }
      if (anchors.length >= 2) {
        const pts = mm.closed ? [...anchors, anchors[0]] : anchors
        savedGroup.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color })
        ))
      }
    })
  }, [measurements, imageURL])

  // Dibuja el borrador y actualiza el mensaje.
  useEffect(() => {
    const { draftGroup } = stateRef.current
    if (!draftGroup) return
    draftGroup.clear()
    const anchors = taps.map((t) => anchor(t.dir))
    for (const a of anchors) {
      const s = new THREE.Mesh(
        new THREE.SphereGeometry(0.65, 14, 10),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      )
      s.position.copy(a)
      draftGroup.add(s)
    }
    if (anchors.length >= 2) {
      draftGroup.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(anchors),
        new THREE.LineBasicMaterial({ color: 0xffffff })
      ))
    }

    if (taps.length === 0) return
    const floorPts = taps.filter((t) => t.fp).map((t) => t.fp)
    if (mode === 'distance' && floorPts.length === 1) {
      setMessage(`📍 A ${floorPts[0].horizontal.toFixed(2)} m de la cámara. Toca el segundo punto.`)
    } else if (mode === 'path') {
      setMessage(`📐 ${floorPts.length} puntos · recorrido ${floorPathLength(floorPts).toFixed(2)} m`)
    } else if (mode === 'height' && taps.length === 1) {
      setMessage(`📍 Pie a ${floorPts[0].horizontal.toFixed(2)} m. Ahora toca la parte ALTA.`)
    }
  }, [taps, mode])

  return (
    <div className="pano360">
      <div ref={mountRef} className="pano360-canvas" />

      <div className="pano360-top">
        {extraControls}
        <div className="pano360-modes">
          {MODES.map((m) => (
            <button key={m.id} className={mode === m.id ? 'active' : ''} onClick={() => setMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
        <label>
          📷
          <input
            type="number" min="0.3" max="5" step="0.1" value={camHeight}
            onChange={(e) => setCamHeight(parseFloat(e.target.value) || 1.6)}
            title="Altura de la cámara (m)"
          /> m
        </label>
        {mode === 'path' && taps.length > 0 && (
          <>
            <button onClick={() => setTaps((p) => p.slice(0, -1))}>↩️</button>
            {taps.length >= 3 && <button onClick={() => savePath(true)}>⬛ Área</button>}
            {taps.length >= 2 && <button onClick={() => savePath(false)}>💾 Ruta</button>}
          </>
        )}
        <button onClick={() => { setTaps([]); setMessage(MODES.find((m) => m.id === mode)?.hint ?? '') }}>🗑️</button>
        <button onClick={() => setPanelOpen((v) => !v)}>📋</button>
        <button onClick={onClose}>✕</button>
      </div>

      {panelOpen && (
        <div className="pano360-panel">
          <b>Mediciones ({measurements.length})</b>
          <ul>
            {measurements.map((mm, idx) => (
              <li key={mm.id}>
                <span className="dot" style={{ background: MEASURE_COLORS[idx % MEASURE_COLORS.length] }} />
                <span className="lbl">{mm.label}</span>
                <span className="val">
                  {mm.value.toFixed(2)} {mm.unit}
                  {mm.mode === 'area' && mm.perimeter ? ` · per. ${mm.perimeter.toFixed(1)} m` : ''}
                </span>
                <button className="del" onClick={() => onDelete?.(mm.id)}>✕</button>
              </li>
            ))}
            {measurements.length === 0 && <li className="empty">Aún no hay mediciones.</li>}
          </ul>
          {onOpenPlan && (
            <button disabled={!measurements.some((m) => m.points?.length >= 2)} onClick={onOpenPlan}>
              🗺️ Plano de planta
            </button>
          )}
        </div>
      )}

      <div className="pano360-msg">{message}</div>
      <div className="pano360-hint">
        Suelo plano + altura de cámara bien medida = medidas fiables · arrastra para mirar, rueda para zoom
      </div>
    </div>
  )
}
