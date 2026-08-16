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

/**
 * ⛰️ Terrain-follow: adapta la altura de cada waypoint al terreno oficial
 * para mantener la altura sobre el suelo (y por tanto el GSD) constante.
 * El Mini 4 Pro interpreta executeHeight relativo al punto de despegue, así
 * que las alturas se calculan respecto al terreno del PRIMER waypoint —
 * despega cerca de él.
 *
 * @param {Array<[lng,lat]>} waypoints  rejilla de planGrid
 * @param {Array<{dist:number, alt:number}>} profile  perfil oficial a lo largo
 *        de la serpentina (fetchSwissProfile(waypoints))
 * @param {number} agl  altura deseada sobre el terreno en m
 * @returns {null|{waypoints:Array<{lng,lat,alt}>, terrainMinM:number,
 *          terrainMaxM:number, rangeM:number, clampedCount:number}}
 */
export function applyTerrainFollow(waypoints, profile, agl) {
  if (!profile?.length || waypoints.length < 2) return null
  const valid = profile.filter((p) => p.alt != null)
  if (valid.length < 2) return null

  // Distancia acumulada de cada waypoint a lo largo de la ruta.
  const lat0 = waypoints[0][1]
  const kx = metersPerDegLon(lat0)
  const cum = [0]
  for (let i = 1; i < waypoints.length; i++) {
    const dx = (waypoints[i][0] - waypoints[i - 1][0]) * kx
    const dy = (waypoints[i][1] - waypoints[i - 1][1]) * METERS_PER_DEG_LAT
    cum.push(cum[i - 1] + Math.hypot(dx, dy))
  }

  // Terreno interpolado linealmente en el perfil para una distancia dada.
  const terrainAt = (d) => {
    if (d <= valid[0].dist) return valid[0].alt
    for (let i = 1; i < valid.length; i++) {
      if (d <= valid[i].dist) {
        const a = valid[i - 1]
        const b = valid[i]
        const t = b.dist === a.dist ? 0 : (d - a.dist) / (b.dist - a.dist)
        return a.alt + t * (b.alt - a.alt)
      }
    }
    return valid[valid.length - 1].alt
  }

  const terr0 = terrainAt(0)
  let terrainMin = Infinity
  let terrainMax = -Infinity
  let clampedCount = 0
  const out = waypoints.map((wp, i) => {
    const t = terrainAt(cum[i])
    if (t < terrainMin) terrainMin = t
    if (t > terrainMax) terrainMax = t
    // Altura relativa al despegue (junto al primer waypoint).
    let alt = Math.round((agl + (t - terr0)) * 10) / 10
    const clamped = Math.min(120, Math.max(20, alt))
    if (clamped !== alt) clampedCount++
    return { lng: wp[0], lat: wp[1], alt: clamped }
  })

  return {
    waypoints: out,
    terrainMinM: terrainMin,
    terrainMaxM: terrainMax,
    rangeM: terrainMax - terrainMin,
    clampedCount,
  }
}

/**
 * 🏠 Misión de órbita para fachadas: círculos a varias alturas alrededor de un
 * edificio, con el drone siempre mirando al centro y el gimbal apuntando a la
 * fachada o al techo según el nivel. Es lo que capta ventanas, puertas y
 * aleros que una rejilla nadir (mirando hacia abajo) nunca ve.
 *
 * @param {[number, number]} center   centro del edificio [lng, lat]
 * @param {object} opts
 * @param {number} opts.radius            radio de órbita en m (def. 15)
 * @param {number} opts.buildingHeightM   altura del edificio en m (def. 8)
 * @param {number} opts.photosPerOrbit    fotos por vuelta (def. 24)
 * @param {number} opts.speed             velocidad m/s (def. 2.5)
 */
export function planOrbit(center, opts = {}) {
  const { radius = 15, buildingHeightM = 8, photosPerOrbit = 24, speed = 2.5 } = opts
  const [lng0, lat0] = center
  const kx = metersPerDegLon(lat0)
  const H = buildingHeightM
  const cam = MINI4PRO

  // Tres niveles: fachada baja (cámara casi horizontal), fachada alta/aleros,
  // y techo en oblicuo. "aim" es la altura del edificio a la que apunta.
  const levels = [
    { alt: Math.max(4, H * 0.45), aim: H * 0.45 },
    { alt: H + 3, aim: H * 0.8 },
    { alt: H + Math.max(6, radius * 0.6), aim: H },
  ]

  const round1 = (v) => Math.round(v * 10) / 10
  const waypoints = []
  for (let li = 0; li < levels.length; li++) {
    const lv = levels[li]
    const pitch = round1(-(Math.atan2(lv.alt - lv.aim, radius) * 180) / Math.PI)
    lv.pitch = pitch
    for (let k = 0; k < photosPerOrbit; k++) {
      // Sentido alterno por nivel: ahorra el retorno al punto inicial.
      const dir = li % 2 === 0 ? 1 : -1
      const theta = dir * ((2 * Math.PI * k) / photosPerOrbit)
      const x = radius * Math.sin(theta)
      const y = radius * Math.cos(theta)
      // Rumbo hacia el centro: vector (-x, -y); ángulo horario desde el norte.
      let heading = (Math.atan2(-x, -y) * 180) / Math.PI
      if (heading > 180) heading -= 360
      waypoints.push({
        lng: lng0 + x / kx,
        lat: lat0 + y / METERS_PER_DEG_LAT,
        alt: round1(lv.alt),
        headingDeg: round1(heading),
        gimbalPitchDeg: Math.max(-90, Math.min(20, pitch)),
        level: li,
      })
    }
  }

  // GSD sobre la fachada a la distancia del radio (mejor que en nadir).
  const gsdCM = ((cam.sensorWidthMM * radius * 1000) / (cam.focalMM * cam.imageWidthPX)) / 10
  const distanceM =
    levels.length * 2 * Math.PI * radius +
    levels.reduce((s, lv, i) => s + (i ? Math.abs(lv.alt - levels[i - 1].alt) : lv.alt), 0)
  const durationMin = (distanceM / speed + waypoints.length * 3 + 90) / 60
  const maxAlt = Math.max(...levels.map((l) => l.alt))

  return {
    waypoints,
    photoCount: waypoints.length,
    gsdCM,
    distanceM,
    durationMin,
    maxAlt,
    levels: levels.map((l) => ({ alt: round1(l.alt), pitch: l.pitch })),
    tooMany: waypoints.length > 180,
  }
}

