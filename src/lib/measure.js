// Cálculos geodésicos de medición (distancia, área, perímetro) usando Turf.js.
// Todo se calcula sobre el elipsoide WGS84, por lo que las medidas son a escala
// real del terreno, no en píxeles de pantalla.

import length from '@turf/length'
import area from '@turf/area'
import { lineString, polygon as turfPolygon } from '@turf/helpers'

/**
 * Longitud geodésica de una polilínea.
 * @param {Array<[lng, lat]>} coords
 * @returns {number} metros
 */
export function lineLengthMeters(coords) {
  if (!coords || coords.length < 2) return 0
  return length(lineString(coords), { units: 'kilometers' }) * 1000
}

/**
 * Área y perímetro de un polígono cerrado.
 * @param {Array<[lng, lat]>} ring anillo exterior (sin repetir el último punto)
 * @returns {{ areaM2: number, perimeterM: number }}
 */
export function polygonMetrics(ring) {
  if (!ring || ring.length < 3) return { areaM2: 0, perimeterM: 0 }
  const closed = [...ring, ring[0]]
  const poly = turfPolygon([closed])
  return {
    areaM2: area(poly),
    perimeterM: lineLengthMeters(closed),
  }
}

/** Formatea metros a m / km legibles. */
export function fmtDistance(m) {
  if (m == null || isNaN(m)) return '—'
  if (m >= 1000) return `${(m / 1000).toFixed(3)} km`
  return `${m.toFixed(2)} m`
}

/** Formatea m² a m² / ha legibles. */
export function fmtArea(m2) {
  if (m2 == null || isNaN(m2)) return '—'
  if (m2 >= 10000) return `${(m2 / 10000).toFixed(4)} ha (${m2.toFixed(1)} m²)`
  return `${m2.toFixed(2)} m²`
}

/** Formatea volumen en m³. */
export function fmtVolume(m3) {
  if (m3 == null || isNaN(m3)) return '—'
  return `${m3.toFixed(2)} m³`
}
