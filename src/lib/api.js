// Cliente del servidor de procesamiento (server/): sube fotos, consulta el
// progreso de NodeODM y descarga los productos (orto/DSM) al navegador.
//
// En desarrollo, Vite proxya /api -> http://localhost:4000 (ver vite.config.js).

const BASE = '/api'

// Códigos de estado de NodeODM.
export const TASK_STATUS = {
  10: 'En cola',
  20: 'Procesando',
  30: 'Fallida',
  40: 'Completada',
  50: 'Cancelada',
}
export const STATUS_QUEUED = 10
export const STATUS_RUNNING = 20
export const STATUS_FAILED = 30
export const STATUS_COMPLETED = 40

/** ¿Está disponible el servidor de procesamiento (y NodeODM detrás)? */
export async function checkHealth() {
  try {
    const res = await fetch(`${BASE}/health`)
    const data = await res.json()
    return Boolean(data.ok)
  } catch {
    return false
  }
}

/**
 * Sube imágenes (y opcionalmente un gcp_list.txt) y lanza el procesamiento.
 * @param {File[]} images
 * @param {{ name?: string, gcpFile?: File }} opts
 * @returns {Promise<string>} uuid de la tarea
 */
export async function createTask(images, opts = {}) {
  const form = new FormData()
  for (const f of images) form.append('images', f, f.name)
  if (opts.gcpFile) form.append('gcp', opts.gcpFile, 'gcp_list.txt')
  if (opts.name) form.append('name', opts.name)
  const res = await fetch(`${BASE}/tasks`, { method: 'POST', body: form })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || err.error || `Error HTTP ${res.status}`)
  }
  const data = await res.json()
  return data.uuid
}

/** Estado/progreso de una tarea NodeODM. */
export async function getTask(uuid) {
  const res = await fetch(`${BASE}/tasks/${uuid}`)
  if (!res.ok) throw new Error(`Tarea no encontrada (${res.status})`)
  return res.json()
}

/** Descarga un producto del resultado como ArrayBuffer (p.ej. 'dsm.tif'). */
export async function downloadAsset(uuid, asset) {
  const res = await fetch(`${BASE}/tasks/${uuid}/download/${asset}`)
  if (!res.ok) throw new Error(`Asset no disponible (${res.status})`)
  return res.arrayBuffer()
}

/**
 * Descarga un producto del resultado directamente a disco (modelo 3D
 * texturizado, nube de puntos LAZ…) sin cargarlo en memoria de la app.
 */
export async function saveAsset(uuid, asset, filename) {
  const buf = await downloadAsset(uuid, asset)
  const url = URL.createObjectURL(new Blob([buf]))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Abre el informe de calidad PDF que genera OpenDroneMap (report.pdf) en una
 * pestaña nueva: cobertura de fotos, calibración de cámaras, error de
 * reproyección, GSD real, etc.
 */
export async function openQualityReport(uuid) {
  const buf = await downloadAsset(uuid, 'report.pdf')
  const url = URL.createObjectURL(new Blob([buf], { type: 'application/pdf' }))
  window.open(url, '_blank')
}
