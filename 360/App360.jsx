import { useState } from 'react'
import Pano360View from '../src/components/Pano360View.jsx'

/**
 * Workpulse 360 — app independiente para medir espacios con cámaras 360°
 * (Insta360 y similares). Sin mapas ni drone: una foto, tres modos de medida.
 */
export default function App360() {
  const [panoURL, setPanoURL] = useState(null)

  function onFile(e) {
    const f = e.target.files?.[0]
    if (f) setPanoURL(URL.createObjectURL(f))
    e.target.value = ''
  }

  if (panoURL) {
    return (
      <div className="app360-stage">
        <Pano360View
          imageURL={panoURL}
          onClose={() => {
            URL.revokeObjectURL(panoURL)
            setPanoURL(null)
          }}
        />
      </div>
    )
  }

  return (
    <div className="app360-landing">
      <header className="brand">
        <h1>Workpulse<span>360</span></h1>
        <p>Medición de espacios con cámara 360°</p>
      </header>

      <label className="filebtn app360-open">
        📷 Abrir foto 360° y medir
        <input type="file" accept="image/jpeg,image/png" hidden onChange={onFile} />
      </label>

      <section className="app360-steps">
        <div className="app360-step">
          <b>1 · Captura</b>
          <p>
            Coloca la cámara (Insta360, Ricoh Theta…) en un trípode o palo a
            <b> altura conocida</b> — p. ej. 1.60 m — en medio del espacio y toma
            la foto.
          </p>
        </div>
        <div className="app360-step">
          <b>2 · Exporta</b>
          <p>
            Desde la app de la cámara, exporta en formato
            <b> equirectangular</b> (la imagen 360 completa "desplegada", 2:1).
          </p>
        </div>
        <div className="app360-step">
          <b>3 · Mide</b>
          <p>
            Ábrela aquí e indica la altura de la cámara. Tres modos:
            <b> 📏 distancia</b> entre puntos del suelo, <b>📐 área</b> de la
            estancia, y <b>📊 altura</b> de paredes u objetos.
          </p>
        </div>
      </section>

      <p className="hint app360-note">
        Las medidas se calculan por trigonometría sobre el plano del suelo:
        funciona en suelos planos y depende de que la altura de cámara esté bien
        medida. Todo se procesa en tu dispositivo — las fotos no se suben a
        ningún servidor.
      </p>

      <footer className="app360-foot">
        ¿Mediciones de terreno con drone? →{' '}
        <a href="../">Workpulse Drohne 🚁</a>
      </footer>
    </div>
  )
}
