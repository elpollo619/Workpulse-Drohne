// Medición sobre una foto 360° (equirectangular) de una cámara tipo Insta360.
//
// Principio: con la cámara a una altura conocida h sobre un suelo plano, un
// rayo que mira hacia abajo con ángulo de picado φ toca el suelo a una
// distancia horizontal d = h / tan(φ). Con dos puntos del suelo se obtiene la
// distancia real entre ellos. Es el mismo método que usan las apps de medición
// de interiores con una sola foto 360.
//
// Limitaciones (documentadas en la interfaz): válido para puntos apoyados en
// el plano del suelo; la precisión cae con ángulos muy rasantes (puntos muy
// lejanos) y con suelos inclinados.

/**
 * Punto del suelo alcanzado por un rayo de dirección `dir` (normalizada,
 * sistema Y-arriba) desde una cámara a altura `h`.
 * @returns {{x:number,y:number,z:number, horizontal:number, r:number}|null}
 *          null si el rayo no apunta al suelo (o es demasiado rasante).
 */
export function floorPointFromDirection(dir, h, minSin = 0.03) {
  if (!(h > 0) || dir.y >= -minSin) return null
  const r = h / -dir.y // distancia a lo largo del rayo hasta y = -h
  const x = dir.x * r
  const z = dir.z * r
  return { x, y: -h, z, horizontal: Math.hypot(x, z), r }
}

/** Distancia real entre dos puntos del suelo. */
export function floorDistance(p1, p2) {
  return Math.hypot(p2.x - p1.x, p2.z - p1.z)
}

/**
 * Perímetro (abierto) de una cadena de puntos del suelo.
 */
export function floorPathLength(points) {
  let total = 0
  for (let i = 1; i < points.length; i++) total += floorDistance(points[i - 1], points[i])
  return total
}

/**
 * Área real del polígono formado por puntos del suelo (fórmula del cordón,
 * sobre el plano x-z).
 */
export function floorPolygonArea(points) {
  if (points.length < 3) return 0
  let s = 0
  for (let i = 0; i < points.length; i++) {
    const a = points[i]
    const b = points[(i + 1) % points.length]
    s += a.x * b.z - b.x * a.z
  }
  return Math.abs(s) / 2
}

/**
 * Altura de un objeto: rayo al pie (en el suelo) y rayo a la parte superior
 * en la misma vertical. h = altura de cámara, `dirTop.y` puede ser + o −.
 * @returns {number|null}
 */
export function objectHeight(footPoint, dirTop, h) {
  if (!footPoint) return null
  const dHoriz = footPoint.horizontal
  const horizTop = Math.hypot(dirTop.x, dirTop.z)
  if (horizTop < 1e-6) return null
  // Elevación del rayo superior al llegar a la vertical del pie.
  const yAtFoot = (dirTop.y / horizTop) * dHoriz
  return h + yAtFoot
}
