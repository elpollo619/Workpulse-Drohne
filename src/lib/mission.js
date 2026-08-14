// Planificador de misiones de mapeo para DJI Mini 4 Pro.
//
// A partir de un polígono dibujado en el mapa genera una rejilla "cortacésped"
// con los solapes correctos para fotogrametría, y la exporta como misión
// waypoint KMZ en formato DJI WPML — el mismo que usa DJI Fly.
//
// Instalación en el mando (DJI RC 2): crear una misión cualquiera en DJI Fly,
// conectar el mando por USB, y reemplazar su archivo KMZ en
// /Android/data/dji.go.v5/files/waypoint/<uuid>/<uuid>.kmz por el generado
// (manteniendo el nombre). Ver docs/PLAN-DE-VUELO.md.
//
// Nota: droneEnumValue=68/subEnumValue=0 es el valor que la comunidad ha
// verificado que DJI Fly acepta para drones de consumo (Litchi Utilities,
// foros MavicPilots); DJI no documenta oficialmente valores para el Mini 4 Pro.

import { zipSync, strToU8 } from 'fflate'

// Óptica del DJI Mini 4 Pro (sensor 1/1.3", 24 mm equivalentes).
export const MINI4PRO = {
  sensorWidthMM: 9.8,
  sensorHeightMM: 7.3,
  focalMM: 6.7,
  imageWidthPX: 4032, // modo 12 MP (por defecto)
  imageHeightPX: 3024,
}

const METERS_PER_DEG_LAT = 110540
const metersPerDegLon = (lat) => 111320 * Math.cos((lat * Math.PI) / 180)

/**
 * Calcula la rejilla de vuelo dentro de un polígono.
 *
 * @param {Array<[lng,lat]>} ring        polígono en WGS84
 * @param {object} opts
 * @param {number} opts.altitude         altura de vuelo AGL en m (def. 70)
 * @param {number} opts.frontOverlap     solape frontal 0-1 (def. 0.8)
 * @param {number} opts.sideOverlap      solape lateral 0-1 (def. 0.7)
 * @param {number} opts.speed            velocidad m/s (def. 5)
 * @returns {{ waypoints:Array<{lng,lat}>, lines:number, photoCount:number,
 *            gsdCM:number, distanceM:number, durationMin:number,
 *            lineSpacingM:number, photoSpacingM:number, tooMany:boolean }}
 */
export function planGrid(ring, opts = {}) {
  const { altitude = 70, frontOverlap = 0.8, sideOverlap = 0.7, speed = 5 } = opts
  const cam = MINI4PRO

  // Huella de una foto en el suelo, en metros.
  const footprintW = (cam.sensorWidthMM / 1000) * altitude / (cam.focalMM / 1000)
  const footprintH = (cam.sensorHeightMM / 1000) * altitude / (cam.focalMM / 1000)
  const lineSpacing = footprintW * (1 - sideOverlap)
  const photoSpacing = footprintH * (1 - frontOverlap)
  const gsdCM = ((cam.sensorWidthMM * altitude * 1000) / (cam.focalMM * cam.imageWidthPX)) / 10

  // Proyección local equirectangular (suficiente para zonas de mapeo pequeñas).
  const lat0 = ring.reduce((s, p) => s + p[1], 0) / ring.length
  const lng0 = ring.reduce((s, p) => s + p[0], 0) / ring.length
  const kx = metersPerDegLon(lat0)
  const toXY = ([lng, lat]) => [(lng - lng0) * kx, (lat - lat0) * METERS_PER_DEG_LAT]
  const toLngLat = ([x, y]) => [lng0 + x / kx, lat0 + y / METERS_PER_DEG_LAT]

  const pts = ring.map(toXY)
  const ys = pts.map((p) => p[1])
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  // Escaneo: líneas este-oeste separadas lineSpacing, recortadas al polígono.
  const rows = []
  for (let y = minY + lineSpacing / 2; y <= maxY; y += lineSpacing) {
    const xs = []
    for (let i = 0; i < pts.length; i++) {
      const [x1, y1] = pts[i]
      const [x2, y2] = pts[(i + 1) % pts.length]
      if ((y1 <= y && y2 > y) || (y2 <= y && y1 > y)) {
        xs.push(x1 + ((y - y1) * (x2 - x1)) / (y2 - y1))
      }
    }
    xs.sort((a, b) => a - b)
    for (let k = 0; k + 1 < xs.length; k += 2) {
      // Margen de media huella para cubrir el borde del polígono.
      rows.push({ y, x1: xs[k] - photoSpacing / 2, x2: xs[k + 1] + photoSpacing / 2 })
    }
  }

  // Serpentina: fotos equiespaciadas a lo largo de cada línea, alternando sentido.
  const waypoints = []
  let distance = 0
  rows.forEach((row, i) => {
    const len = row.x2 - row.x1
    const n = Math.max(2, Math.ceil(len / photoSpacing) + 1)
    const xsRow = Array.from({ length: n }, (_, j) => row.x1 + (j * len) / (n - 1))
    if (i % 2 === 1) xsRow.reverse()
    for (const x of xsRow) waypoints.push(toLngLat([x, row.y]))
    distance += len
    if (i > 0) distance += lineSpacing
  })

  const durationMin = (distance / speed + rows.length * 4 + 90) / 60

  return {
    waypoints,
    lines: rows.length,
    photoCount: waypoints.length,
    gsdCM,
    distanceM: distance,
    durationMin,
    lineSpacingM: lineSpacing,
    photoSpacingM: photoSpacing,
    tooMany: waypoints.length > 180, // límite práctico de waypoints en DJI Fly
  }
}

