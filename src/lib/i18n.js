// 🌐 Bilingüe ES / DE (Schweizer Hochdeutsch: siempre «ss», nunca «ß»).
//
// Modelo gettext ligero: la cadena española ES la clave. t('📏 Distancia')
// devuelve la traducción alemana cuando el idioma es 'de' y la propia cadena
// en español (o si falta la traducción — degradación visible pero funcional).
// Soporta parámetros: t('Viento {v} m/s', { v: 3.2 }).

import { useSyncExternalStore } from 'react'

const KEY = 'workpulse.lang'
let lang = (typeof localStorage !== 'undefined' && localStorage.getItem(KEY)) || 'es'
const listeners = new Set()

export function getLang() {
  return lang
}

export function setLang(l) {
  lang = l === 'de' ? 'de' : 'es'
  try {
    localStorage.setItem(KEY, lang)
  } catch { /* almacenamiento no disponible */ }
  listeners.forEach((fn) => fn())
}

/** Hook: re-renderiza el componente cuando cambia el idioma. */
export function useLang() {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
    () => lang
  )
}

/** Traduce una cadena (clave = texto español) con parámetros {x} opcionales. */
export function t(s, params) {
  let out = lang === 'de' ? (DE[s] ?? s) : s
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      out = out.replaceAll(`{${k}}`, String(v))
    }
  }
  return out
}

