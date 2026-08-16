// ✅ Control de calidad del vuelo ANTES de procesar: solape real entre fotos,
// huecos de cobertura y detección de fotos borrosas — todo en el navegador.
// La causa n.º 1 de modelos malos es descubrir DESPUÉS de horas de procesado
// que faltaba solape o había fotos movidas; esto lo detecta en segundos.

import { MINI4PRO } from './mission.js'

const METERS_PER_DEG_LAT = 110540
const metersPerDegLon = (lat) => 111320 * Math.cos((lat * Math.PI) / 180)

/**
 * Varianza del laplaciano sobre una imagen en gris (medida clásica de
 * nitidez: bajo = borrosa). Pura y testeable — el wrapper de canvas está en
 * blurScoreFromBitmap.
 * @param {Uint8ClampedArray|Float32Array} gray  luminancia por píxel
 */
export function laplacianVariance(gray, w, h) {
  let sum = 0
  let sum2 = 0
  let n = 0
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x
      const lap = 4 * gray[i] - gray[i - 1] - gray[i + 1] - gray[i - w] - gray[i + w]
      sum += lap
      sum2 += lap * lap
      n++
    }
  }
  if (!n) return 0
  const mean = sum / n
  return sum2 / n - mean * mean
}

/** Nitidez de un ImageBitmap (reescalado a ~512 px para que sea rápido). */
export function blurScoreFromBitmap(bitmap, maxW = 512) {
  const scale = Math.min(1, maxW / bitmap.width)
  const w = Math.max(16, Math.round(bitmap.width * scale))
  const h = Math.max(16, Math.round(bitmap.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const g = canvas.getContext('2d', { willReadFrequently: true })
  g.drawImage(bitmap, 0, 0, w, h)
  const { data } = g.getImageData(0, 0, w, h)
  const gray = new Float32Array(w * h)
  for (let i = 0; i < w * h; i++) {
    gray[i] = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]
  }
  return laplacianVariance(gray, w, h)
}

/**
 * Análisis del track del vuelo a partir de las fotos con GPS (en orden de
 * disparo): solape frontal real por línea, huecos y estadística de altura.
 * Pura y testeable.
 *
 * @param {Array<{lat:number, lng:number, altAGL:number|null, name:string}>} metas
 * @param {object} [cam]  óptica (def. Mini 4 Pro)
 * @returns {null|object} estadísticas y problemas detectados
 */
export function analyzeTrack(metas, cam = MINI4PRO) {
  if (metas.length < 3) return null
  const lat0 = metas[0].lat
  const kx = metersPerDegLon(lat0)
  const xy = metas.map((m) => ({ x: m.lng * kx, y: m.lat * METERS_PER_DEG_LAT }))

  // Vectores entre disparos consecutivos.
  const vecs = []
  for (let i = 1; i < metas.length; i++) {
    vecs.push({ x: xy[i].x - xy[i - 1].x, y: xy[i].y - xy[i - 1].y })
  }
  const steps = vecs.map((v) => Math.hypot(v.x, v.y))
  const sorted = [...steps].sort((a, b) => a - b)
  const median = sorted[Math.floor(sorted.length / 2)]

  // Un giro de serpentina cambia de dirección; un HUECO de cobertura es
  // colineal con su línea. Por eso los giros se detectan por ángulo (>45° con
  // ambos vecinos), no por distancia — así un hueco de N disparos no se
  // confunde con un giro.
  const aligned = (a, b) => {
    const la = Math.hypot(a.x, a.y)
    const lb = Math.hypot(b.x, b.y)
    if (!la || !lb) return true
    return (a.x * b.x + a.y * b.y) / (la * lb) > Math.SQRT1_2 // cos 45°
  }
  const isTurn = vecs.map((v, i) => {
    const prevOk = i > 0 ? aligned(v, vecs[i - 1]) : false
    const nextOk = i < vecs.length - 1 ? aligned(v, vecs[i + 1]) : false
    return !prevOk && !nextOk
  })

  const alts = metas.map((m) => m.altAGL).filter((a) => a != null && a > 0)
  const avgAlt = alts.length ? alts.reduce((s, a) => s + a, 0) / alts.length : 70
  const footprintH = ((cam.sensorHeightMM / 1000) * avgAlt) / (cam.focalMM / 1000)

  const overlaps = []
  const gaps = [] // { after: nombre, distM, overlap }
  for (let i = 0; i < steps.length; i++) {
    const d = steps[i]
    if (isTurn[i] || d === 0 || d > 12 * median) continue
    const ov = 1 - d / footprintH
    overlaps.push(ov)
    if (ov < 0.6) gaps.push({ after: metas[i].name, distM: d, overlap: ov })
  }
  if (!overlaps.length) return null

  const minOv = Math.min(...overlaps)
  const avgOv = overlaps.reduce((s, v) => s + v, 0) / overlaps.length
  const level = minOv < 0.55 || avgOv < 0.65 ? 'no' : minOv < 0.65 || avgOv < 0.75 ? 'warn' : 'ok'

  return {
    photoCount: metas.length,
    avgAltM: alts.length ? avgAlt : null,
    footprintHM: footprintH,
    medianStepM: median,
    avgOverlap: avgOv,
    minOverlap: minOv,
    gaps: gaps.slice(0, 8),
    level, // ok | warn | no
  }
}

/** Marca como borrosas las fotos claramente peores que la mediana del vuelo. */
export function flagBlurry(scores, factor = 0.35) {
  const valid = scores.filter((s) => s.score != null)
  if (valid.length < 4) return []
  const median = [...valid].map((s) => s.score).sort((a, b) => a - b)[Math.floor(valid.length / 2)]
  if (!median) return []
  return valid.filter((s) => s.score < median * factor).map((s) => ({ ...s, median }))
}