const gimbalActionXML = (id, pitch) => `        <wpml:action>
          <wpml:actionId>${id}</wpml:actionId>
          <wpml:actionActuatorFunc>gimbalRotate</wpml:actionActuatorFunc>
          <wpml:actionActuatorFuncParam>
            <wpml:gimbalHeadingYawBase>aircraft</wpml:gimbalHeadingYawBase>
            <wpml:gimbalRotateMode>absoluteAngle</wpml:gimbalRotateMode>
            <wpml:gimbalPitchRotateEnable>1</wpml:gimbalPitchRotateEnable>
            <wpml:gimbalPitchRotateAngle>${pitch}</wpml:gimbalPitchRotateAngle>
            <wpml:gimbalRollRotateEnable>0</wpml:gimbalRollRotateEnable>
            <wpml:gimbalRollRotateAngle>0</wpml:gimbalRollRotateAngle>
            <wpml:gimbalYawRotateEnable>0</wpml:gimbalYawRotateEnable>
            <wpml:gimbalYawRotateAngle>0</wpml:gimbalYawRotateAngle>
            <wpml:gimbalRotateTimeEnable>0</wpml:gimbalRotateTimeEnable>
            <wpml:gimbalRotateTime>0</wpml:gimbalRotateTime>
            <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
          </wpml:actionActuatorFuncParam>
        </wpml:action>`

// Un waypoint puede ser [lng, lat] (rejilla nadir) u objeto
// { lng, lat, alt?, headingDeg?, gimbalPitchDeg? } (órbita de fachadas).
const wpXML = (wp, i, altitude, speed, isFirst) => {
  const lng = wp.lng ?? wp[0]
  const lat = wp.lat ?? wp[1]
  const height = wp.alt ?? altitude
  // Rumbo: por defecto sigue la línea; con headingDeg gira suavemente hasta
  // ese rumbo (apuntando al edificio en las órbitas).
  const headingXML = wp.headingDeg != null
    ? `      <wpml:waypointHeadingParam>
        <wpml:waypointHeadingMode>smoothTransition</wpml:waypointHeadingMode>
        <wpml:waypointHeadingAngle>${wp.headingDeg}</wpml:waypointHeadingAngle>
        <wpml:waypointPoiPoint>0.000000,0.000000,0.000000</wpml:waypointPoiPoint>
        <wpml:waypointHeadingAngleEnable>1</wpml:waypointHeadingAngleEnable>
        <wpml:waypointHeadingPathMode>followBadArc</wpml:waypointHeadingPathMode>
      </wpml:waypointHeadingParam>`
    : `      <wpml:waypointHeadingParam>
        <wpml:waypointHeadingMode>followWayline</wpml:waypointHeadingMode>
      </wpml:waypointHeadingParam>`

  // Acciones al llegar: gimbal (si procede) y foto, en secuencia.
  const actions = []
  if (wp.gimbalPitchDeg != null) {
    actions.push(gimbalActionXML(i * 10 + 1, wp.gimbalPitchDeg))
  } else if (isFirst) {
    actions.push(gimbalActionXML(100, -90)) // rejilla nadir: cámara vertical
  }
  actions.push(`        <wpml:action>
          <wpml:actionId>${i * 10 + 2}</wpml:actionId>
          <wpml:actionActuatorFunc>takePhoto</wpml:actionActuatorFunc>
          <wpml:actionActuatorFuncParam>
            <wpml:payloadPositionIndex>0</wpml:payloadPositionIndex>
          </wpml:actionActuatorFuncParam>
        </wpml:action>`)

  return `    <Placemark>
      <Point><coordinates>${lng.toFixed(8)},${lat.toFixed(8)}</coordinates></Point>
      <wpml:index>${i}</wpml:index>
      <wpml:executeHeight>${height}</wpml:executeHeight>
      <wpml:waypointSpeed>${speed}</wpml:waypointSpeed>
${headingXML}
      <wpml:waypointTurnParam>
        <wpml:waypointTurnMode>toPointAndStopWithDiscontinuityCurvature</wpml:waypointTurnMode>
        <wpml:waypointTurnDampingDist>0</wpml:waypointTurnDampingDist>
      </wpml:waypointTurnParam>
      <wpml:useStraightLine>1</wpml:useStraightLine>
      <wpml:actionGroup>
        <wpml:actionGroupId>${i + 1}</wpml:actionGroupId>
        <wpml:actionGroupStartIndex>${i}</wpml:actionGroupStartIndex>
        <wpml:actionGroupEndIndex>${i}</wpml:actionGroupEndIndex>
        <wpml:actionGroupMode>sequence</wpml:actionGroupMode>
        <wpml:actionTrigger><wpml:actionTriggerType>reachPoint</wpml:actionTriggerType></wpml:actionTrigger>
${actions.join('\n')}
      </wpml:actionGroup>
    </Placemark>`
}

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
