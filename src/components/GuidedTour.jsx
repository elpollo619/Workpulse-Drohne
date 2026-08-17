import { useEffect, useLayoutEffect, useState } from 'react'
import { t, useLang } from '../lib/i18n.js'

// 🎓 Tour guiado: recorre la interfaz REAL resaltando cada elemento con un
// foco y una tarjeta explicativa. Los objetivos se localizan por atributo
// data-tour; si un paso no encuentra su elemento, se salta solo.

const STEPS = [
  {
    target: null,
    title: '¡Bienvenido a Workpulse Drohne! 🚁',
    text: 'Te enseño la app en un minuto. Puedes salir cuando quieras con ✕ o la tecla Esc.',
  },
  {
    target: 'search',
    title: '🔍 Buscador suizo',
    text: 'Escribe cualquier dirección o lugar de Suiza y el mapa vuela hasta ahí (servicio oficial de geo.admin.ch).',
  },
  {
    target: 'project',
    title: '📁 Proyectos',
    text: 'Cada trabajo vive en su proyecto. Todo lo que midas se guarda aquí automáticamente, en este navegador. Crea uno nuevo con ＋.',
  },
  {
    target: 'tabs',
    title: '📐 Medir / ⚙️ Procesar',
    text: 'Dos pestañas: en Medir están las herramientas del día a día; en Procesar conviertes las fotos del vuelo en mapas, cargas el terreno oficial 🏔️ y comparas vuelos 🔥.',
  },
  {
    target: 'tools',
    title: '🧰 Las herramientas',
    text: 'Distancias con perfil de elevación, áreas, volúmenes, puntos GPS en LV95, plan de vuelo para tu DJI, informe solar de techos y la Radiografía 🧠 que cruza todas las fuentes oficiales de un toque.',
  },
  {
    target: 'weather',
    title: '🌤️ ¿Puedo volar?',
    text: 'Veredicto de vuelo al instante: pronóstico + viento MEDIDO ahora mismo por la estación oficial más cercana, y las mejores horas del día para mapear.',
  },
  {
    target: 'lists',
    title: '📋 Tus mediciones',
    text: 'Todo lo medido queda listado y dibujado en el mapa con su etiqueta. Borra con ✕, y gestiona también tus puntos GPS y puntos de control GCP.',
  },
  {
    target: 'export',
    title: '💾 Exportar',
    text: 'GeoJSON, KML, GPX, CSV con coordenadas suizas, informe imprimible y copia de seguridad del proyecto. Tus datos nunca están atrapados.',
  },
  {
    target: 'map',
    title: '🗺️ El mapa',
    text: 'Ortofoto oficial de 10 cm, control de capas (catastro, restricciones de drones 🚫, techos solares, fauna 🦌), tu posición GPS y coordenadas LV95 en vivo. Aquí dibujas todas las mediciones.',
  },
  {
    target: 'manual',
    title: '📖 ¿Dudas después?',
    text: 'El manual completo vive aquí: un capítulo por herramienta, con ilustraciones y el botón "Probar ahora". ¡A volar! 🚁',
  },
]

export default function GuidedTour({ onClose }) {
  useLang() // re-renderiza al cambiar de idioma
  const [i, setI] = useState(0)
  const [rect, setRect] = useState(null)
  const step = STEPS[i]

  // Localiza y encuadra el objetivo del paso actual (se recalcula al
  // redimensionar). Si no existe, salta al siguiente.
  useLayoutEffect(() => {
    function measure() {
      if (!step.target) return setRect(null)
      const el = document.querySelector(`[data-tour="${step.target}"]`)
      if (!el) return setRect(undefined)
      el.scrollIntoView({ block: 'nearest' })
      const r = el.getBoundingClientRect()
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [i, step.target])

  // Paso sin elemento en pantalla → saltarlo (p.ej. layouts móviles).
  useEffect(() => {
    if (rect === undefined) {
      setI((v) => (v + 1 < STEPS.length ? v + 1 : v))
      if (i === STEPS.length - 1) onClose?.()
    }
  }, [rect, i, onClose])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
      else if (e.key === 'ArrowRight' || e.key === 'Enter') setI((v) => Math.min(v + 1, STEPS.length - 1))
      else if (e.key === 'ArrowLeft') setI((v) => Math.max(v - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const PAD = 6
  const spot = rect
    ? {
        top: rect.top - PAD,
        left: rect.left - PAD,
        width: rect.width + PAD * 2,
        height: rect.height + PAD * 2,
      }
    : null

  // La tarjeta se coloca bajo el foco si cabe; si no, encima o centrada.
  let cardStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  if (spot) {
    const below = spot.top + spot.height + 12
    const fitsBelow = below + 180 < window.innerHeight
    const left = Math.max(12, Math.min(spot.left, window.innerWidth - 332))
    cardStyle = fitsBelow
      ? { top: below, left }
      : { top: Math.max(12, spot.top - 192), left }
  }

  return (
    <div className="tour">
      {spot ? (
        <div
          className="tour-spot"
          style={{ top: spot.top, left: spot.left, width: spot.width, height: spot.height }}
        />
      ) : (
        <div className="tour-dim" />
      )}
      <div className="tour-card" style={cardStyle}>
        <b>{t(step.title)}</b>
        <p>{t(step.text)}</p>
        <div className="tour-bar">
          <span className="tour-count">{i + 1} / {STEPS.length}</span>
          <span>
            {i > 0 && <button className="mini" onClick={() => setI(i - 1)}>← </button>}{' '}
            {i < STEPS.length - 1
              ? <button className="mini tour-next" onClick={() => setI(i + 1)}>{t('Siguiente →')}</button>
              : <button className="mini tour-next" onClick={onClose}>{t('✔️ Terminar')}</button>}{' '}
            <button className="mini" onClick={onClose}>✕</button>
          </span>
        </div>
      </div>
    </div>
  )
}