const wpXML = (wp, i, altitude, speed, isFirst) => `    <Placemark>
      <Point><coordinates>${wp[0].toFixed(8)},${wp[1].toFixed(8)}</coordinates></Point>
      <wpml:index>${i}</wpml:index>
      <wpml:executeHeight>${altitude}</wpml:executeHeight>
      <wpml:waypointSpeed>${speed}</wpml:waypointSpeed>
      <wpml:waypointHeadingParam>
        <wpml:waypointHeadingMode>followWayline</wpml:waypointHeadingMode>
      </wpml:waypointHeadingParam>
      <wpml:waypointTurnParam>
        <wpml:waypointTurnMode>toPointAndStopWithDiscontinuityCurvature</wpml:waypointTurnMode>
        <wpml:waypointTurnDampingDist>0</wpml:waypointTurnDampingDist>
      </wpml:waypointTurnParam>
      <wpml:useStraightLine>1</wpml:useStraightLine>
${isFirst ? `      <wpml:actionGroup>
        <wpml:actionGroupId>100</wpml:actionGroupId>
        <wpml:actionGroupStartIndex>0</wpml:actionGroupStartIndex>
        <wpml:actionGroupEndIndex>0</wpml:actionGroupEndIndex>
        <wpml:actionGroupMode>sequence</wpml:actionGroupMode>
        <wpml:actionTrigger><wpml:actionTriggerType>reachPoint</wpml:actionTriggerType></wpml:actionTrigger>
        <wpml:action>
          <wpml:actionId>100</wpml:actionId>
          <wpml:actionActuatorFunc>gimbalRotate</wpml:actionActuatorFunc>
          <wpml:actionActuatorFuncParam>
            <wpml:gimbalHeadingYawBase>aircraft</wpml:gimbalHeadingYawBase>
            <wpml:gimbalRotateMode>absoluteAngle</wpml:gimbalRotateMode>
            <wpml:gimbalPitchRotateEnable>1</wpml:gimbalPitchRotateEnable>
            <wpml:gimbalPitchRotateAngle>-90</wpml:gimbalPitchRotateAngle>
            <wpml:gimbalRollRotateEnable>0</wpml:gimbalRollRotateEnable>
            <wpml:gimbalRollRotateAngle>0</wpml:gimbalRollRotateAngle>
            <wpml:gimbalYawRotateEnable>0</wpml:gimbalYawRotateEnable>
            <wpml:gimbalYawRotateAngle>0</wpml:gimbalYawRotateAngle>
            <wpml:gimbalRotateTimeEnable>0</wpml:gimbalRotateTimeEnable>
            <wpml:gimbalRotateTime>0</wpml:gimbalRotateTime>
            <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
          </wpml:actionActuatorFuncParam>
        </wpml:action>
      </wpml:actionGroup>
` : ''}      <wpml:actionGroup>
        <wpml:actionGroupId>${i + 1}</wpml:actionGroupId>
        <wpml:actionGroupStartIndex>${i}</wpml:actionGroupStartIndex>
        <wpml:actionGroupEndIndex>${i}</wpml:actionGroupEndIndex>
        <wpml:actionGroupMode>sequence</wpml:actionGroupMode>
        <wpml:actionTrigger><wpml:actionTriggerType>reachPoint</wpml:actionTriggerType></wpml:actionTrigger>
        <wpml:action>
          <wpml:actionId>${i + 1}</wpml:actionId>
          <wpml:actionActuatorFunc>takePhoto</wpml:actionActuatorFunc>
          <wpml:actionActuatorFuncParam>
            <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
          </wpml:actionActuatorFuncParam>
        </wpml:action>
      </wpml:actionGroup>
    </Placemark>`

/** Genera el XML de waylines.wpml para la misión. */
export function buildWaylinesWPML(waypoints, { altitude = 70, speed = 5 } = {}) {
  const placemarks = waypoints
    .map((wp, i) => wpXML(wp, i, altitude, speed, i === 0))
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:wpml="http://www.dji.com/wpmz/1.0.2">
  <Document>
    <wpml:missionConfig>
      <wpml:flyToWaylineMode>safely</wpml:flyToWaylineMode>
      <wpml:finishAction>goHome</wpml:finishAction>
      <wpml:exitOnRCLost>executeLostAction</wpml:exitOnRCLost>
      <wpml:executeRCLostAction>goBack</wpml:executeRCLostAction>
      <wpml:globalTransitionalSpeed>${speed}</wpml:globalTransitionalSpeed>
      <wpml:globalRTHHeight>${Math.max(altitude, 60)}</wpml:globalRTHHeight>
      <wpml:droneInfo>
        <wpml:droneEnumValue>68</wpml:droneEnumValue>
        <wpml:droneSubEnumValue>0</wpml:droneSubEnumValue>
      </wpml:droneInfo>
    </wpml:missionConfig>
    <Folder>
      <wpml:templateId>0</wpml:templateId>
      <wpml:executeHeightMode>relativeToStartPoint</wpml:executeHeightMode>
      <wpml:waylineId>0</wpml:waylineId>
      <wpml:autoFlightSpeed>${speed}</wpml:autoFlightSpeed>
${placemarks}
    </Folder>
  </Document>
</kml>
`
}

/** Empaqueta la misión como KMZ (zip con wpmz/waylines.wpml) y la descarga. */
export function downloadMissionKMZ(name, waypoints, opts = {}) {
  const wpml = buildWaylinesWPML(waypoints, opts)
  const kmz = zipSync({ 'wpmz/waylines.wpml': strToU8(wpml) })
  const blob = new Blob([kmz], { type: 'application/vnd.google-earth.kmz' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${name || 'mision'}.kmz`
  a.click()
  URL.revokeObjectURL(url)
}
