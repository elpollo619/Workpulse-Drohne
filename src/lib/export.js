// Exportación de datos: GeoJSON (mediciones + puntos), CSV (puntos GPS) y
// lista de GCP en el formato de OpenDroneMap.

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

/** Exporta los puntos GPS como CSV. */
export function exportPointsCSV(project) {
  const rows = [['label', 'lat', 'lng', 'elev_m', 'note']]
  for (const p of project.points) {
    rows.push([p.label ?? '', p.lat, p.lng, p.elev ?? '', (p.note ?? '').replace(/[\n,]/g, ' ')])
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

function slug(s) {
  return (s || 'proyecto')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
