// API de orquestación de procesamiento fotogramétrico.
//
// Responsabilidad: recibir las fotos del vuelo, lanzarlas a NodeODM
// (OpenDroneMap) para reconstruir ortomosaico / DSM / nube de puntos, y exponer
// el estado y los productos resultantes a la app de medición.
//
// Estado: ESQUELETO funcional (Fase 2 del roadmap). Requiere NodeODM corriendo
// (ver docker-compose.yml).  Instalar deps:  cd server && npm install
//
//   POST /api/tasks           (multipart: images[]) -> crea una tarea en NodeODM
//   GET  /api/tasks/:uuid      -> estado/progreso de la tarea
//   GET  /api/tasks/:uuid/download/:asset -> descarga un producto (orthophoto.tif, dsm.tif, ...)

import express from 'express'
import multer from 'multer'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'node:fs'
import path from 'node:path'

const NODEODM = process.env.NODEODM_URL || 'http://localhost:3000'
const PORT = process.env.PORT || 4000
const UPLOAD_DIR = path.resolve('uploads')
fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const app = express()
const upload = multer({ dest: UPLOAD_DIR })

app.use(express.json())

// CORS abierto para desarrollo (la app corre en otro puerto).
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

// Registro en memoria de tareas lanzadas desde esta API (uuid -> metadatos).
const tasks = new Map()

// Salud del motor.
app.get('/api/health', async (_req, res) => {
  try {
    const { data } = await axios.get(`${NODEODM}/info`)
    res.json({ ok: true, nodeodm: data })
  } catch (err) {
    res.status(503).json({ ok: false, error: 'NodeODM no disponible', detail: err.message })
  }
})

// Crear una tarea de procesamiento con las fotos subidas.
// Acepta también un gcp_list.txt opcional (campo 'gcp') para georreferenciación
// de precisión con puntos de control.
app.post('/api/tasks', upload.fields([{ name: 'images' }, { name: 'gcp', maxCount: 1 }]), async (req, res) => {
  const images = req.files?.images ?? []
  const gcp = req.files?.gcp?.[0]
  if (!images.length) return res.status(400).json({ error: 'Sin imágenes' })
  try {
    const form = new FormData()
    for (const f of images) {
      form.append('images', fs.createReadStream(f.path), f.originalname)
    }
    if (gcp) {
      form.append('images', fs.createReadStream(gcp.path), 'gcp_list.txt')
    }
    // Opciones de ODM: DSM activado, resolución de orto, calidad de nube, etc.
    const options = req.body.options || JSON.stringify([
      { name: 'dsm', value: true },
      { name: 'pc-quality', value: 'high' },
    ])
    form.append('options', options)
    if (req.body.name) form.append('name', req.body.name)

    const { data } = await axios.post(`${NODEODM}/task/new`, form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    })
    // Limpia los temporales locales; NodeODM ya tiene copia.
    for (const f of images) fs.unlink(f.path, () => {})
    if (gcp) fs.unlink(gcp.path, () => {})

    tasks.set(data.uuid, {
      uuid: data.uuid,
      name: req.body.name || `Tarea ${tasks.size + 1}`,
      imageCount: images.length,
      withGCP: Boolean(gcp),
      createdAt: new Date().toISOString(),
    })
    res.json({ uuid: data.uuid })
  } catch (err) {
    res.status(500).json({ error: 'No se pudo crear la tarea', detail: err.message })
  }
})

// Lista de tareas lanzadas desde esta API.
app.get('/api/tasks', (_req, res) => {
  res.json([...tasks.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
})

// Estado/progreso de una tarea.
app.get('/api/tasks/:uuid', async (req, res) => {
  try {
    const { data } = await axios.get(`${NODEODM}/task/${req.params.uuid}/info`)
    res.json(data)
  } catch (err) {
    res.status(404).json({ error: 'Tarea no encontrada', detail: err.message })
  }
})

// Descarga de un asset del resultado (proxy a NodeODM).
app.get('/api/tasks/:uuid/download/:asset', async (req, res) => {
  try {
    const url = `${NODEODM}/task/${req.params.uuid}/download/${req.params.asset}`
    const stream = await axios.get(url, { responseType: 'stream' })
    stream.data.pipe(res)
  } catch (err) {
    res.status(404).json({ error: 'Asset no disponible', detail: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Workpulse Drohne — API de procesamiento en http://localhost:${PORT}`)
  console.log(`NodeODM esperado en ${NODEODM}`)
})
