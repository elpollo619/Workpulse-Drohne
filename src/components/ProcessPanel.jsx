import { useEffect, useRef, useState } from 'react'
import { checkHealth, createTask, getTask, downloadAsset, saveAsset, openQualityReport, TASK_STATUS, STATUS_COMPLETED, STATUS_FAILED } from '../lib/api.js'

/**
 * Panel de procesamiento fotogramétrico: sube las fotos del vuelo al servidor
 * (server/ + NodeODM), muestra el progreso y carga los productos resultantes
 * (ortomosaico y DSM) directamente en el mapa.
 */
export default function ProcessPanel({ projectName, onLoadOrtho, onLoadDSM, onStatus }) {
  const [engineOk, setEngineOk] = useState(null)
  const [files, setFiles] = useState([])
  const [gcpFile, setGcpFile] = useState(null)
  const [task, setTask] = useState(null) // { uuid, statusCode, progress, error }
  const [busy, setBusy] = useState(false)
  const pollRef = useRef(null)

  useEffect(() => {
    checkHealth().then(setEngineOk)
    return () => clearInterval(pollRef.current)
  }, [])

  function startPolling(uuid) {
    clearInterval(pollRef.current)
    pollRef.current = setInterval(async () => {
      try {
        const info = await getTask(uuid)
        const statusCode = info.status?.code
        setTask({
          uuid,
          statusCode,
          progress: info.progress ?? 0,
          error: info.status?.errorMessage,
        })
        if (statusCode === STATUS_COMPLETED || statusCode === STATUS_FAILED) {
          clearInterval(pollRef.current)
        }
      } catch {
        // transitorio: mantiene el último estado
      }
    }, 5000)
  }

  async function launch() {
    if (!files.length) return
    setBusy(true)
    onStatus?.(`Subiendo ${files.length} fotos…`)
    try {
      const uuid = await createTask(files, { name: projectName, gcpFile })
      setTask({ uuid, statusCode: 10, progress: 0 })
      startPolling(uuid)
      onStatus?.('Procesamiento lanzado. Esto puede tardar bastante según el número de fotos.')
    } catch (err) {
      onStatus?.(`Error al lanzar el procesamiento: ${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function loadResult(asset, loader, label) {
    onStatus?.(`Descargando ${label}…`)
    try {
      const buf = await downloadAsset(task.uuid, asset)
      await loader(buf)
    } catch (err) {
      onStatus?.(`No se pudo descargar ${label}: ${err.message}`)
    }
  }

  if (engineOk === false) {
    return (
      <div className="process-panel">
        <p className="muted small-text">
          ⚙️ Motor de procesamiento no disponible. Arranca NodeODM y la API
          (<code>server/</code>: <code>docker compose up -d && npm start</code>) y
          recarga. Mientras tanto puedes cargar GeoTIFF procesados a mano.
        </p>
      </div>
    )
  }

  const done = task?.statusCode === STATUS_COMPLETED
  const failed = task?.statusCode === STATUS_FAILED

  return (
    <div className="process-panel">
      <label className="filebtn">
        📷 Seleccionar fotos del vuelo ({files.length})
        <input
          type="file" accept="image/jpeg,image/png" multiple hidden
          onChange={(e) => setFiles([...e.target.files])}
        />
      </label>
      <label className="filebtn">
        🎯 gcp_list.txt (opcional) {gcpFile ? '✓' : ''}
        <input
          type="file" accept=".txt" hidden
          onChange={(e) => setGcpFile(e.target.files?.[0] ?? null)}
        />
      </label>
      <button disabled={!files.length || busy || (task && !done && !failed)} onClick={launch}>
        🚀 Procesar {files.length > 0 && `(${files.length} fotos${gcpFile ? ' + GCP' : ''})`}
      </button>

      {task && (
        <div className="task-status">
          <div className="row small">
            <span>{TASK_STATUS[task.statusCode] ?? '…'}</span>
            <span>{Math.round(task.progress)}%</span>
          </div>
          <div className="progress"><div style={{ width: `${task.progress}%` }} /></div>
          {failed && <p className="muted small-text">❌ {task.error || 'El procesamiento falló.'}</p>}
          {done && (
            <div className="tools">
              <button onClick={() => loadResult('orthophoto.tif', onLoadOrtho, 'ortomosaico')}>
                🗺️ Cargar orto
              </button>
              <button onClick={() => loadResult('dsm.tif', onLoadDSM, 'DSM')}>
                ⛰️ Cargar DSM
              </button>
              <button
                onClick={async () => {
                  onStatus?.('Abriendo informe de calidad…')
                  try {
                    await openQualityReport(task.uuid)
                    onStatus?.(null)
                  } catch (err) {
                    onStatus?.(`Informe no disponible: ${err.message}`)
                  }
                }}
                title="Informe PDF de OpenDroneMap: cobertura, calibración, error de reproyección, GSD real"
              >
                📊 Informe calidad
              </button>
              <button
                onClick={async () => {
                  onStatus?.('Descargando modelo 3D texturizado…')
                  try {
                    await saveAsset(task.uuid, 'textured_model.zip', `${projectName || 'modelo'}-3d-obj.zip`)
                    onStatus?.('🏠 Modelo 3D (OBJ) descargado — impórtalo en ArchiCAD/Vectorworks/Blender.')
                  } catch (err) {
                    onStatus?.(`Modelo 3D no disponible: ${err.message}`)
                  }
                }}
                title="Malla 3D texturizada (OBJ + texturas) generada por OpenDroneMap"
              >
                🏠 Modelo 3D (OBJ)
              </button>
              <button
                onClick={async () => {
                  onStatus?.('Descargando nube de puntos…')
                  try {
                    await saveAsset(task.uuid, 'georeferenced_model.laz', `${projectName || 'nube'}.laz`)
                    onStatus?.('☁️ Nube de puntos LAZ descargada — impórtala en ArchiCAD/Vectorworks/CloudCompare.')
                  } catch (err) {
                    onStatus?.(`Nube de puntos no disponible: ${err.message}`)
                  }
                }}
                title="Nube de puntos georreferenciada (LAZ) generada por OpenDroneMap"
              >
                ☁️ Nube (LAZ)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
