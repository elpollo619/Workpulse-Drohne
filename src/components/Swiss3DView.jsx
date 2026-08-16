import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { TilesRenderer } from '3d-tiles-renderer'
import { GLTFExtensionsPlugin } from '3d-tiles-renderer/plugins'
import { fetchSwissTerrainDSM } from '../lib/terrain.js'
import { lv95ToWGS84, wgs84ToLV95 } from '../lib/swiss.js'
import { fetchSwissimageBackground, lngLatToPixel } from '../lib/siteplan.js'

// 🏙️ Suiza 3D: todos los edificios oficiales de Suiza (swissBUILDINGS3D como
// 3D Tiles de swisstopo, CORS abierto) sobre el terreno oficial swissALTI3D
// texturizado con la ortofoto SWISSIMAGE — y medición 3D con dos toques.
// Sirve para "hacerse la idea" de una casa y su entorno ANTES de volar.

const TILESET = 'https://3d.geo.admin.ch/ch.swisstopo.swissbuildings3d.3d/v1/tileset.json'

// Los edificios usan alturas elipsoidales; swissALTI3D es ortométrico. La
// ondulación del geoide en Suiza es ~46–55 m; una constante media basta para
// visualizar (error local < 3 m repartido entre terreno y edificios).
const GEOID_CH = 49.6

const WGS84_A = 6378137
const WGS84_E2 = 6.69437999014e-3

function ecefFrom(latDeg, lngDeg, h) {
  const lat = (latDeg * Math.PI) / 180
  const lng = (lngDeg * Math.PI) / 180
  const N = WGS84_A / Math.sqrt(1 - WGS84_E2 * Math.sin(lat) ** 2)
  return new THREE.Vector3(
    (N + h) * Math.cos(lat) * Math.cos(lng),
    (N + h) * Math.cos(lat) * Math.sin(lng),
    (N * (1 - WGS84_E2) + h) * Math.sin(lat)
  )
}

