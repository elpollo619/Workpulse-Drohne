import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import GeoRasterLayer from 'georaster-layer-for-leaflet'
import { loadGeoRaster, computeVolume } from '../lib/raster.js'
import { lineLengthMeters, polygonMetrics } from '../lib/measure.js'
import { SWISS_LAYERS, BERN_CENTER, wgs84ToLV95, isInSwitzerland } from '../lib/swiss.js'

// Arregla las rutas de los iconos por defecto de Leaflet bajo Vite.
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
})

/**
 * Mapa interactivo. Expone métodos imperativos vía ref y notifica resultados
 * de medición al padre mediante callbacks.
 */
const MapView = forwardRef(function MapView(
  { tool, baseMode, onMeasurement, onPoint, onVolume, onStatus },
  ref
) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const orthoRef = useRef(null)
  const dsmRef = useRef(null) // georaster crudo del DSM para el cálculo de volumen
  const toolRef = useRef(tool)
  const baseModeRef = useRef(baseMode)

  useEffect(() => { toolRef.current = tool }, [tool])
  useEffect(() => { baseModeRef.current = baseMode }, [baseMode])

  // Inicialización única del mapa.
  useEffect(() => {
    const map = L.map(containerRef.current, { center: BERN_CENTER, zoom: 14 })
    mapRef.current = map

    // Capas base: ortofoto oficial suiza (SWISSIMAGE) por defecto — ideal para
    // Berna/Suiza —, mapa nacional swisstopo y OpenStreetMap como alternativas.
    const swissimage = L.tileLayer(SWISS_LAYERS.swissimage.url, {
      maxZoom: 22,
      maxNativeZoom: SWISS_LAYERS.swissimage.maxNativeZoom,
      attribution: SWISS_LAYERS.swissimage.attribution,
    }).addTo(map)
    const pixelkarte = L.tileLayer(SWISS_LAYERS.pixelkarte.url, {
      maxZoom: 22,
      maxNativeZoom: SWISS_LAYERS.pixelkarte.maxNativeZoom,
      attribution: SWISS_LAYERS.pixelkarte.attribution,
    })
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 22,
      maxNativeZoom: 19,
      attribution: '© OpenStreetMap',
    })
    L.control.layers(
      {
        [SWISS_LAYERS.swissimage.name]: swissimage,
        [SWISS_LAYERS.pixelkarte.name]: pixelkarte,
        OpenStreetMap: osm,
      },
      {},
      { position: 'topright' }
    ).addTo(map)

    // Lectura de coordenadas en vivo: LV95 (oficial suizo) + WGS84.
    const coordsCtl = L.control({ position: 'bottomright' })
    coordsCtl.onAdd = () => {
      const div = L.DomUtil.create('div', 'coords-readout')
      div.textContent = '—'
      return div
    }
    coordsCtl.addTo(map)
    map.on('mousemove', (e) => {
      const { lng, lat } = e.latlng
      const el = document.querySelector('.coords-readout')
      if (!el) return
      if (isInSwitzerland(lng, lat)) {
        const { e: east, n: north } = wgs84ToLV95(lng, lat)
        el.textContent = `LV95 ${east.toFixed(1)} / ${north.toFixed(1)} · ${lat.toFixed(5)}, ${lng.toFixed(5)}`
      } else {
        el.textContent = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
      }
    })

    // Controles de dibujo de Geoman (los activamos programáticamente por herramienta).
    map.pm.setGlobalOptions({ snappable: true, snapDistance: 15 })

    // Al crear una geometría, calculamos la medida correspondiente.
    map.on('pm:create', async (e) => {
      const layer = e.layer
      const active = toolRef.current

      if (active === 'distance') {
        const coords = layer.getLatLngs().map((p) => [p.lng, p.lat])
        const meters = lineLengthMeters(coords)
        onMeasurement?.({ type: 'distance', coords, result: { lengthM: meters }, layer })
      } else if (active === 'area') {
        const latlngs = layer.getLatLngs()[0]
        const ring = latlngs.map((p) => [p.lng, p.lat])
        const metrics = polygonMetrics(ring)
        onMeasurement?.({ type: 'area', coords: ring, result: metrics, layer })
      } else if (active === 'volume') {
        const latlngs = layer.getLatLngs()[0]
        const ring = latlngs.map((p) => [p.lng, p.lat])
        if (!dsmRef.current) {
          onStatus?.('⚠️ Carga primero un DSM (modelo de elevación) para medir volumen.')
          map.removeLayer(layer)
          return
        }
        onStatus?.('Calculando volumen…')
        const vol = computeVolume(dsmRef.current, ring, { baseMode: baseModeRef.current })
        onVolume?.({ ring, result: vol, layer })
        onStatus?.(null)
      } else if (active === 'point') {
        const { lng, lat } = layer.getLatLng()
        onPoint?.({ lng, lat })
        map.removeLayer(layer) // el marcador lo gestiona el proyecto
      }
    })

    return () => { map.remove() }
  }, [])

  // Activa la herramienta de dibujo correspondiente.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.pm.disableDraw()
    if (tool === 'distance') map.pm.enableDraw('Line')
    else if (tool === 'area' || tool === 'volume') map.pm.enableDraw('Polygon')
    else if (tool === 'point') map.pm.enableDraw('Marker', { markerStyle: { icon: DefaultIcon } })
  }, [tool])

  useImperativeHandle(ref, () => ({
    async loadOrtho(buffer) {
      onStatus?.('Cargando ortomosaico…')
      const georaster = await loadGeoRaster(buffer)
      if (orthoRef.current) mapRef.current.removeLayer(orthoRef.current)
      const layer = new GeoRasterLayer({ georaster, opacity: 1, resolution: 256 })
      layer.addTo(mapRef.current)
      orthoRef.current = layer
      mapRef.current.fitBounds(layer.getBounds())
      onStatus?.(null)
    },
    async loadDSM(buffer) {
      onStatus?.('Cargando DSM…')
      const georaster = await loadGeoRaster(buffer)
      dsmRef.current = georaster
      onStatus?.(`DSM cargado (${georaster.width}×${georaster.height} px). Ya puedes medir volumen.`)
    },
    addPointMarker(p) {
      const marker = L.marker([p.lat, p.lng], { icon: DefaultIcon }).addTo(mapRef.current)
      marker.bindPopup(`<b>${p.label || 'Punto'}</b><br>${p.lat.toFixed(6)}, ${p.lng.toFixed(6)}`)
      return marker
    },
    fitToOrtho() {
      if (orthoRef.current) mapRef.current.fitBounds(orthoRef.current.getBounds())
    },
    setOrthoOpacity(v) {
      if (orthoRef.current) orthoRef.current.setOpacity(v)
    },
  }))

  return <div ref={containerRef} className="map" />
})

export default MapView
