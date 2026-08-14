import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Rampa de color por elevación (de bajo a alto): azul → verde → amarillo → rojo.
function elevationColor(t) {
  const stops = [
    [0.0, [0.18, 0.35, 0.75]],
    [0.35, [0.2, 0.65, 0.35]],
    [0.7, [0.93, 0.79, 0.25]],
    [1.0, [0.85, 0.25, 0.2]],
  ]
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [t0, c0] = stops[i - 1]
      const [t1, c1] = stops[i]
      const k = (t - t0) / (t1 - t0)
      return c0.map((v, j) => v + (c1[j] - v) * k)
    }
  }
  return stops[stops.length - 1][1]
}

/**
 * Vista 3D del DSM como malla de alturas con controles de órbita.
 * Renderiza el georaster ya cargado (sin volver a leer el archivo), con
 * exageración vertical 1:1 y submuestreo a una malla manejable.
 */
export default function Dsm3DView({ georaster, onClose }) {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!georaster || !mountRef.current) return
    const mount = mountRef.current

    const { width: W, height: H, pixelWidth, pixelHeight, projection, values, noDataValue } = georaster
    const band = values[0]

    // Submuestreo: malla máxima ~256×256 para mantener 60 fps.
    const MAX = 256
    const step = Math.max(1, Math.ceil(Math.max(W, H) / MAX))
    const gw = Math.floor(W / step)
    const gh = Math.floor(H / step)

    // Tamaño de celda en metros (los DSM de ODM suelen ser UTM; si es
    // geográfico, aproximamos por latitud media — suficiente para visualizar).
    const isGeographic = projection === 4326 || projection === '4326'
    const midLat = isGeographic ? (georaster.ymin + georaster.ymax) / 2 : 0
    const cellW = isGeographic ? pixelWidth * 111320 * Math.cos((midLat * Math.PI) / 180) * step : pixelWidth * step
    const cellH = isGeographic ? pixelHeight * 110540 * step : pixelHeight * step

    // Rango de elevación (ignorando noData).
    let minZ = Infinity, maxZ = -Infinity
    for (let r = 0; r < H; r += step) {
      for (let c = 0; c < W; c += step) {
        const z = band[r][c]
        if (z == null || z === noDataValue || isNaN(z)) continue
        if (z < minZ) minZ = z
        if (z > maxZ) maxZ = z
      }
    }
    if (!isFinite(minZ)) { minZ = 0; maxZ = 1 }
    const range = Math.max(1e-6, maxZ - minZ)

    // Escena.
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0b0f12)
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 1e7)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Geometría de alturas con color por vértice.
    const geometry = new THREE.PlaneGeometry(gw * cellW, gh * cellH, gw - 1, gh - 1)
    const pos = geometry.attributes.position
    const colors = new Float32Array(pos.count * 3)
    for (let j = 0; j < gh; j++) {
      for (let i = 0; i < gw; i++) {
        const idx = j * gw + i
        const zRaw = band[Math.min(H - 1, j * step)][Math.min(W - 1, i * step)]
        const z = zRaw == null || zRaw === noDataValue || isNaN(zRaw) ? minZ : zRaw
        pos.setZ(idx, z - minZ)
        const [cr, cg, cb] = elevationColor((z - minZ) / range)
        colors[idx * 3] = cr
        colors[idx * 3 + 1] = cg
        colors[idx * 3 + 2] = cb
      }
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.computeVertexNormals()

    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide })
    )
    mesh.rotation.x = -Math.PI / 2
    scene.add(mesh)

    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const sun = new THREE.DirectionalLight(0xffffff, 1.1)
    sun.position.set(1, 2, 1).multiplyScalar(Math.max(gw * cellW, gh * cellH))
    scene.add(sun)

    const span = Math.max(gw * cellW, gh * cellH)
    camera.position.set(span * 0.6, span * 0.5, span * 0.6)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, range / 2, 0)

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
      controls.dispose()
      geometry.dispose()
      mesh.material.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [georaster])

  return (
    <div className="dsm3d">
      <div ref={mountRef} className="dsm3d-canvas" />
      <div className="dsm3d-bar">
        <span>🧊 Vista 3D del terreno (DSM) — arrastra para orbitar, rueda para zoom</span>
        <button onClick={onClose}>✕ Cerrar</button>
      </div>
    </div>
  )
}
