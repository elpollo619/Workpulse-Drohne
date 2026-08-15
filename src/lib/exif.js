// Lector mínimo de metadatos de fotos de drone, sin dependencias:
//  - GPS (lat/lng/alt) del bloque EXIF estándar (APP1/TIFF)
//  - Altura relativa al despegue y rumbo del XMP de DJI (drone-dji:*)
//
// Suficiente para verificar la cobertura de un vuelo sobre el mapa sin
// procesar nada.

function readIFD(view, tiffStart, offset, littleEndian) {
  const entries = {}
  const count = view.getUint16(tiffStart + offset, littleEndian)
  for (let i = 0; i < count; i++) {
    const e = tiffStart + offset + 2 + i * 12
    const tag = view.getUint16(e, littleEndian)
    const type = view.getUint16(e + 2, littleEndian)
    const num = view.getUint32(e + 4, littleEndian)
    entries[tag] = { type, num, valueOffset: e + 8 }
  }
  return entries
}

function readRationals(view, tiffStart, entry, littleEndian) {
  // Los RATIONAL (tipo 5) siempre van por puntero.
  const ptr = tiffStart + view.getUint32(entry.valueOffset, littleEndian)
  const out = []
  for (let i = 0; i < entry.num; i++) {
    const n = view.getUint32(ptr + i * 8, littleEndian)
    const d = view.getUint32(ptr + i * 8 + 4, littleEndian)
    out.push(d ? n / d : 0)
  }
  return out
}

function readAscii(view, tiffStart, entry, littleEndian) {
  if (entry.num <= 4) {
    let s = ''
    for (let i = 0; i < entry.num - 1; i++) s += String.fromCharCode(view.getUint8(entry.valueOffset + i))
    return s
  }
  const ptr = tiffStart + view.getUint32(entry.valueOffset, littleEndian)
  let s = ''
  for (let i = 0; i < entry.num - 1; i++) s += String.fromCharCode(view.getUint8(ptr + i))
  return s
}

/**
 * Extrae GPS y metadatos DJI de un JPEG.
 * @param {ArrayBuffer} buffer
 * @returns {{lat:number,lng:number,altMSL:number|null,altAGL:number|null,yaw:number|null}|null}
 */
export function parsePhotoMeta(buffer) {
  const view = new DataView(buffer)
  if (view.getUint16(0) !== 0xffd8) return null // no es JPEG

  let gps = null

  // Recorre los segmentos buscando APP1/EXIF.
  let off = 2
  while (off + 4 < view.byteLength) {
    const marker = view.getUint16(off)
    if ((marker & 0xff00) !== 0xff00) break
    const size = view.getUint16(off + 2)
    if (marker === 0xffe1 && view.getUint32(off + 4) === 0x45786966 /* 'Exif' */) {
      const tiffStart = off + 10
      const littleEndian = view.getUint16(tiffStart) === 0x4949
      const ifd0Off = view.getUint32(tiffStart + 4, littleEndian)
      const ifd0 = readIFD(view, tiffStart, ifd0Off, littleEndian)
      const gpsEntry = ifd0[0x8825]
      if (gpsEntry) {
        const gpsOff = view.getUint32(gpsEntry.valueOffset, littleEndian)
        const g = readIFD(view, tiffStart, gpsOff, littleEndian)
        try {
          const latRef = g[1] ? readAscii(view, tiffStart, g[1], littleEndian) : 'N'
          const lngRef = g[3] ? readAscii(view, tiffStart, g[3], littleEndian) : 'E'
          if (g[2] && g[4]) {
            const [d1, m1, s1] = readRationals(view, tiffStart, g[2], littleEndian)
            const [d2, m2, s2] = readRationals(view, tiffStart, g[4], littleEndian)
            let lat = d1 + m1 / 60 + s1 / 3600
            let lng = d2 + m2 / 60 + s2 / 3600
            if (latRef === 'S') lat = -lat
            if (lngRef === 'W') lng = -lng
            let altMSL = null
            if (g[6]) altMSL = readRationals(view, tiffStart, g[6], littleEndian)[0]
            gps = { lat, lng, altMSL }
          }
        } catch { /* EXIF corrupto: se ignora */ }
      }
    }
    if (marker === 0xffda) break // inicio de datos de imagen
    off += 2 + size
  }

  if (!gps) return null

  // XMP de DJI (texto plano en el archivo): altura relativa y rumbo.
  const head = new TextDecoder('latin1').decode(new Uint8Array(buffer, 0, Math.min(buffer.byteLength, 131072)))
  const rel = head.match(/drone-dji:RelativeAltitude="?\+?(-?[\d.]+)/)
  const yaw = head.match(/drone-dji:FlightYawDegree="?\+?(-?[\d.]+)/)

  return {
    lat: gps.lat,
    lng: gps.lng,
    altMSL: gps.altMSL,
    altAGL: rel ? parseFloat(rel[1]) : null,
    yaw: yaw ? parseFloat(yaw[1]) : null,
  }
}
