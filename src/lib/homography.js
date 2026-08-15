// Homografía de 4 puntos (DLT) para rectificar fotos de fachada: convierte la
// foto en perspectiva del drone en una vista frontal "a plomo" sobre la que
// medir y dibujar el plano. Sin dependencias: sistema 8×8 por eliminación
// gaussiana con pivoteo parcial.

/** Resuelve A·x = b (n×n) por eliminación gaussiana con pivoteo parcial. */
function solve(A, b) {
  const n = b.length
  // matriz aumentada
  const M = A.map((row, i) => [...row, b[i]])
  for (let col = 0; col < n; col++) {
    // pivote: fila con mayor valor absoluto en esta columna
    let best = col
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[best][col])) best = r
    }
    if (Math.abs(M[best][col]) < 1e-12) return null // singular
    ;[M[col], M[best]] = [M[best], M[col]]
    for (let r = 0; r < n; r++) {
      if (r === col) continue
      const f = M[r][col] / M[col][col]
      for (let c = col; c <= n; c++) M[r][c] -= f * M[col][c]
    }
  }
  return M.map((row, i) => row[n] / row[i])
}

/**
 * Homografía H (3×3, h33=1) que lleva src[i] → dst[i] para 4 pares de puntos.
 * @param {Array<{x:number,y:number}>} src  4 puntos origen
 * @param {Array<{x:number,y:number}>} dst  4 puntos destino
 * @returns {number[]|null} [h11,h12,h13,h21,h22,h23,h31,h32,1] o null si degenera
 */
export function computeHomography(src, dst) {
  if (src.length !== 4 || dst.length !== 4) return null
  const A = []
  const b = []
  for (let i = 0; i < 4; i++) {
    const { x, y } = src[i]
    const { x: u, y: v } = dst[i]
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y])
    b.push(u)
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y])
    b.push(v)
  }
  const h = solve(A, b)
  return h ? [...h, 1] : null
}

/** Aplica la homografía a un punto. */
export function applyH(H, x, y) {
  const w = H[6] * x + H[7] * y + H[8]
  return {
    x: (H[0] * x + H[1] * y + H[2]) / w,
    y: (H[3] * x + H[4] * y + H[5]) / w,
  }
}

/**
 * Rectifica una imagen: los 4 puntos `corners` (orden TL, TR, BR, BL) de la
 * foto pasan a ser un rectángulo perfecto de outW×outH píxeles. Muestreo
 * bilineal con mapeo inverso. Solo navegador (usa canvas).
 *
 * @param {ImageBitmap|HTMLImageElement} image
 * @param {Array<{x:number,y:number}>} corners
 * @returns {HTMLCanvasElement}
 */
export function rectifyImage(image, corners, outW, outH) {
  const srcCanvas = document.createElement('canvas')
  srcCanvas.width = image.width
  srcCanvas.height = image.height
  srcCanvas.getContext('2d').drawImage(image, 0, 0)
  const srcData = srcCanvas.getContext('2d').getImageData(0, 0, image.width, image.height)
  const sp = srcData.data
  const sw = image.width
  const sh = image.height

  // Mapeo inverso: rectángulo destino → foto original.
  const H = computeHomography(
    [{ x: 0, y: 0 }, { x: outW, y: 0 }, { x: outW, y: outH }, { x: 0, y: outH }],
    corners
  )
  if (!H) return null

  const out = document.createElement('canvas')
  out.width = outW
  out.height = outH
  const outCtx = out.getContext('2d')
  const outData = outCtx.createImageData(outW, outH)
  const op = outData.data

  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      const { x: sx, y: sy } = applyH(H, x + 0.5, y + 0.5)
      const o = (y * outW + x) * 4
      if (sx < 0 || sy < 0 || sx >= sw - 1 || sy >= sh - 1) {
        op[o + 3] = 0
        continue
      }
      // bilineal
      const x0 = Math.floor(sx)
      const y0 = Math.floor(sy)
      const fx = sx - x0
      const fy = sy - y0
      const i00 = (y0 * sw + x0) * 4
      const i10 = i00 + 4
      const i01 = i00 + sw * 4
      const i11 = i01 + 4
      for (let ch = 0; ch < 3; ch++) {
        op[o + ch] =
          sp[i00 + ch] * (1 - fx) * (1 - fy) +
          sp[i10 + ch] * fx * (1 - fy) +
          sp[i01 + ch] * (1 - fx) * fy +
          sp[i11 + ch] * fx * fy
      }
      op[o + 3] = 255
    }
  }
  outCtx.putImageData(outData, 0, 0)
  return out
}
