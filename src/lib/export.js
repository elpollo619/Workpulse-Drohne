// Exportación de datos: GeoJSON (mediciones + puntos), CSV (puntos GPS, con
// LV95 dentro de Suiza) y lista de GCP en el formato de OpenDroneMap.

import { wgs84ToLV95, isInSwitzerland } from './swiss.js'

function download(filename, text, mime = 'text/plain') {
  const blob = new Blob([text], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/** Exporta el proyecto completo como FeatureCollection GeoJSON. */
export function exportGeoJSON(project) {
  const features = []

  for (const m of project.measurements) {
    if (m.type === 'distance') {
      features.push({
        type: 'Feature',
        geometry: { type: 'LineString', coordinates: m.coords },
        properties: { kind: 'distance', lengthM: m.result?.lengthM },
      })
    } else if (m.type === 'area') {
      features.push({
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [[...m.coords, m.coords[0]]] },
        properties: {
          kind: 'area',
          areaM2: m.result?.areaM2,
          perimeterM: m.result?.perimeterM,
        },
      })
    }
  }

  for (const p of project.points) {
    features.push({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [p.lng, p.lat, p.elev ?? 0] },
      properties: { kind: 'point', label: p.label, note: p.note },
    })
  }

  const fc = { type: 'FeatureCollection', features }
  download(`${slug(project.name)}.geojson`, JSON.stringify(fc, null, 2), 'application/geo+json')
}

/** Exporta los puntos GPS como CSV, con coordenadas LV95 para puntos en Suiza. */
export function exportPointsCSV(project) {
  const rows = [['label', 'lat', 'lng', 'lv95_e', 'lv95_n', 'elev_m', 'note']]
  for (const p of project.points) {
    let e = '', n = ''
    if (isInSwitzerland(p.lng, p.lat)) {
      const lv95 = wgs84ToLV95(p.lng, p.lat)
      e = lv95.e.toFixed(2)
      n = lv95.n.toFixed(2)
    }
    rows.push([p.label ?? '', p.lat, p.lng, e, n, p.elev ?? '', (p.note ?? '').replace(/[\n,]/g, ' ')])
  }
  const csv = rows.map((r) => r.join(',')).join('\n')
  download(`${slug(project.name)}-puntos.csv`, csv, 'text/csv')
}

/**
 * Exporta los GCP en el formato de lista de OpenDroneMap:
 *   <WKT/EPSG del sistema de coordenadas>
 *   geo_x geo_y geo_z  im_x im_y  nombre_imagen  [gcp_name]
 * Aquí generamos la parte de coordenadas de terreno; el emparejamiento con
 * píxeles de imagen se completa en WebODM. Ver docs/PRECISION-GCP.md.
 */
export function exportGCP(project, epsg = 'EPSG:4326') {
  const lines = [epsg]
  for (const g of project.gcps) {
    lines.push(`${g.lng} ${g.lat} ${g.elev ?? 0}   # ${g.name || 'GCP'}`)
  }
  download(`${slug(project.name)}-gcp_list.txt`, lines.join('\n'), 'text/plain')
}

const xmlEscape = (s) =>
  String(s ?? '').replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c])
  )

/**
 * Exporta el proyecto como GPX 1.1: puntos GPS como waypoints y distancias
 * como tracks. Compatible con GPS de mano, Garmin, apps de senderismo, QGIS.
 */
export function exportGPX(project) {
  const parts = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<gpx version="1.1" creator="Workpulse Drohne" xmlns="http://www.topografix.com/GPX/1/1">',
  ]
  for (const p of project.points) {
    parts.push(
      `  <wpt lat="${p.lat}" lon="${p.lng}">` +
        (p.elev != null ? `<ele>${p.elev}</ele>` : '') +
        `<name>${xmlEscape(p.label)}</name></wpt>`
    )
  }
  for (const m of project.measurements) {
    if (m.type !== 'distance') continue
    parts.push('  <trk><name>Distancia</name><trkseg>')
    for (const [lng, lat] of m.coords) {
      parts.push(`    <trkpt lat="${lat}" lon="${lng}"></trkpt>`)
    }
    parts.push('  </trkseg></trk>')
  }
  parts.push('</gpx>')
  download(`${slug(project.name)}.gpx`, parts.join('\n'), 'application/gpx+xml')
}

/**
 * Exporta el proyecto como KML (Google Earth): puntos, líneas y polígonos con
 * sus valores medidos en la descripción.
 */
export function exportKML(project) {
  const coordStr = (coords) => coords.map(([lng, lat]) => `${lng},${lat},0`).join(' ')
  const parts = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<kml xmlns="http://www.opengis.net/kml/2.2"><Document>',
    `  <name>${xmlEscape(project.name)}</name>`,
  ]
  for (const p of project.points) {
    parts.push(
      `  <Placemark><name>${xmlEscape(p.label)}</name>` +
        (p.elev != null ? `<description>${p.elev.toFixed(2)} m s.n.m.</description>` : '') +
        `<Point><coordinates>${p.lng},${p.lat},${p.elev ?? 0}</coordinates></Point></Placemark>`
    )
  }
  for (const m of project.measurements) {
    if (m.type === 'distance') {
      parts.push(
        `  <Placemark><name>Distancia ${m.result?.lengthM?.toFixed(1)} m</name>` +
          `<LineString><coordinates>${coordStr(m.coords)}</coordinates></LineString></Placemark>`
      )
    } else if (m.type === 'area' || m.type === 'volume') {
      const desc = m.type === 'area'
        ? `${m.result?.areaM2?.toFixed(1)} m²`
        : `${m.result?.fillM3?.toFixed(1)} m³`
      parts.push(
        `  <Placemark><name>${m.type === 'area' ? 'Área' : 'Volumen'} ${desc}</name>` +
          `<Polygon><outerBoundaryIs><LinearRing><coordinates>${coordStr([...m.coords, m.coords[0]])}</coordinates></LinearRing></outerBoundaryIs></Polygon></Placemark>`
      )
    }
  }
  parts.push('</Document></kml>')
  download(`${slug(project.name)}.kml`, parts.join('\n'), 'application/vnd.google-earth.kml+xml')
}

function slug(s) {
  return (s || 'proyecto')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
