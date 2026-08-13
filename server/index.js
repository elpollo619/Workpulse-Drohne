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
app.post('/api/tasks', upload.array('images'), async (req, res) => {
  if (!req.files?.length) return res.status(400).json({ error: 'Sin imágenes' })
  try {
    const form = new FormData()
    for (const f of req.files) {
      form.append('images', fs.createReadStream(f.path), f.originalname)
    }
    // Opciones de ODM: DSM activado, resolución de orto, calidad de nube, etc.
    const options = req.body.options || JSON.stringify([
      { name: 'dsm', value: true },
      { name: 'pc-quality', value: 'high' },
    ])
    form.append('options', options)
    // Si se envía un gcp_list.txt, se adjunta para georreferenciación con GCP.
    if (req.body.name) form.append('name', req.body.name)

    const { data } = await axios.post(`${NODEODM}/task/new`, form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    })
    // Limpia los temporales locales; NodeODM ya tiene copia.
    for (const f of req.files) fs.unlink(f.path, () => {})
    res.json({ uuid: data.uuid })
  } catch (err) {
    res.status(500).json({ error: 'No se pudo crear la tarea', detail: err.message })
  }
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