export default function Swiss3DView({ center, onClose }) {
  const mountRef = useRef(null)
  const [msg, setMsg] = useState('🏙️ Cargando edificios y terreno oficiales…')
  const [measure, setMeasure] = useState(null) // { d3, dh, dz }

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || !center) return
    let disposed = false

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0b0f12)
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 1, 100000)
    camera.up.set(0, 0, 1) // marco ENU: z = arriba
    camera.position.set(250, -350, 260)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.maxPolarAngle = Math.PI * 0.495

    scene.add(new THREE.AmbientLight(0xffffff, 0.75))
    const sun = new THREE.DirectionalLight(0xffffff, 1.4)
    sun.position.set(-400, -600, 800)
    scene.add(sun)

    // --- marco local ENU en el centro pedido ---
    const [lng0, lat0] = center
    let alt0 = 550 // se afina con el terreno cuando llega

    const lat = (lat0 * Math.PI) / 180
    const lngR = (lng0 * Math.PI) / 180
    const east = new THREE.Vector3(-Math.sin(lngR), Math.cos(lngR), 0)
    const north = new THREE.Vector3(-Math.sin(lat) * Math.cos(lngR), -Math.sin(lat) * Math.sin(lngR), Math.cos(lat))
    const up = new THREE.Vector3(Math.cos(lat) * Math.cos(lngR), Math.cos(lat) * Math.sin(lngR), Math.sin(lat))

    // --- edificios oficiales (3D Tiles + Draco local) ---
    const tiles = new TilesRenderer(TILESET)
    const draco = new DRACOLoader()
    draco.setDecoderPath('./draco/')
    tiles.registerPlugin(new GLTFExtensionsPlugin({ dracoLoader: draco }))
    tiles.setCamera(camera)
    tiles.setResolutionFromRenderer(camera, renderer)
    tiles.errorTarget = 8
    scene.add(tiles.group)
    let tilesLoaded = false
    tiles.addEventListener('load-tile-set', () => {
      tilesLoaded = true
      setMsg((m) => (m?.includes('edificios') ? null : m))
    })

    const placeTiles = () => {
      const origin = ecefFrom(lat0, lng0, alt0 + GEOID_CH)
      const m = new THREE.Matrix4().makeBasis(east, north, up).setPosition(origin)
      tiles.group.matrix.copy(m.invert())
      tiles.group.matrixAutoUpdate = false
    }
    placeTiles()

    // --- terreno oficial texturizado con la ortofoto ---
    const SIZE = 0.006 // ~±460 m de vista
    const bounds = { west: lng0 - SIZE, east: lng0 + SIZE, south: lat0 - SIZE * 0.7, north: lat0 + SIZE * 0.7 }
    let terrainMesh = null
    ;(async () => {
      try {
        const [g, tex] = await Promise.all([
          fetchSwissTerrainDSM(bounds, () => {}),
          fetchSwissimageBackground(bounds, 18, 120).catch(() => null),
        ])
        if (disposed || !g) return
        // Altura de referencia = terreno en el centro (el marco ENU se recoloca).
        const { e: e0, n: n0 } = wgs84ToLV95(lng0, lat0)
        const cCol = Math.floor((e0 - g.xmin) / g.pixelWidth)
        const cRow = Math.floor((g.ymax - n0) / g.pixelHeight)
        const zC = g.values[0][Math.max(0, Math.min(g.height - 1, cRow))]?.[Math.max(0, Math.min(g.width - 1, cCol))]
        if (zC != null && zC !== g.noDataValue) {
          alt0 = zC
          placeTiles()
        }

        const step = Math.max(1, Math.ceil(Math.max(g.width, g.height) / 220))
        const gw = Math.floor(g.width / step)
        const gh = Math.floor(g.height / step)
        const pos = new Float32Array(gw * gh * 3)
        const uv = new Float32Array(gw * gh * 2)
        const texPx = tex ? { tl: { x: tex.originPx.x, y: tex.originPx.y }, w: tex.widthPx, h: tex.heightPx, z: tex.zoom } : null
        for (let j = 0; j < gh; j++) {
          for (let i = 0; i < gw; i++) {
            const r = j * step
            const c = i * step
            const x = g.xmin + (c + 0.5) * g.pixelWidth
            const y = g.ymax - (r + 0.5) * g.pixelHeight
            let z = g.values[0][r][c]
            if (z == null || z === g.noDataValue || Number.isNaN(z)) z = alt0
            const k = (j * gw + i) * 3
            pos[k] = x - e0
            pos[k + 1] = y - n0
            pos[k + 2] = z - alt0
            if (texPx) {
              const { lng, lat: la } = lv95ToWGS84(x, y)
              const p = lngLatToPixel(lng, la, texPx.z)
              uv[(j * gw + i) * 2] = (p.x - texPx.tl.x) / texPx.w
              uv[(j * gw + i) * 2 + 1] = 1 - (p.y - texPx.tl.y) / texPx.h
            }
          }
        }
        const idx = []
        for (let j = 0; j + 1 < gh; j++) {
          for (let i = 0; i + 1 < gw; i++) {
            const a = j * gw + i
            idx.push(a, a + 1, a + gw, a + 1, a + gw + 1, a + gw)
          }
        }
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
        if (texPx) geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
        geo.setIndex(idx)
        geo.computeVertexNormals()
        let mat
        if (tex) {
          const texture = new THREE.CanvasTexture(tex.canvas)
          texture.colorSpace = THREE.SRGBColorSpace
          mat = new THREE.MeshLambertMaterial({ map: texture })
        } else {
          mat = new THREE.MeshLambertMaterial({ color: 0x5b6f5d })
        }
        terrainMesh = new THREE.Mesh(geo, mat)
        scene.add(terrainMesh)
        setMsg(tilesLoaded ? null : '🏙️ Terreno listo; cargando edificios…')
        setTimeout(() => {
          if (!disposed && !tilesLoaded) {
            setMsg('⚠️ Edificios 3D no disponibles (¿sin conexión?) — mostrando solo el terreno.')
          }
        }, 15000)
      } catch (err) {
        if (!disposed) setMsg(`⚠️ ${err.message}`)
      }
    })()

    // --- medición 3D con dos toques ---
    const raycaster = new THREE.Raycaster()
    const measureGroup = new THREE.Group()
    scene.add(measureGroup)
    let firstPoint = null
    const markerGeo = new THREE.SphereGeometry(1.2, 16, 16)
    const markerMat = new THREE.MeshBasicMaterial({ color: 0x34d399 })

    function onClick(ev) {
      const rect = renderer.domElement.getBoundingClientRect()
      const ndc = new THREE.Vector2(
        ((ev.clientX - rect.left) / rect.width) * 2 - 1,
        -((ev.clientY - rect.top) / rect.height) * 2 + 1
      )
      raycaster.setFromCamera(ndc, camera)
      const targets = [tiles.group, terrainMesh].filter(Boolean)
      const hits = raycaster.intersectObjects(targets, true)
      const hit = hits.find((h) => !h.object.userData.isMeasure)
      if (!hit) return
      const p = hit.point.clone()
      const marker = new THREE.Mesh(markerGeo, markerMat)
      marker.position.copy(p)
      marker.userData.isMeasure = true
      measureGroup.add(marker)
      if (!firstPoint) {
        firstPoint = p
        setMeasure(null)
      } else {
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([firstPoint, p]),
          new THREE.LineBasicMaterial({ color: 0x34d399 })
        )
        line.userData.isMeasure = true
        measureGroup.add(line)
        const d = firstPoint.distanceTo(p)
        const dh = Math.hypot(p.x - firstPoint.x, p.y - firstPoint.y)
        setMeasure({ d3: d, dh, dz: Math.abs(p.z - firstPoint.z) })
        firstPoint = null
      }
    }
    renderer.domElement.addEventListener('click', onClick)

    function clearMeasure() {
      measureGroup.clear()
      firstPoint = null
      setMeasure(null)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') clearMeasure()
    }
    window.addEventListener('keydown', onKey)
    mount.clearMeasure = clearMeasure // acceso desde el botón

    // --- bucle ---
    let raf
    const loop = () => {
      raf = requestAnimationFrame(loop)
      controls.update()
      camera.updateMatrixWorld()
      tiles.update()
      renderer.render(scene, camera)
    }
    loop()

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
      renderer.domElement.removeEventListener('click', onClick)
      tiles.dispose()
      draco.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [center])

  return (
    <div className="dsm3d swiss3d">
      <div className="dsm3d-bar">
        <b>🏙️ Suiza 3D — edificios y terreno oficiales</b>
        <span className="swiss3d-info">
          {measure
            ? <>📏 {measure.d3.toFixed(2)} m · horizontal {measure.dh.toFixed(2)} m · Δh {measure.dz.toFixed(2)} m</>
            : 'Toca 2 puntos para medir (también sobre edificios) · Esc borra'}
        </span>
        <span>
          <button className="mini" onClick={() => mountRef.current?.clearMeasure?.()}>🗑️ borrar medición</button>{' '}
          <button className="mini" onClick={onClose}>✕ cerrar</button>
        </span>
      </div>
      {msg && <div className="swiss3d-msg">{msg}</div>}
      <div ref={mountRef} className="dsm3d-canvas" />
    </div>
  )
}
