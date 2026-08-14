import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { floorPointFromDirection, floorDistance } from '../lib/pano.js'

/**
 * Visor de fotos 360° (equirectangulares, p.ej. Insta360) con medición sobre
 * el suelo: con la altura de la cámara conocida, cada punto del suelo tocado
 * se convierte en distancia real por trigonometría, y dos puntos dan la
 * distancia entre ellos.
 */
export default function Pano360View({ imageURL, onClose }) {
  const mountRef = useRef(null)
  const stateRef = useRef({}) // three.js internals
  const [camHeight, setCamHeight] = useState(1.6)
  const camHeightRef = useRef(1.6)
  const [points, setPoints] = useState([]) // puntos de suelo {x,y,z,horizontal}
  const [message, setMessage] = useState('Toca un punto del SUELO para medir')

  useEffect(() => { camHeightRef.current = camHeight }, [camHeight])

  // Reproyecta los marcadores cuando cambia la altura de cámara.
  useEffect(() => {
    setPoints((prev) =>
      prev.map((p) => {
        const len = Math.hypot(p.dir.x, p.dir.y, p.dir.z)
        const d = { x: p.dir.x / len, y: p.dir.y / len, z: p.dir.z / len }
        const fp = floorPointFromDirection(d, camHeight)
        return fp ? { ...fp, dir: p.dir } : p
      })
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

    // Esfera con la foto por dentro.
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
    controls.rotateSpeed = -0.35 // arrastre natural en panorámicas

    // Zoom por FOV con la rueda / pellizco.
    const onWheel = (e) => {
      camera.fov = Math.min(100, Math.max(30, camera.fov + e.deltaY * 0.05))
      camera.updateProjectionMatrix()
    }
    renderer.domElement.addEventListener('wheel', onWheel)

    // Clic/toque: rayo -> dirección -> punto del suelo.
    const raycaster = new THREE.Raycaster()
    let downAt = null
    const onDown = (e) => { downAt = [e.clientX, e.clientY] }
    const onUp = (e) => {
      // Ignora arrastres (rotación de la vista).
      if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 6) return
      const rect = renderer.domElement.getBoundingClientRect()
      const ndc = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      )
      raycaster.setFromCamera(ndc, camera)
      const dir = raycaster.ray.direction.clone().normalize()
      const fp = floorPointFromDirection(dir, camHeightRef.current)
      if (!fp) {
        setMessage('⚠️ Ese punto no está en el suelo (o es demasiado rasante). Apunta más abajo.')
        return
      }
      setPoints((prev) => {
        const next = prev.length >= 2 ? [{ ...fp, dir }] : [...prev, { ...fp, dir }]
        return next
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

  // Redibuja los marcadores al cambiar los puntos.
  useEffect(() => {
    const { markers } = stateRef.current
    if (!markers) return
    markers.clear()
    const anchors = points.map((p) => {
      const len = Math.hypot(p.dir.x, p.dir.y, p.dir.z)
      return new THREE.Vector3(p.dir.x / len, p.dir.y / len, p.dir.z / len).multiplyScalar(48)
    })
    for (const a of anchors) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 16, 12),
        new THREE.MeshBasicMaterial({ color: 0x34d399 })
      )
      m.position.copy(a)
      markers.add(m)
    }
    if (anchors.length === 2) {
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(anchors),
        new THREE.LineBasicMaterial({ color: 0x34d399 })
      )
      markers.add(line)
    }

    if (points.length === 1) {
      setMessage(`📍 A ${points[0].horizontal.toFixed(2)} m de la cámara. Toca el segundo punto.`)
    } else if (points.length === 2) {
      const d = floorDistance(points[0], points[1])
      setMessage(`📏 Distancia entre puntos: ${d.toFixed(2)} m · (a ${points[0].horizontal.toFixed(1)} y ${points[1].horizontal.toFixed(1)} m de la cámara)`)
    }
  }, [points])

  return (
    <div className="pano360">
      <div ref={mountRef} className="pano360-canvas" />
      <div className="pano360-top">
        <label>
          📷 Altura de cámara
          <input
            type="number" min="0.3" max="5" step="0.1" value={camHeight}
            onChange={(e) => setCamHeight(parseFloat(e.target.value) || 1.6)}
          /> m
        </label>
        <button onClick={() => { setPoints([]); setMessage('Toca un punto del SUELO para medir') }}>
          🗑️ Borrar puntos
        </button>
        <button onClick={onClose}>✕ Cerrar</button>
      </div>
      <div className="pano360-msg">{message}</div>
      <div className="pano360-hint">
        Válido para puntos sobre el suelo plano. Arrastra para mirar, rueda para zoom.
      </div>
    </div>
  )
}