// --- Diccionario ES → DE (Schweizer Hochdeutsch) ---
export const DE = {
  // Marca y cabecera
  'Medición fotogramétrica · Berna 🇨🇭': 'Photogrammetrische Vermessung · Bern 🇨🇭',
  '📖 Manual': '📖 Handbuch',
  '🎓 Tour guiado': '🎓 Geführte Tour',
  '🔍 Buscar dirección o lugar en Suiza…': '🔍 Adresse oder Ort in der Schweiz suchen…',
  'Proyecto': 'Projekt',
  'Nuevo proyecto': 'Neues Projekt',
  '📐 Medir': '📐 Messen',
  '⚙️ Procesar': '⚙️ Verarbeiten',

  // Herramientas
  'Herramienta': 'Werkzeug',
  '✋ Mover': '✋ Bewegen',
  'Navegar por el mapa': 'Auf der Karte navigieren',
  '📏 Distancia': '📏 Distanz',
  'Clic para trazar; doble clic para terminar': 'Klicken zum Zeichnen; Doppelklick zum Abschliessen',
  '⬛ Área': '⬛ Fläche',
  'Traza un polígono cerrado': 'Zeichne ein geschlossenes Polygon',
  '⛰️ Volumen': '⛰️ Volumen',
  'Requiere DSM cargado; traza el contorno del acopio': 'Benötigt ein geladenes DSM; zeichne die Kontur des Haufens',
  '📍 Punto GPS': '📍 GPS-Punkt',
  'Clic para registrar coordenadas': 'Klicken, um Koordinaten zu erfassen',
  '🛫 Plan de vuelo': '🛫 Flugplan',
  'Dibuja la zona a mapear; se genera la rejilla y la misión KMZ': 'Zeichne das Gebiet; Raster und KMZ-Mission werden erzeugt',
  '🏠 Órbita fachadas': '🏠 Fassaden-Orbit',
  'Toca el centro del edificio: 3 órbitas a distintas alturas para fachadas, ventanas y techo': 'Tippe auf die Gebäudemitte: 3 Umkreisungen auf verschiedenen Höhen für Fassaden, Fenster und Dach',
  '☀️ Techo solar': '☀️ Solardach',
  'Toca un techo: informe solar oficial (sonnendach.ch) al instante': 'Tippe auf ein Dach: offizieller Solarbericht (sonnendach.ch) sofort',
  '🧠 Radiografía': '🧠 Standort-Dossier',
  'Toca cualquier punto: dossier oficial completo del sitio en un segundo': 'Tippe auf einen Punkt: komplettes offizielles Standort-Dossier in einer Sekunde',

  // Modos de base de volumen
  'Base': 'Basis',
  'Cota mínima': 'Minimale Kote',
  'Cota media': 'Mittlere Kote',
  'Perímetro (interpolado)': 'Umriss (interpoliert)',
  '🇨🇭 Terreno oficial swissALTI3D': '🇨🇭 Offizielles Gelände swissALTI3D',
  '⏮️ Vuelo anterior (diferencia)': '⏮️ Vorheriger Flug (Differenz)',
  '🎯 Cota de diseño (desmonte/terraplén)': '🎯 Sollkote (Abtrag/Auftrag)',
  'Cota de diseño (rasante objetivo, m s.n.m.):': 'Sollkote (Zielhöhe, m ü. M.):',
  '⚠️ Cota de diseño no válida.': '⚠️ Ungültige Sollkote.',
  'Pendiente (%, 0 = plano horizontal):': 'Gefälle (%, 0 = horizontale Ebene):',
  'Dirección de bajada (° desde el norte):': 'Gefällerichtung (° ab Norden):',
  'Calculando desmonte/terraplén…': 'Berechne Abtrag/Auftrag…',
  'Desmonte': 'Abtrag',
  'Terraplén': 'Auftrag',
  'neto': 'netto',
  'mapa de calor: rojo excavar, azul rellenar': 'Heatmap: rot abtragen, blau auffüllen',

  // Suiza 3D
  '🏙️ Suiza 3D — casas y terreno oficiales': '🏙️ Schweiz 3D — offizielle Gebäude und Gelände',
  'Centra el mapa en la casa y ábrelo: la ves en 3D con su entorno y mides alturas reales — antes de volar.': 'Zentriere die Karte auf das Haus und öffne die Ansicht: du siehst es in 3D mit Umgebung und misst echte Höhen — vor dem Flug.',
  '🏙️ Suiza 3D — edificios y terreno oficiales': '🏙️ Schweiz 3D — offizielle Gebäude und Gelände',
  'Toca 2 puntos para medir (también sobre edificios) · Esc borra': 'Tippe 2 Punkte zum Messen (auch auf Gebäuden) · Esc löscht',
  '🗑️ borrar medición': '🗑️ Messung löschen',
  '✕ cerrar': '✕ schliessen',
  '🏙️ Cargando edificios y terreno oficiales…': '🏙️ Lade offizielle Gebäude und Gelände…',

  // Clima
  '¿Puedo volar ahora aquí?': 'Kann ich hier jetzt fliegen?',
  'Consultando…': 'Abfrage läuft…',
  '✅ Buenas condiciones': '✅ Gute Bedingungen',
  '⚠️ Volable con precaución': '⚠️ Fliegen mit Vorsicht',
  '❌ No recomendado': '❌ Nicht empfohlen',
  'rachas': 'Böen',
  'sol': 'Sonne',
  '📸 Mejores horas hoy para mapear:': '📸 Beste Stunden heute zum Kartieren:',
  'Activa la capa 🚫 (control de capas) para ver las zonas de restricción de drones oficiales (BAZL).': 'Aktiviere die Ebene 🚫 (Ebenen-Steuerung), um die offiziellen Drohnen-Beschränkungszonen (BAZL) zu sehen.',
  'Viento {v} m/s — demasiado para un drone ligero': 'Wind {v} m/s — zu viel für eine leichte Drohne',
  'Viento {v} m/s — volable con cuidado': 'Wind {v} m/s — Fliegen mit Vorsicht möglich',
  'Rachas de {v} m/s': 'Böen von {v} m/s',
  'Lluvia ahora mismo': 'Regen im Moment',
  'Temperatura {v} °C — batería sufre': 'Temperatur {v} °C — Akku leidet',
  'Sol bajo ({v}°) — sombras largas en las fotos': 'Tiefe Sonne ({v}°) — lange Schatten in den Fotos',
  'Está precipitando — los drones no son impermeables': 'Es regnet — Drohnen sind nicht wasserdicht',
  '{v} °C — la batería rinde menos con frío': '{v} °C — der Akku leistet bei Kälte weniger',
  '{v} °C — riesgo de sobrecalentamiento': '{v} °C — Überhitzungsgefahr',
  'Es de noche — vuelo nocturno con requisitos extra': 'Es ist Nacht — Nachtflug mit Zusatzanforderungen',
  'Sol bajo ({v}°) — sombras largas, peor fotogrametría': 'Tiefe Sonne ({v}°) — lange Schatten, schlechtere Photogrammetrie',
  'Viento suave, sin lluvia y buena luz': 'Schwacher Wind, kein Regen und gutes Licht',
  '📡 Medido ahora': '📡 Jetzt gemessen',
  'hace {n} min': 'vor {n} Min.',

  // Plan de vuelo
  '🛫 Plan de vuelo ': '🛫 Flugplan ',
  '✕ quitar': '✕ entfernen',
  'Altura:': 'Höhe:',
  'Solape frontal:': 'Längsüberlappung:',
  'Solape lateral:': 'Querüberlappung:',
  'Velocidad:': 'Geschwindigkeit:',
  '⛰️ Seguir el terreno (GSD constante)': '⛰️ Geländefolge (konstante GSD)',
  'fotos': 'Fotos',
  'líneas': 'Linien',
  '💾 Descargar misión KMZ (DJI Fly)': '💾 KMZ-Mission herunterladen (DJI Fly)',
  '⚠️ Demasiados waypoints para DJI Fly (~180 máx). Sube la altura o reduce la zona.': '⚠️ Zu viele Wegpunkte für DJI Fly (~180 max). Höhe erhöhen oder Gebiet verkleinern.',
  '⚠️ Supera una batería (~30 min reales). Divide la zona en dos vuelos.': '⚠️ Übersteigt einen Akku (~30 Min real). Teile das Gebiet in zwei Flüge.',

  // Órbita
  '🏠 Órbita de fachadas': '🏠 Fassaden-Orbit',
  'Radio:': 'Radius:',
  'Altura edificio:': 'Gebäudehöhe:',
  'Fotos por vuelta:': 'Fotos pro Runde:',
  'en fachada': 'an der Fassade',
  '💾 Descargar misión órbita (KMZ)': '💾 Orbit-Mission herunterladen (KMZ)',

  // Procesar
  'Verificación en campo': 'Kontrolle im Feld',
  '📷 Verificar cobertura del vuelo': '📷 Flugabdeckung prüfen',
  'Fotos del vuelo → orto + DSM': 'Flugfotos → Ortho + DSM',
  'O carga GeoTIFF a mano': 'Oder GeoTIFF manuell laden',
  '🗺️ Ortomosaico (GeoTIFF)': '🗺️ Orthomosaik (GeoTIFF)',
  '⛰️ DSM (GeoTIFF)': '⛰️ DSM (GeoTIFF)',
  '⏮️ DSM del vuelo anterior (comparar)': '⏮️ DSM des vorherigen Flugs (vergleichen)',
  'Opacidad orto': 'Ortho-Deckkraft',
  '🧊 Vista 3D del terreno': '🧊 3D-Ansicht des Geländes',
  '🔥 Mapa de calor de cambios': '🔥 Veränderungs-Heatmap',
  '🇨🇭 Terreno oficial — sin volar': '🇨🇭 Offizielles Gelände — ohne Flug',
  '🏔️ Cargar terreno oficial (vista actual)': '🏔️ Offizielles Gelände laden (aktuelle Ansicht)',
  '🏔️→⏮️ Terreno oficial como base de comparación': '🏔️→⏮️ Offizielles Gelände als Vergleichsbasis',
  'Interiores / cámara 360°': 'Innenräume / 360°-Kamera',
  '📷 Abrir Workpulse 360 ↗': '📷 Workpulse 360 öffnen ↗',
  'La medición con cámaras 360° (Insta360) es una app aparte, hecha para espacios interiores.': 'Die Messung mit 360°-Kameras (Insta360) ist eine eigene App für Innenräume.',

  // Listas
  'Mediciones': 'Messungen',
  'Sin mediciones todavía.': 'Noch keine Messungen.',
  'Puntos GPS': 'GPS-Punkte',
  'Sin puntos todavía.': 'Noch keine Punkte.',
  '🏢 Planos de fachada': '🏢 Fassadenpläne',
  '✏️ nuevo': '✏️ neu',
  'huecos': 'Öffnungen',
  'sin escala': 'ohne Massstab',
  'Alzados acotados desde fotos de fachada (vuelo 🏠).': 'Bemasste Ansichten aus Fassadenfotos (Flug 🏠).',
  'Puntos de control GCP': 'Passpunkte (GCP)',
  '+ añadir': '+ hinzufügen',
  '🎯 editor': '🎯 Editor',
  'Sin GCP. Necesarios para precisión topográfica.': 'Keine GCP. Nötig für Vermessungsgenauigkeit.',

  // Exportar
  'Exportar': 'Exportieren',
  'CSV puntos': 'CSV Punkte',
  'Lista GCP': 'GCP-Liste',
  '🏗️ DXF 3D (CAD)': '🏗️ DXF 3D (CAD)',
  '☁️ Nube XYZ': '☁️ XYZ-Punktwolke',
  '🗺️ Situationsplan': '🗺️ Situationsplan',
  '🖨️ Informe': '🖨️ Bericht',
  '💾 Copia': '💾 Backup',
  '📂 Restaurar': '📂 Wiederherstellen',

  // Barra de dibujo
  '↩️ Deshacer punto': '↩️ Punkt rückgängig',
  '✔️ Terminar': '✔️ Abschliessen',
  '🗑️ Reiniciar': '🗑️ Neu beginnen',
  '✕ Salir': '✕ Verlassen',

  // Radiografía (tarjeta)
  '🧠 Radiografía del terreno': '🧠 Standort-Dossier',
  '🖨️ PDF': '🖨️ PDF',
  '✅ Sin restricciones de drones registradas aquí': '✅ Keine Drohnen-Beschränkungen an diesem Punkt registriert',
  'Fuera de zona de construcción registrada': 'Ausserhalb registrierter Bauzone',
  'Restricciones legales (ÖREB)': 'Rechtliche Beschränkungen (ÖREB)',
  'construido': 'Baujahr',
  'parcela': 'Parzelle',
  'mejores horas:': 'beste Stunden:',
  'protección': 'Schutz',
  'vinculante': 'rechtsverbindlich',
  'Paisaje protegido BLN:': 'BLN-Schutzlandschaft:',

  // Manual
  '📖 Manual de Workpulse Drohne': '📖 Workpulse Drohne Handbuch',
  '✕ Guardar y cerrar': '✕ Speichern und schliessen',
  '← Anterior': '← Zurück',
  'Siguiente →': 'Weiter →',
  '▶️ Probar ahora': '▶️ Jetzt ausprobieren',
  'Cómo se usa': 'So wird es verwendet',
  '💡 Consejo:': '💡 Tipp:',

  // Tour
  '¡Bienvenido a Workpulse Drohne! 🚁': 'Willkommen bei Workpulse Drohne! 🚁',
  'Te enseño la app en un minuto. Puedes salir cuando quieras con ✕ o la tecla Esc.': 'Ich zeige dir die App in einer Minute. Du kannst jederzeit mit ✕ oder Esc aussteigen.',
  '🔍 Buscador suizo': '🔍 Schweizer Suche',
  'Escribe cualquier dirección o lugar de Suiza y el mapa vuela hasta ahí (servicio oficial de geo.admin.ch).': 'Tippe eine Adresse oder einen Ort in der Schweiz ein und die Karte fliegt dorthin (offizieller Dienst von geo.admin.ch).',
  '📁 Proyectos': '📁 Projekte',
  'Cada trabajo vive en su proyecto. Todo lo que midas se guarda aquí automáticamente, en este navegador. Crea uno nuevo con ＋.': 'Jeder Auftrag lebt in seinem Projekt. Alles, was du misst, wird hier automatisch gespeichert — in diesem Browser. Erstelle ein neues mit ＋.',
  '📐 Medir / ⚙️ Procesar': '📐 Messen / ⚙️ Verarbeiten',
  'Dos pestañas: en Medir están las herramientas del día a día; en Procesar conviertes las fotos del vuelo en mapas, cargas el terreno oficial 🏔️ y comparas vuelos 🔥.': 'Zwei Tabs: in Messen sind die Alltagswerkzeuge; in Verarbeiten machst du aus Flugfotos Karten, lädst das offizielle Gelände 🏔️ und vergleichst Flüge 🔥.',
  '🧰 Las herramientas': '🧰 Die Werkzeuge',
  'Distancias con perfil de elevación, áreas, volúmenes, puntos GPS en LV95, plan de vuelo para tu DJI, informe solar de techos y la Radiografía 🧠 que cruza todas las fuentes oficiales de un toque.': 'Distanzen mit Höhenprofil, Flächen, Volumen, GPS-Punkte in LV95, Flugplan für deine DJI, Solardach-Bericht und das Standort-Dossier 🧠, das alle offiziellen Quellen mit einem Tipp verknüpft.',
  '🌤️ ¿Puedo volar?': '🌤️ Kann ich fliegen?',
  'Veredicto de vuelo al instante: pronóstico + viento MEDIDO ahora mismo por la estación oficial más cercana, y las mejores horas del día para mapear.': 'Sofortiges Flugurteil: Prognose + JETZT gemessener Wind der nächsten offiziellen Station, plus die besten Stunden des Tages zum Kartieren.',
  '📋 Tus mediciones': '📋 Deine Messungen',
  'Todo lo medido queda listado y dibujado en el mapa con su etiqueta. Borra con ✕, y gestiona también tus puntos GPS y puntos de control GCP.': 'Alles Gemessene wird gelistet und mit Beschriftung auf der Karte gezeichnet. Löschen mit ✕; verwalte auch deine GPS-Punkte und Passpunkte (GCP).',
  '💾 Exportar': '💾 Exportieren',
  'GeoJSON, KML, GPX, CSV con coordenadas suizas, informe imprimible y copia de seguridad del proyecto. Tus datos nunca están atrapados.': 'GeoJSON, KML, GPX, CSV mit Schweizer Koordinaten, druckbarer Bericht und Projekt-Backup. Deine Daten sind nie eingesperrt.',
  '🗺️ El mapa': '🗺️ Die Karte',
  'Ortofoto oficial de 10 cm, control de capas (catastro, restricciones de drones 🚫, techos solares, fauna 🦌), tu posición GPS y coordenadas LV95 en vivo. Aquí dibujas todas las mediciones.': 'Offizielles 10-cm-Orthofoto, Ebenen-Steuerung (Kataster, Drohnen-Beschränkungen 🚫, Solardächer, Wildtiere 🦌), deine GPS-Position und LV95-Koordinaten live. Hier zeichnest du alle Messungen.',
  '📖 ¿Dudas después?': '📖 Fragen später?',
  'El manual completo vive aquí: un capítulo por herramienta, con ilustraciones y el botón "Probar ahora". ¡A volar! 🚁': 'Das komplette Handbuch lebt hier: ein Kapitel pro Werkzeug, mit Illustrationen und dem Knopf «Jetzt ausprobieren». Guten Flug! 🚁',

  // Cajetines de planos (entregables)
  'Escala': 'Massstab',
  'Situationsplan': 'Situationsplan',
  'Parcela': 'Parzelle',

  // Editor de fachadas
  '🏢 Editor de fachadas': '🏢 Fassaden-Editor',
  'Fachada': 'Fassade',
  '📷 Cargar foto de la fachada': '📷 Fassadenfoto laden',
  '📷 Cambiar foto': '📷 Foto wechseln',
  '📐 Rectificar': '📐 Entzerren',
  '📏 Calibrar': '📏 Kalibrieren',
  '⬛ Contorno': '⬛ Umriss',
  '🪟 Hueco': '🪟 Öffnung',
  '➖ Línea': '➖ Linie',
  'Estado': 'Status',
  'Exportar plano': 'Plan exportieren',
  '🖨️ PDF a escala': '🖨️ PDF im Massstab',
  '📐 DXF (CAD)': '📐 DXF (CAD)',
  '🖼️ SVG': '🖼️ SVG',

  // Editor GCP
  '🎯 Editor de GCP': '🎯 GCP-Editor',
  '✕ Cerrar': '✕ Schliessen',
  'Diana activa': 'Aktive Zielmarke',
  'Fotos': 'Fotos',

  // Inspección
  '📋 Inspecciones': '📋 Inspektionen',
  'Informe de defectos con fotos anotadas (tejados, fachadas).': 'Mängelbericht mit annotierten Fotos (Dächer, Fassaden).',
  'Editor de inspección': 'Inspektions-Editor',
  'Nombre del informe': 'Berichtsname',
  'Inspección': 'Inspektion',
  'Añadir fotos del vuelo': 'Flugfotos hinzufügen',
  'sin GPS': 'ohne GPS',
  'Anotar': 'Annotieren',
  'Borrar anotaciones': 'Annotationen löschen',
  'Gravedad': 'Schweregrad',
  'Categoría': 'Kategorie',
  'Observación': 'Bemerkung',
  'Descripción del defecto…': 'Beschreibung des Mangels…',
  'Registrar defecto': 'Mangel erfassen',
  'Defecto registrado': 'Mangel erfasst',
  'Defectos': 'Mängel',
  'defectos': 'Mängel',
  'Defecto': 'Mangel',
  'Anota una foto y registra el defecto.': 'Annotiere ein Foto und erfasse den Mangel.',
  'Informe PDF': 'PDF-Bericht',
  'Añade las fotos del vuelo, anótalas (flecha/caja/punto) y registra cada defecto.': 'Füge die Flugfotos hinzu, annotiere sie (Pfeil/Box/Punkt) und erfasse jeden Mangel.',
  'Rueda = zoom · ✋ mover.': 'Rad = Zoom · ✋ verschieben.',
  'Registra al menos un defecto para el informe.': 'Erfasse mindestens einen Mangel für den Bericht.',
  'El navegador bloqueó la ventana del informe.': 'Der Browser hat das Berichtsfenster blockiert.',
  'Generando el informe…': 'Bericht wird erstellt…',
  'Informe de inspección': 'Inspektionsbericht',
  'Mapa de defectos': 'Mängelkarte',
  'Resumen': 'Zusammenfassung',
  'Detalle': 'Detail',
  'Informe de inspección listo': 'Inspektionsbericht fertig',
  'Informe generado sin mapa (sin conexión)': 'Bericht ohne Karte erstellt (offline)',
  'Fuentes: ortofoto SWISSIMAGE © swisstopo. Documento orientativo generado con Workpulse Drohne.': 'Quellen: Orthofoto SWISSIMAGE © swisstopo. Orientierungsdokument, erstellt mit Workpulse Drohne.',

  // Manual: capítulos
  'Primeros pasos': 'Erste Schritte',
  'Workpulse Drohne convierte tu DJI Mini 4 Pro en un instrumento de medición topográfica. Todo pasa sobre el mapa oficial suizo (swisstopo), y tu trabajo se guarda solo en este navegador, organizado por proyectos.': 'Workpulse Drohne macht aus deiner DJI Mini 4 Pro ein Vermessungsinstrument. Alles läuft auf der offiziellen Schweizer Karte (swisstopo), und deine Arbeit wird nur in diesem Browser gespeichert, organisiert in Projekten.',
  'Busca cualquier dirección o lugar de Suiza con el buscador 🔍 de arriba.': 'Suche jede Adresse oder jeden Ort der Schweiz mit der Suche 🔍 oben.',
  'Cambia la capa base (ortofoto o mapa nacional) y activa capas oficiales con el control de capas del mapa: 📐 catastro, 🚫 restricciones de drones, ☀️ techos solares, 🦌 fauna.': 'Wechsle die Basiskarte (Orthofoto oder Landeskarte) und aktiviere offizielle Ebenen: 📐 Kataster, 🚫 Drohnen-Beschränkungen, ☀️ Solardächer, 🦌 Wildtiere.',
  'Crea un proyecto por cada trabajo o sitio con el botón ＋; todo lo que midas se guarda en él automáticamente.': 'Erstelle pro Auftrag oder Standort ein Projekt mit ＋; alles Gemessene wird automatisch darin gespeichert.',
  'En el mapa, abajo, siempre ves las coordenadas suizas LV95 del cursor.': 'Unten auf der Karte siehst du immer die Schweizer LV95-Koordinaten des Cursors.',
  'La app funciona también sin conexión una vez cargada (es instalable como app en el móvil: "Añadir a pantalla de inicio").': 'Die App funktioniert nach dem Laden auch offline (als App installierbar: «Zum Startbildschirm hinzufügen»).',
  'Medir distancias': 'Distanzen messen',
  'Medir áreas': 'Flächen messen',
  'Medir volúmenes': 'Volumen messen',
  'Puntos GPS': 'GPS-Punkte',
  'Plan de vuelo y misión': 'Flugplan und Mission',
  'Casas: fachadas y CAD': 'Häuser: Fassaden und CAD',
  'Techo solar': 'Solardach',
  'Radiografía del terreno': 'Standort-Dossier',
  '¿Puedo volar ahora?': 'Kann ich jetzt fliegen?',
  'Suiza 3D: casas y terreno': 'Schweiz 3D: Häuser und Gelände',
  'Terreno oficial sin volar': 'Offizielles Gelände ohne Flug',
  'Procesar un vuelo': 'Einen Flug verarbeiten',
  'Comparar vuelos': 'Flüge vergleichen',
  'Puntos de control (GCP)': 'Passpunkte (GCP)',
  'Exportar e informes': 'Export und Berichte',
  'Planos de fachada': 'Fassadenpläne',
  'Informe de inspección': 'Inspektionsbericht',
  'Workpulse 360 (interiores)': 'Workpulse 360 (Innenräume)',
}
