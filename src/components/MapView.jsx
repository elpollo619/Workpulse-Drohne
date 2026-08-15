import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import GeoRasterLayer from 'georaster-layer-for-leaflet'
import { loadGeoRaster, buildDiffGrid } from '../lib/raster.js'
import { fmtDistance, fmtArea, fmtVolume } from '../lib/measure.js'
import { SWISS_LAYERS, SWISS_OVERLAYS, BERN_CENTER, wgs84ToLV95, isInSwitzerland } from '../lib/swiss.js'

// Arregla las rutas de los iconos por defecto de Leaflet bajo Vite.
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
})

const STYLE = {
  distance: { color: '#34d399', weight: 3 },
  area: { color: '#60a5fa', weight: 2, fillOpacity: 0.15 },
  volume: { color: '#f59e0b', weight: 2, fillOpacity: 0.15 },
}

/**
 * Mapa interactivo. El dibujo del usuario se entrega crudo a App vía callbacks
 * (onDraw); las geometrías persistidas del proyecto se redibujan de forma
 * declarativa con syncProject(). Así el mapa siempre refleja el estado guardado
 * (recargas, cambio de proyecto, borrados).
 */
const MapView = forwardRef(function MapView({ tool, onDraw, onStatus }, ref) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const orthoRef = useRef(null)
  const dsmRef = useRef(null) // georaster crudo del DSM
  const dsmPrevRef = useRef(null) // DSM del vuelo anterior (comparación)
  const heatmapRef = useRef(null) // overlay del mapa de calor de cambios
  const solarLayerRef = useRef(null) // techo del informe solar
  const coverageLayerRef = useRef(null) // fotos del vuelo (cobertura)
  const projectLayerRef = useRef(null) // FeatureGroup con la geometría del proyecto
  const planLayerRef = useRef(null) // FeatureGroup con la rejilla del plan de vuelo
  const toolRef = useRef(tool)

  useEffect(() => { toolRef.current = tool }, [tool])

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
    // Overlays oficiales opcionales: catastro (parcelas) y sombreado de relieve.
    const overlays = {}
    for (const key of Object.keys(SWISS_OVERLAYS)) {
      const o = SWISS_OVERLAYS[key]
      overlays[o.name] = L.tileLayer(o.url, {
        maxZoom: 22,
        maxNativeZoom: o.maxNativeZoom,
        attribution: o.attribution,
        opacity: o.opacity,
      })
    }

    L.control.layers(
      {
        [SWISS_LAYERS.swissimage.name]: swissimage,
        [SWISS_LAYERS.pixelkarte.name]: pixelkarte,
        OpenStreetMap: osm,
      },
      overlays,
      { position: 'topright' }
    ).addTo(map)

    // Botón de geolocalización: centra el mapa en la posición GPS del
    // dispositivo (útil en campo, junto al drone).
    const locateCtl = L.control({ position: 'topleft' })
    let locateMarker = null
    locateCtl.onAdd = () => {
      const btn = L.DomUtil.create('a', 'locate-btn leaflet-bar')
      btn.href = '#'
      btn.title = 'Mi ubicación (GPS)'
      btn.textContent = '🎯'
      L.DomEvent.on(btn, 'click', (ev) => {
        L.DomEvent.preventDefault(ev)
        if (!navigator.geolocation) {
          onStatus?.('Este dispositivo no ofrece geolocalización.')
          return
        }
        onStatus?.('Obteniendo tu posición GPS…')
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude, accuracy } = pos.coords
            if (locateMarker) map.removeLayer(locateMarker)
            locateMarker = L.layerGroup([
              L.circle([latitude, longitude], { radius: accuracy, weight: 1, color: '#34d399', fillOpacity: 0.1 }),
              L.circleMarker([latitude, longitude], { radius: 6, color: '#fff', weight: 2, fillColor: '#34d399', fillOpacity: 1 }),
            ]).addTo(map)
            map.flyTo([latitude, longitude], Math.max(map.getZoom(), 17))
            onStatus?.(`Posición encontrada (±${Math.round(accuracy)} m)`)
          },
          (err) => onStatus?.(`No se pudo obtener la posición: ${err.message}`),
          { enableHighAccuracy: true, timeout: 12000 }
        )
      })
      return btn
    }
    locateCtl.addTo(map)

    projectLayerRef.current = L.featureGroup().addTo(map)
    planLayerRef.current = L.featureGroup().addTo(map)

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

    map.pm.setGlobalOptions({ snappable: true, snapDistance: 15 })

    // El dibujo recién creado se elimina y se entrega crudo: App lo procesa,
    // lo guarda en el proyecto y syncProject() lo redibuja con estilo/popup.
    map.on('pm:create', (e) => {
      const layer = e.layer
      const active = toolRef.current
      map.removeLayer(layer)

      if (active === 'distance') {
        const coords = layer.getLatLngs().map((p) => [p.lng, p.lat])
        onDraw?.({ tool: 'distance', coords })
      } else if (active === 'area' || active === 'volume' || active === 'plan') {
        const ring = layer.getLatLngs()[0].map((p) => [p.lng, p.lat])
        onDraw?.({ tool: active, coords: ring })
      } else if (active === 'point' || active === 'solar' || active === 'intel' || active === 'orbit') {
        const { lng, lat } = layer.getLatLng()
        onDraw?.({ tool: active, coords: [lng, lat] })
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
    else if (tool === 'area' || tool === 'volume' || tool === 'plan') map.pm.enableDraw('Polygon')
    else if (tool === 'point' || tool === 'solar' || tool === 'intel' || tool === 'orbit') map.pm.enableDraw('Marker', { markerStyle: { icon: DefaultIcon } })
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
      onStatus?.(`DSM cargado (${georaster.width}×${georaster.height} px). Ya puedes medir volumen y abrir la vista 3D.`)
    },
    async loadDSMPrev(buffer) {
      onStatus?.('Cargando DSM del vuelo anterior…')
      const georaster = await loadGeoRaster(buffer)
      dsmPrevRef.current = georaster
      onStatus?.('DSM anterior cargado. Usa el modo de volumen "Vuelo anterior" para comparar.')
    },
    getDSM() {
      return dsmRef.current
    },
    getDSMPrev() {
      return dsmPrevRef.current
    },
    /** Usa un georaster ya construido (p.ej. terreno oficial) como DSM. */
    setDSMObject(georaster) {
      dsmRef.current = georaster
    },
    /** Ídem como DSM del vuelo anterior (base de comparación). */
    setDSMPrevObject(georaster) {
      dsmPrevRef.current = georaster
    },
    /** Rectángulo visible actual en WGS84. */
    getBounds() {
      const b = mapRef.current?.getBounds()
      if (!b) return null
      return { west: b.getWest(), south: b.getSouth(), east: b.getEast(), north: b.getNorth() }
    },
    /**
     * Pinta (o quita) el mapa de calor de cambios entre el DSM actual y el
     * anterior: rojo = material añadido, azul = retirado.
     * @returns {null|{minDz:number, maxDz:number}} estadísticas, o null si se quitó
     */
    toggleDiffHeatmap() {
      const map = mapRef.current
      if (heatmapRef.current) {
        map.removeLayer(heatmapRef.current)
        heatmapRef.current = null
        return null
      }
      if (!dsmRef.current || !dsmPrevRef.current) return undefined
      const g = buildDiffGrid(dsmRef.current, dsmPrevRef.current)
      const canvas = document.createElement('canvas')
      canvas.width = g.gw
      canvas.height = g.gh
      canvas.getContext('2d').putImageData(new ImageData(g.rgba, g.gw, g.gh), 0, 0)
      heatmapRef.current = L.imageOverlay(canvas.toDataURL(), g.bounds, {
        opacity: 0.85,
        interactive: false,
      }).addTo(map)
      map.fitBounds(g.bounds)
      return { minDz: g.minDz, maxDz: g.maxDz }
    },
    /** Redibuja todas las mediciones y puntos del proyecto. */
    syncProject(project) {
      const group = projectLayerRef.current
      if (!group) return
      group.clearLayers()

      for (const m of project.measurements) {
        if (m.type === 'distance') {
          const latlngs = m.coords.map(([lng, lat]) => [lat, lng])
          const short = fmtDistance(m.result?.lengthM)
          L.polyline(latlngs, STYLE.distance)
            .bindPopup(`📏 ${short}`)
            .bindTooltip(short, { permanent: true, direction: 'center', className: 'measure-label' })
            .addTo(group)
        } else if (m.type === 'area' || m.type === 'volume') {
          const latlngs = m.coords.map(([lng, lat]) => [lat, lng])
          const style = STYLE[m.type]
          const isDiff = m.result?.baseModeUsed === 'diff'
          const short = m.type === 'area'
            ? fmtArea(m.result?.areaM2)
            : isDiff
              ? `Δ ${fmtVolume(m.result?.volumeM3)}`
              : fmtVolume(m.result?.fillM3)
          const label = m.type === 'area'
            ? `⬛ ${short}`
            : isDiff
              ? `⏮️ Diferencia entre vuelos: ${fmtVolume(m.result?.volumeM3)} (＋${fmtVolume(m.result?.fillM3)} / −${fmtVolume(m.result?.cutM3)})`
              : `⛰️ ${fmtVolume(m.result?.volumeM3)} (relleno ${fmtVolume(m.result?.fillM3)})`
          L.polygon(latlngs, style)
            .bindPopup(label)
            .bindTooltip(short, { permanent: true, direction: 'center', className: 'measure-label' })
            .addTo(group)
        }
      }

      for (const p of project.points) {
        const lv95 = isInSwitzerland(p.lng, p.lat) ? wgs84ToLV95(p.lng, p.lat) : null
        const coordTxt = lv95
          ? `LV95 ${lv95.e.toFixed(1)} / ${lv95.n.toFixed(1)}`
          : `${p.lat.toFixed(6)}, ${p.lng.toFixed(6)}`
        L.marker([p.lat, p.lng], { icon: DefaultIcon })
          .bindPopup(`<b>${p.label || 'Punto'}</b><br>${coordTxt}${p.elev != null ? `<br>${p.elev.toFixed(2)} m s.n.m.` : ''}`)
          .addTo(group)
      }
    },
    fitToOrtho() {
      if (orthoRef.current) mapRef.current.fitBounds(orthoRef.current.getBounds())
    },
    flyTo(lat, lng, zoom = 17) {
      mapRef.current?.flyTo([lat, lng], zoom)
    },
    getCenter() {
      const c = mapRef.current?.getCenter()
      return c ? { lat: c.lat, lng: c.lng } : null
    },
    /** Deshace el último vértice del dibujo en curso. */
    undoVertex() {
      const map = mapRef.current
      if (!map) return
      for (const shape of ['Polygon', 'Line']) {
        const draw = map.pm.Draw?.[shape]
        if (draw?._enabled) {
          try { draw._removeLastVertex() } catch { /* sin vértices aún */ }
          return
        }
      }
    },
    /** Cancela el dibujo en curso y lo reinicia desde cero. */
    cancelDraw(tool) {
      const map = mapRef.current
      if (!map) return
      map.pm.disableDraw()
      if (tool === 'distance') map.pm.enableDraw('Line')
      else if (tool === 'area' || tool === 'volume' || tool === 'plan') map.pm.enableDraw('Polygon')
    },
    /** Termina el dibujo en curso con los vértices ya puestos. */
    finishDraw() {
      const map = mapRef.current
      if (!map) return
      for (const shape of ['Polygon', 'Line']) {
        const draw = map.pm.Draw?.[shape]
        if (draw?._enabled) {
          try { draw._finishShape() } catch { /* faltan vértices */ }
          return
        }
      }
    },
    /** Dibuja la serpentina del plan de vuelo con sus puntos de foto. */
    drawFlightPlan(ring, waypoints) {
      const group = planLayerRef.current
      if (!group) return
      group.clearLayers()
      L.polygon(ring.map(([lng, lat]) => [lat, lng]), {
        color: '#a78bfa', weight: 2, dashArray: '6 4', fillOpacity: 0.05,
      }).addTo(group)
      L.polyline(waypoints.map(([lng, lat]) => [lat, lng]), {
        color: '#a78bfa', weight: 2.5,
      }).addTo(group)
      for (const [lng, lat] of waypoints) {
        L.circleMarker([lat, lng], {
          radius: 3, color: '#a78bfa', fillColor: '#c4b5fd', fillOpacity: 1, weight: 1,
        }).addTo(group)
      }
    },
    clearFlightPlan() {
      planLayerRef.current?.clearLayers()
    },
    /** Dibuja la misión de órbita: círculo alrededor del edificio y puntos de
     *  foto coloreados por nivel de altura. */
    drawOrbit(center, radius, waypoints) {
      const group = planLayerRef.current
      if (!group) return
      group.clearLayers()
      const LEVEL_COLORS = ['#fbbf24', '#fb923c', '#f87171']
      L.circle([center[1], center[0]], {
        radius, color: '#fbbf24', weight: 2, dashArray: '6 4', fillOpacity: 0.04,
      }).addTo(group)
      L.circleMarker([center[1], center[0]], {
        radius: 5, color: '#fbbf24', fillColor: '#fde68a', fillOpacity: 1, weight: 2,
      }).bindTooltip('🏠 centro', { direction: 'top' }).addTo(group)
      for (const wp of waypoints) {
        L.circleMarker([wp.lat, wp.lng], {
          radius: 3,
          color: LEVEL_COLORS[wp.level ?? 0],
          fillColor: LEVEL_COLORS[wp.level ?? 0],
          fillOpacity: 0.9,
          weight: 1,
        }).addTo(group)
      }
    },
    /** Dibuja el techo consultado con su informe solar en un popup. */
    drawSolarRoof(rings, html) {
      const map = mapRef.current
      if (!map || !rings?.length) return
      if (solarLayerRef.current) map.removeLayer(solarLayerRef.current)
      const poly = L.polygon(rings, { color: '#fbbf24', weight: 3, fillOpacity: 0.25 })
      solarLayerRef.current = poly.addTo(map)
      poly.bindPopup(html, { maxWidth: 260 }).openPopup()
    },
    /**
     * Pinta las posiciones de las fotos del vuelo (verificación de cobertura):
     * puntos, trayectoria y huella aproximada de cada disparo.
     */
    showFlightPhotos(metas, footprintRadiusFor) {
      const map = mapRef.current
      if (!map) return
      if (coverageLayerRef.current) map.removeLayer(coverageLayerRef.current)
      const group = L.featureGroup()
      const path = []
      for (const m of metas) {
        path.push([m.lat, m.lng])
        const r = footprintRadiusFor(m)
        L.circle([m.lat, m.lng], {
          radius: r, color: '#22d3ee', weight: 1, fillColor: '#22d3ee', fillOpacity: 0.12,
        }).addTo(group)
        L.circleMarker([m.lat, m.lng], {
          radius: 3.5, color: '#fff', weight: 1, fillColor: '#22d3ee', fillOpacity: 1,
        }).bindPopup(`📷 ${m.name}<br>${m.lat.toFixed(6)}, ${m.lng.toFixed(6)}${m.altAGL != null ? `<br>altura ${m.altAGL.toFixed(0)} m AGL` : ''}`)
          .addTo(group)
      }
      if (path.length >= 2) {
        L.polyline(path, { color: '#22d3ee', weight: 1.5, dashArray: '4 4' }).addTo(group)
      }
      coverageLayerRef.current = group.addTo(map)
      if (path.length) map.fitBounds(group.getBounds().pad(0.15))
    },
    clearFlightPhotos() {
      if (coverageLayerRef.current) {
        mapRef.current?.removeLayer(coverageLayerRef.current)
        coverageLayerRef.current = null
      }
    },
    setOrthoOpacity(v) {
      if (orthoRef.current) orthoRef.current.setOpacity(v)
    },
  }))

  return <div ref={containerRef} className="map" />
})

export default MapView
