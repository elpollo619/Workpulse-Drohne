import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import {
  floorPointFromDirection, floorDistance, floorPathLength,
  floorPolygonArea, objectHeight,
} from '../lib/pano.js'

const MODES = [
  { id: 'distance', label: '📏 Distancia', hint: 'Toca dos puntos del SUELO' },
  { id: 'path', label: '📐 Ruta / Área', hint: 'Encadena puntos del suelo; "Cerrar figura" para el área' },
  { id: 'height', label: '📊 Altura', hint: 'Toca el PIE del objeto (en el suelo) y luego su parte ALTA' },
]

/**
 * Visor de fotos 360° (equirectangulares, p.ej. Insta360) con medición real:
 * distancias y áreas sobre el suelo, y alturas de objetos, a partir de la
 * altura conocida de la cámara. Trigonometría pura (ver src/lib/pano.js).
 */
export default function Pano360View({ imageURL, onClose }) {
  const mountRef = useRef(null)
  const stateRef = useRef({})
  const [camHeight, setCamHeight] = useState(1.6)
  const camHeightRef = useRef(1.6)
  const [mode, setMode] = useState('distance')
  const modeRef = useRef('distance')
  const [taps, setTaps] = useState([]) // { dir:{x,y,z}, fp?:puntoDeSuelo }
  const [closed, setClosed] = useState(false)
  const [message, setMessage] = useState(MODES[0].hint)

  useEffect(() => { camHeightRef.current = camHeight }, [camHeight])
  useEffect(() => {
    modeRef.current = mode
    setTaps([])
    setClosed(false)
    setMessage(MODES.find((m) => m.id === mode)?.hint ?? '')
  }, [mode])

  // Reproyecta al cambiar la altura de cámara.
  useEffect(() => {
    setTaps((prev) =>
      prev.map((t) => ({ ...t, fp: t.isTop ? undefined : floorPointFromDirection(t.dir, camHeight) ?? undefined }))
    )
  }, [camHeight])

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

    const markers = new THREE.Group()
    scene.add(markers)

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

      setTaps((prev) => {
        if (m === 'distance') {
          if (!fp) { setMessage('⚠️ Ese punto no está en el suelo. Apunta más abajo.'); return prev }
          return prev.length >= 2 ? [{ dir, fp }] : [...prev, { dir, fp }]
        }
        if (m === 'path') {
          if (!fp) { setMessage('⚠️ Ese punto no está en el suelo. Apunta más abajo.'); return prev }
          setClosed(false)
          return [...prev, { dir, fp }]
        }
        // height: primer toque = pie (suelo), segundo = tope (cualquier dirección)
        if (prev.length === 0 || prev.length >= 2) {
          if (!fp) { setMessage('⚠️ El PIE debe estar en el suelo. Toca la base del objeto.'); return prev }
          return [{ dir, fp }]
        }
        return [...prev, { dir, isTop: true }]
      })
    }
    renderer.domElement.addEventListener('pointerdown', onDown)
    renderer.domElement.addEventListener('pointerup', onUp)

    stateRef.current = { scene, camera, renderer, markers, controls, sphere }

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

  // Dibuja marcadores y calcula el resultado del modo activo.
  useEffect(() => {
    const { markers } = stateRef.current
    if (!markers) return
    markers.clear()

    const anchor = (dir) =>
      new THREE.Vector3(dir.x, dir.y, dir.z).normalize().multiplyScalar(48)
    const anchors = taps.map((t) => anchor(t.dir))

    anchors.forEach((a, i) => {
      const isTop = taps[i].isTop
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 16, 12),
        new THREE.MeshBasicMaterial({ color: isTop ? 0xf59e0b : 0x34d399 })
      )
      m.position.copy(a)
      markers.add(m)
    })
    if (anchors.length >= 2) {
      const pts = closed ? [...anchors, anchors[0]] : anchors
      markers.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: mode === 'height' ? 0xf59e0b : 0x34d399 })
      ))
    }

    // Mensajes de resultado.
    const floorPts = taps.filter((t) => t.fp).map((t) => t.fp)
    if (taps.length === 0) {
      setMessage(MODES.find((m) => m.id === mode)?.hint ?? '')
    } else if (mode === 'distance') {
      if (floorPts.length === 1) {
        setMessage(`📍 A ${floorPts[0].horizontal.toFixed(2)} m de la cámara. Toca el segundo punto.`)
      } else if (floorPts.length === 2) {
        setMessage(`📏 Distancia: ${floorDistance(floorPts[0], floorPts[1]).toFixed(2)} m`)
      }
    } else if (mode === 'path') {
      const per = floorPathLength(closed ? [...floorPts, floorPts[0]] : floorPts)
      if (closed && floorPts.length >= 3) {
        setMessage(`📐 Área: ${floorPolygonArea(floorPts).toFixed(2)} m² · perímetro ${per.toFixed(2)} m`)
      } else {
        setMessage(`📐 ${floorPts.length} puntos · recorrido ${per.toFixed(2)} m${floorPts.length >= 3 ? ' · pulsa "Cerrar figura" para el área' : ''}`)
      }
    } else if (mode === 'height') {
      if (taps.length === 1) {
        setMessage(`📍 Pie a ${floorPts[0].horizontal.toFixed(2)} m. Ahora toca la parte ALTA del objeto.`)
      } else if (taps.length === 2 && taps[1].isTop) {
        const hh = objectHeight(taps[0].fp, taps[1].dir, camHeight)
        setMessage(hh != null && hh > 0
          ? `📊 Altura del objeto: ${hh.toFixed(2)} m (pie a ${taps[0].fp.horizontal.toFixed(1)} m)`
          : '⚠️ No se pudo calcular. Toca el tope en la misma vertical del pie.')
      }
    }
  }, [taps, closed, mode, camHeight])

  return (
    <div className="pano360">
      <div ref={mountRef} className="pano360-canvas" />
      <div className="pano360-top">
        <div className="pano360-modes">
          {MODES.map((m) => (
            <button
              key={m.id}
              className={mode === m.id ? 'active' : ''}
              onClick={() => setMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
        <label>
          📷 Altura cámara
          <input
            type="number" min="0.3" max="5" step="0.1" value={camHeight}
            onChange={(e) => setCamHeight(parseFloat(e.target.value) || 1.6)}
          /> m
        </label>
        {mode === 'path' && taps.length >= 3 && !closed && (
          <button onClick={() => setClosed(true)}>⬛ Cerrar figura</button>
        )}
        <button onClick={() => { setTaps([]); setClosed(false); setMessage(MODES.find((m) => m.id === mode)?.hint ?? '') }}>
          🗑️ Borrar
        </button>
        <button onClick={onClose}>✕ Cerrar</button>
      </div>
      <div className="pano360-msg">{message}</div>
      <div className="pano360-hint">
        Suelo plano y altura de cámara bien medida = medidas fiables. Arrastra para mirar, rueda para zoom.
      </div>
    </div>
  )
}
