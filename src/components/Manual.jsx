import { useState } from 'react'

// 📖 Manual interactivo: un capítulo por herramienta, con ilustración,
// explicación de para qué sirve, pasos de uso y un botón "Probar ahora" que
// cierra el manual y deja la herramienta real activada.

// --- Ilustraciones SVG (dibujadas con la paleta de la app) ---
const C = {
  line: '#2a3742', panel: '#1f2a33', text: '#e6edf3', muted: '#8b9aa7',
  green: '#34d399', blue: '#60a5fa', red: '#f87171', yellow: '#fbbf24',
}

function Frame({ children }) {
  return (
    <svg viewBox="0 0 320 180" className="man-illo" role="img">
      <rect x="4" y="4" width="312" height="172" rx="10" fill={C.panel} stroke={C.line} />
      {/* rejilla de mapa de fondo */}
      {[44, 84, 124].map((y) => (
        <line key={y} x1="8" y1={y} x2="312" y2={y} stroke={C.line} strokeWidth="0.6" />
      ))}
      {[64, 124, 184, 244].map((x) => (
        <line key={x} x1={x} y1="8" x2={x} y2="172" stroke={C.line} strokeWidth="0.6" />
      ))}
      {children}
    </svg>
  )
}

const ILLOS = {
  inicio: (
    <Frame>
      <rect x="20" y="18" width="150" height="24" rx="12" fill={C.panel} stroke={C.green} />
      <circle cx="34" cy="30" r="6" fill="none" stroke={C.muted} strokeWidth="2" />
      <line x1="38" y1="34" x2="44" y2="40" stroke={C.muted} strokeWidth="2" />
      <text x="52" y="34" fill={C.muted} fontSize="11">Bundesplatz, Bern…</text>
      <path d="M255 40 l16 8 16-8 M255 48 l16 8 16-8 M255 32 l16-8 16 8-16 8z" fill="none" stroke={C.blue} strokeWidth="2" />
      <path d="M160 120 c0-18 26-18 26 0 0 12-13 16-13 26 0-10-13-14-13-26z" fill={C.green} />
      <circle cx="173" cy="119" r="5" fill={C.panel} />
      <text x="24" y="160" fill={C.muted} fontSize="10">mapa oficial swisstopo · capas · buscador</text>
    </Frame>
  ),
  distancia: (
    <Frame>
      <circle cx="50" cy="60" r="5" fill={C.green} />
      <circle cx="150" cy="40" r="5" fill={C.green} />
      <circle cx="250" cy="70" r="5" fill={C.green} />
      <path d="M50 60 L150 40 L250 70" fill="none" stroke={C.green} strokeWidth="2.5" strokeDasharray="1 0" />
      <rect x="120" y="12" width="76" height="18" rx="9" fill={C.green} />
      <text x="158" y="25" fill="#06251b" fontSize="11" fontWeight="700" textAnchor="middle">312.4 m</text>
      <path d="M40 150 L90 128 L140 140 L200 112 L280 132 L280 160 L40 160 Z" fill={C.blue} opacity="0.25" />
      <path d="M40 150 L90 128 L140 140 L200 112 L280 132" fill="none" stroke={C.blue} strokeWidth="2" />
      <text x="44" y="172" fill={C.muted} fontSize="9">perfil de elevación oficial (↗ subida · ↘ bajada)</text>
    </Frame>
  ),
  area: (
    <Frame>
      <path d="M70 40 L240 52 L262 130 L120 150 L58 100 Z" fill={C.green} opacity="0.25" stroke={C.green} strokeWidth="2.5" />
      {[[70, 40], [240, 52], [262, 130], [120, 150], [58, 100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill={C.green} />
      ))}
      <rect x="118" y="82" width="88" height="20" rx="10" fill={C.green} />
      <text x="162" y="96" fill="#06251b" fontSize="12" fontWeight="700" textAnchor="middle">1 847 m²</text>
    </Frame>
  ),
  volumen: (
    <Frame>
      {/* montículo sobre plano base */}
      <path d="M50 130 C90 60 230 60 270 130 Z" fill={C.yellow} opacity="0.3" stroke={C.yellow} strokeWidth="2" />
      <line x1="40" y1="130" x2="280" y2="130" stroke={C.blue} strokeWidth="2" strokeDasharray="6 4" />
      <text x="44" y="145" fill={C.blue} fontSize="9">superficie base (mín · perímetro · terreno oficial…)</text>
      <path d="M160 118 L160 84" stroke={C.text} strokeWidth="1.5" markerEnd="none" />
      <path d="M156 90 L160 82 L164 90" fill="none" stroke={C.text} strokeWidth="1.5" />
      <rect x="120" y="30" width="80" height="20" rx="10" fill={C.yellow} />
      <text x="160" y="44" fill="#241a02" fontSize="12" fontWeight="700" textAnchor="middle">2 410 m³</text>
      <text x="46" y="165" fill={C.muted} fontSize="9">acopios, excavaciones, montones de grava o nieve</text>
    </Frame>
  ),
  punto: (
    <Frame>
      <path d="M150 46 c0-22 32-22 32 0 0 15-16 20-16 32 0-12-16-17-16-32z" fill={C.red} />
      <circle cx="166" cy="45" r="6" fill={C.panel} />
      <rect x="78" y="96" width="176" height="38" rx="8" fill={C.panel} stroke={C.line} />
      <text x="90" y="112" fill={C.text} fontSize="10" fontWeight="700">P1 — LV95 2 600 668 / 1 198 879</text>
      <text x="90" y="126" fill={C.muted} fontSize="10">elevación oficial: 542.0 m s.n.m.</text>
    </Frame>
  ),
  plan: (
    <Frame>
      <path d="M56 36 L268 48 L252 148 L70 138 Z" fill={C.green} opacity="0.12" stroke={C.green} strokeWidth="2" />
      {[58, 78, 98, 118].map((y, i) => (
        <line key={y} x1={i % 2 ? 246 : 78} y1={y + 6} x2={i % 2 ? 78 : 246} y2={y + 6} stroke={C.blue} strokeWidth="2" />
      ))}
      {[78, 120, 162, 204, 246].map((x) =>
        [64, 84, 104, 124].map((y) => <circle key={x + '-' + y} cx={x} cy={y} r="2.6" fill={C.yellow} />)
      )}
      <text x="160" y="166" fill={C.muted} fontSize="10" textAnchor="middle">rejilla de fotos con solape → misión KMZ para DJI Fly</text>
    </Frame>
  ),
  orbita: (
    <Frame>
      {/* casa */}
      <path d="M130 84 L160 62 L190 84 Z" fill={C.yellow} opacity="0.5" stroke={C.yellow} strokeWidth="2" />
      <rect x="138" y="84" width="44" height="34" fill={C.panel} stroke={C.line} />
      <rect x="145" y="92" width="9" height="9" fill={C.blue} opacity="0.7" />
      <rect x="166" y="92" width="9" height="9" fill={C.blue} opacity="0.7" />
      <rect x="155" y="102" width="10" height="16" fill={C.line} />
      {/* órbitas a 3 alturas */}
      <ellipse cx="160" cy="112" rx="92" ry="22" fill="none" stroke={C.yellow} strokeWidth="1.6" strokeDasharray="5 4" />
      <ellipse cx="160" cy="88" rx="102" ry="25" fill="none" stroke="#fb923c" strokeWidth="1.6" strokeDasharray="5 4" />
      <ellipse cx="160" cy="62" rx="112" ry="28" fill="none" stroke={C.red} strokeWidth="1.6" strokeDasharray="5 4" />
      {/* drone */}
      <circle cx="268" cy="66" r="5" fill={C.green} />
      <line x1="261" y1="59" x2="275" y2="73" stroke={C.green} strokeWidth="2" />
      <line x1="275" y1="59" x2="261" y2="73" stroke={C.green} strokeWidth="2" />
      <text x="160" y="164" fill={C.muted} fontSize="10" textAnchor="middle">3 vueltas mirando al edificio: fachadas, ventanas y techo</text>
    </Frame>
  ),
  fachadas: (
    <Frame>
      {/* alzado con cotas */}
      <rect x="70" y="40" width="150" height="90" fill="none" stroke={C.text} strokeWidth="2" />
      <path d="M70 40 L145 18 L220 40" fill="none" stroke={C.text} strokeWidth="2" />
      <rect x="85" y="55" width="24" height="26" fill="none" stroke={C.blue} strokeWidth="1.8" />
      <rect x="132" y="55" width="24" height="26" fill="none" stroke={C.blue} strokeWidth="1.8" />
      <rect x="180" y="55" width="24" height="26" fill="none" stroke={C.blue} strokeWidth="1.8" />
      <rect x="130" y="94" width="28" height="36" fill="none" stroke={C.blue} strokeWidth="1.8" />
      {/* cotas */}
      <line x1="70" y1="146" x2="220" y2="146" stroke={C.green} strokeWidth="1" />
      <line x1="66" y1="150" x2="74" y2="142" stroke={C.green} strokeWidth="1" />
      <line x1="216" y1="150" x2="224" y2="142" stroke={C.green} strokeWidth="1" />
      <text x="145" y="142" fill={C.green} fontSize="9" textAnchor="middle">12.40</text>
      <line x1="52" y1="40" x2="52" y2="130" stroke={C.green} strokeWidth="1" />
      <text x="46" y="88" fill={C.green} fontSize="9" textAnchor="middle" transform="rotate(-90 46 88)">6.20</text>
      <rect x="238" y="118" width="66" height="34" fill="none" stroke={C.muted} strokeWidth="1" />
      <text x="271" y="132" fill={C.muted} fontSize="8" textAnchor="middle">Nordfassade</text>
      <text x="271" y="144" fill={C.muted} fontSize="8" textAnchor="middle">1:100</text>
    </Frame>
  ),
  solar: (
    <Frame>
      <circle cx="258" cy="38" r="14" fill={C.yellow} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line
          key={a}
          x1={258 + 20 * Math.cos((a * Math.PI) / 180)} y1={38 + 20 * Math.sin((a * Math.PI) / 180)}
          x2={258 + 26 * Math.cos((a * Math.PI) / 180)} y2={38 + 26 * Math.sin((a * Math.PI) / 180)}
          stroke={C.yellow} strokeWidth="2"
        />
      ))}
      <path d="M70 100 L130 58 L190 100 Z" fill={C.yellow} opacity="0.5" stroke={C.yellow} strokeWidth="2" />
      <rect x="82" y="100" width="96" height="46" fill={C.panel} stroke={C.line} />
      <rect x="120" y="118" width="20" height="28" fill={C.line} />
      <text x="60" y="168" fill={C.muted} fontSize="10">aptitud · m² · kWh/año — catastro solar oficial</text>
    </Frame>
  ),
  radiografia: (
    <Frame>
      <circle cx="160" cy="90" r="10" fill={C.green} />
      {[24, 42, 60].map((r) => (
        <circle key={r} cx="160" cy="90" r={r} fill="none" stroke={C.green} opacity={0.5 - r / 200} strokeWidth="1.5" />
      ))}
      <rect x="18" y="20" width="86" height="18" rx="9" fill={C.panel} stroke={C.red} />
      <text x="61" y="33" fill={C.red} fontSize="9.5" textAnchor="middle">🚫 zona drones</text>
      <rect x="216" y="20" width="86" height="18" rx="9" fill={C.panel} stroke={C.yellow} />
      <text x="259" y="33" fill={C.yellow} fontSize="9.5" textAnchor="middle">☀️ techo solar</text>
      <rect x="18" y="142" width="86" height="18" rx="9" fill={C.panel} stroke={C.blue} />
      <text x="61" y="155" fill={C.blue} fontSize="9.5" textAnchor="middle">🏗️ zona constr.</text>
      <rect x="216" y="142" width="86" height="18" rx="9" fill={C.panel} stroke={C.green} />
      <text x="259" y="155" fill={C.green} fontSize="9.5" textAnchor="middle">🦌 fauna · BLN</text>
    </Frame>
  ),
  clima: (
    <Frame>
      <path d="M30 60 q30-16 60 0 t60 0" fill="none" stroke={C.blue} strokeWidth="2.5" />
      <path d="M142 56 l12 4 -10 8" fill="none" stroke={C.blue} strokeWidth="2.5" />
      <path d="M30 92 q40-14 80 0 t80 0" fill="none" stroke={C.blue} strokeWidth="2" opacity="0.6" />
      {/* torre de estación */}
      <path d="M248 150 L258 96 L268 150 Z" fill="none" stroke={C.muted} strokeWidth="2" />
      <line x1="248" y1="132" x2="268" y2="132" stroke={C.muted} strokeWidth="2" />
      {[10, 18].map((r) => (
        <path key={r} d={`M${258 - r} ${86 - r * 0.2} a${r + 6} ${r + 6} 0 0 1 ${2 * r} 0`} fill="none" stroke={C.green} strokeWidth="2" />
      ))}
      <rect x="36" y="122" width="118" height="20" rx="10" fill={C.green} />
      <text x="95" y="136" fill="#06251b" fontSize="10.5" fontWeight="700" textAnchor="middle">💨 1.9 m/s · ✅ vuela</text>
      <text x="180" y="168" fill={C.muted} fontSize="9.5">pronóstico + medición real cada 10 min</text>
    </Frame>
  ),
  terreno: (
    <Frame>
      {/* tejas descargándose */}
      {[0, 1].map((i) =>
        [0, 1].map((j) => (
          <rect key={i + '-' + j} x={30 + i * 56} y={30 + j * 56} width="52" height="52" rx="4"
            fill={C.blue} opacity={0.14 + (i + j) * 0.08} stroke={C.blue} strokeWidth="1.5" />
        ))
      )}
      <path d="M150 88 l28 0 m-8 -8 l8 8 -8 8" fill="none" stroke={C.text} strokeWidth="2" />
      {/* malla 3D de montañas */}
      <path d="M192 132 L216 84 L238 112 L258 62 L284 132 Z" fill={C.green} opacity="0.3" stroke={C.green} strokeWidth="2" />
      <path d="M192 132 L284 132 M204 108 L272 108 M216 84 L258 84" stroke={C.green} strokeWidth="0.8" opacity="0.7" />
      <text x="34" y="160" fill={C.muted} fontSize="10">swissALTI3D oficial (2 m/px) → medir sin volar</text>
    </Frame>
  ),
  procesar: (
    <Frame>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={26 + i * 10} y={44 - i * 8} width="56" height="42" rx="4" fill={C.panel} stroke={C.muted} />
      ))}
      <circle cx="60" cy="52" r="7" fill={C.yellow} opacity="0.8" />
      <path d="M100 62 l26 0 m-8 -8 l8 8 -8 8" fill="none" stroke={C.text} strokeWidth="2" />
      <circle cx="160" cy="62" r="19" fill="none" stroke={C.green} strokeWidth="2.5" strokeDasharray="8 5" />
      <text x="160" y="67" fill={C.green} fontSize="12" textAnchor="middle">⚙</text>
      <path d="M192 62 l26 0 m-8 -8 l8 8 -8 8" fill="none" stroke={C.text} strokeWidth="2" />
      <rect x="230" y="34" width="62" height="26" rx="4" fill={C.green} opacity="0.35" stroke={C.green} />
      <text x="261" y="51" fill={C.text} fontSize="9" textAnchor="middle">ortofoto</text>
      <rect x="230" y="68" width="62" height="26" rx="4" fill={C.blue} opacity="0.35" stroke={C.blue} />
      <text x="261" y="85" fill={C.text} fontSize="9" textAnchor="middle">DSM 3D</text>
      <text x="34" y="150" fill={C.muted} fontSize="10">fotos del vuelo → OpenDroneMap → mapa medible</text>
    </Frame>
  ),
  comparar: (
    <Frame>
      <rect x="40" y="36" width="240" height="100" rx="6" fill={C.panel} stroke={C.line} />
      <rect x="70" y="56" width="44" height="30" rx="4" fill={C.red} opacity="0.75" />
      <rect x="150" y="90" width="60" height="26" rx="4" fill={C.blue} opacity="0.75" />
      <rect x="220" y="52" width="30" height="22" rx="4" fill={C.red} opacity="0.45" />
      <text x="92" y="50" fill={C.red} fontSize="9" textAnchor="middle">+ material añadido</text>
      <text x="180" y="130" fill={C.blue} fontSize="9" textAnchor="middle">− material retirado</text>
      <text x="160" y="160" fill={C.muted} fontSize="10" textAnchor="middle">vuelo actual − vuelo anterior (o terreno oficial)</text>
    </Frame>
  ),
  gcp: (
    <Frame>
      <rect x="36" y="30" width="150" height="110" rx="6" fill={C.panel} stroke={C.muted} />
      <circle cx="111" cy="85" r="22" fill="none" stroke={C.red} strokeWidth="2" />
      <line x1="111" y1="55" x2="111" y2="115" stroke={C.red} strokeWidth="2" />
      <line x1="81" y1="85" x2="141" y2="85" stroke={C.red} strokeWidth="2" />
      <rect x="204" y="52" width="92" height="60" rx="8" fill={C.panel} stroke={C.line} />
      <text x="250" y="72" fill={C.text} fontSize="10" fontWeight="700" textAnchor="middle">GCP1</text>
      <text x="250" y="88" fill={C.muted} fontSize="9" textAnchor="middle">46.94801, 7.44421</text>
      <text x="250" y="102" fill={C.muted} fontSize="9" textAnchor="middle">542.03 m</text>
      <text x="52" y="162" fill={C.muted} fontSize="10">marca la diana en cada foto → precisión de cm</text>
    </Frame>
  ),
  exportar: (
    <Frame>
      {[
        ['GeoJSON', C.green, 30], ['KML', C.blue, 100], ['GPX', C.yellow, 170], ['CSV', C.red, 240],
      ].map(([name, color, x]) => (
        <g key={name}>
          <path d={`M${x} 50 h34 l14 14 v56 h-48 z`} fill={C.panel} stroke={color} strokeWidth="2" />
          <path d={`M${x + 34} 50 v14 h14`} fill="none" stroke={color} strokeWidth="2" />
          <text x={x + 24} y="102" fill={color} fontSize="9.5" fontWeight="700" textAnchor="middle">{name}</text>
        </g>
      ))}
      <text x="160" y="152" fill={C.muted} fontSize="10" textAnchor="middle">+ informe imprimible y copia de seguridad del proyecto</text>
    </Frame>
  ),
  app360: (
    <Frame>
      <circle cx="100" cy="88" r="46" fill="none" stroke={C.blue} strokeWidth="2.5" />
      <ellipse cx="100" cy="88" rx="46" ry="16" fill="none" stroke={C.blue} strokeWidth="1.5" opacity="0.7" />
      <ellipse cx="100" cy="88" rx="18" ry="46" fill="none" stroke={C.blue} strokeWidth="1.5" opacity="0.7" />
      <path d="M196 60 h94 v70 h-94 z" fill="none" stroke={C.green} strokeWidth="2" />
      <path d="M196 95 h40 M236 60 v35" stroke={C.green} strokeWidth="2" />
      <text x="243" y="150" fill={C.muted} fontSize="10" textAnchor="middle">plano + medidas</text>
      <text x="100" y="152" fill={C.muted} fontSize="10" textAnchor="middle">foto 360° (Insta360)</text>
    </Frame>
  ),
}

// --- Capítulos ---
export const CHAPTERS = [
  {
    id: 'inicio', icon: '🗺️', title: 'Primeros pasos',
    what: 'Workpulse Drohne convierte tu DJI Mini 4 Pro en un instrumento de medición topográfica. Todo pasa sobre el mapa oficial suizo (swisstopo), y tu trabajo se guarda solo en este navegador, organizado por proyectos.',
    steps: [
      'Busca cualquier dirección o lugar de Suiza con el buscador 🔍 de arriba.',
      'Cambia la capa base (ortofoto o mapa nacional) y activa capas oficiales con el control de capas del mapa: 📐 catastro, 🚫 restricciones de drones, ☀️ techos solares, 🦌 fauna.',
      'Crea un proyecto por cada trabajo o sitio con el botón ＋; todo lo que midas se guarda en él automáticamente.',
      'En el mapa, abajo, siempre ves las coordenadas suizas LV95 del cursor.',
    ],
    tip: 'La app funciona también sin conexión una vez cargada (es instalable como app en el móvil: "Añadir a pantalla de inicio").',
    action: null,
  },
  {
    id: 'distancia', icon: '📏', title: 'Medir distancias',
    what: 'Mide la longitud real de cualquier recorrido: una valla, un camino, el frente de una parcela. Dentro de Suiza añade automáticamente el desnivel oficial (cuánto se sube y se baja) con su gráfico de perfil.',
    steps: [
      'Elige 📏 Distancia y toca el mapa punto por punto siguiendo el recorrido.',
      'Doble clic (o ✔️ Terminar / Enter) para cerrar la medición.',
      '¿Un punto mal puesto? ↩️ Deshacer punto (Retroceso) lo quita; 🗑️ Reiniciar (Esc) borra todo.',
      'El resultado aparece en la lista con la longitud, el desnivel ↗↘ y el mini-perfil de elevación.',
    ],
    tip: 'El perfil usa el terreno oficial swissALTI3D (~0.5 m de precisión) — sirve para estimar zanjas, tuberías o el esfuerzo de una ruta.',
    action: { tool: 'distance' },
  },
  {
    id: 'area', icon: '⬛', title: 'Medir áreas',
    what: 'Mide la superficie y el perímetro de parcelas, techos, campos o zonas de obra dibujando su contorno.',
    steps: [
      'Elige ⬛ Área y toca las esquinas del contorno sobre el mapa.',
      'Cierra la figura tocando el primer punto (o ✔️ Terminar).',
      'La medición queda etiquetada sobre el mapa y en la lista (m² y perímetro).',
    ],
    tip: 'Activa la capa 📐 Catastro para dibujar siguiendo los límites de parcela oficiales.',
    action: { tool: 'area' },
  },
  {
    id: 'volumen', icon: '⛰️', title: 'Medir volúmenes',
    what: 'Calcula los m³ de un acopio de grava, tierra o nieve — o de una excavación. Necesita un modelo de elevación (DSM): el de tu vuelo procesado, o el terreno oficial suizo sin volar.',
    steps: [
      'Carga un DSM: pestaña ⚙️ Procesar (de tu vuelo) o 🏔️ terreno oficial de la vista actual.',
      'Elige ⛰️ Volumen y selecciona la superficie base: cota mínima (suelo llano), perímetro interpolado (el estándar profesional en terreno irregular), 🇨🇭 terreno oficial, o ⏮️ vuelo anterior para ver la diferencia.',
      'Dibuja el contorno del acopio pegado a su pie y cierra la figura.',
      'El resultado muestra relleno (material) y corte (huecos) por separado.',
    ],
    tip: 'Para acopios reales usa "Perímetro (interpolado)": reconstruye el suelo bajo el montón a partir de sus bordes.',
    action: { tool: 'volume' },
  },
  {
    id: 'punto', icon: '📍', title: 'Puntos GPS',
    what: 'Registra puntos con nombre y coordenadas exactas: esquinas de parcela, arquetas, mojones, puntos de replanteo. Dentro de Suiza la elevación oficial se consulta sola.',
    steps: [
      'Elige 📍 Punto GPS y toca el lugar exacto en el mapa (haz zoom antes para afinar).',
      'Ponle nombre; la elevación oficial swissALTI3D se añade automáticamente.',
      'En la lista ves cada punto en coordenadas suizas LV95, listas para topografía.',
    ],
    tip: 'Exporta los puntos como CSV (incluye LV95) o GPX para llevarlos a un GPS o a AutoCAD/QGIS.',
    action: { tool: 'point' },
  },
  {
    id: 'plan', icon: '🛫', title: 'Plan de vuelo y misión',
    what: 'El drone no sabe solo dónde disparar: esta herramienta genera la rejilla de fotos con el solape correcto para fotogrametría y la exporta como misión KMZ que el mando DJI RC 2 puede volar automáticamente.',
    steps: [
      'Elige 🛫 Plan de vuelo y dibuja el contorno de la zona a mapear.',
      'Ajusta altura, solapes y velocidad con los deslizadores: verás fotos, GSD (cm/píxel), líneas y duración al instante.',
      'Comprueba el clima con 🌤️ y las restricciones 🚫 antes de volar.',
      '💾 Descarga la misión KMZ y cárgala en el mando (guía completa en docs/PLAN-DE-VUELO.md).',
    ],
    tip: '80% de solape frontal y 70% lateral es el punto seguro para que el procesado 3D nunca falle. Si supera ~25 min, divide la zona en dos vuelos.',
    action: { tool: 'plan' },
  },
  {
    id: 'orbita', icon: '🏠', title: 'Casas: fachadas y CAD',
    what: 'Para modelar una casa entera en ArchiCAD o Vectorworks — techo, fachadas, ventanas, puertas — la rejilla normal no basta: mira solo desde arriba. La misión de órbita vuela 3 círculos alrededor del edificio a distintas alturas, siempre mirando hacia él, y capta cada detalle. Después exportas el resultado a CAD.',
    steps: [
      'Elige 🏠 Órbita fachadas y toca el CENTRO del edificio en el mapa.',
      'Ajusta el radio (que libre árboles y cables), la altura del edificio y las fotos por vuelta; descarga la misión KMZ y vuélala.',
      'Combínala con una rejilla 🛫 normal de la parcela: fotos de techo + fachadas juntas dan el modelo completo.',
      'Procesa todo en ⚙️ Procesar (idealmente con 🎯 GCP) y descarga: 🏠 Modelo 3D (OBJ) o ☁️ Nube LAZ para importar en ArchiCAD/Vectorworks, o 🏗️ DXF 3D desde Exportar.',
    ],
    tip: 'Con radio ≤ 20 m consigues 1–3 cm/píxel en fachada — suficiente para medir ventanas y puertas al cm. Para anclar todo con precisión topográfica usa GCP. ArchiCAD: Archivo → Importar → nube de puntos (LAZ/XYZ); Vectorworks: Importar nube de puntos.',
    action: { tool: 'orbit' },
  },
  {
    id: 'fachadas', icon: '🏢', title: 'Planos de fachada',
    what: 'Convierte una foto frontal de la fachada (del vuelo de órbita 🏠) en un Fassadenplan de arquitecto: alzado acotado a escala 1:50/1:100/1:200 con contorno, ventanas y puertas — exportable como PDF a escala, DXF para ArchiCAD/Vectorworks y SVG.',
    steps: [
      'En Medir → 🏢 Planos de fachada → ✏️ nuevo, y carga la foto frontal de la fachada.',
      '📐 Rectificar: toca las 4 esquinas de un rectángulo real (la propia fachada o una ventana grande) e indica sus medidas — se corrige la perspectiva y la escala queda fijada.',
      'Traza: ⬛ el contorno (doble clic para cerrar), 🪟 cada ventana/puerta con 2 esquinas, ➖ líneas de detalle. Las cotas aparecen en vivo.',
      'Exporta: 🖨️ PDF a escala (con cotas de cada hueco, generales y cajetín), 📐 DXF en metros o 🖼️ SVG. El plano queda guardado en el proyecto.',
    ],
    tip: 'Marca el rectángulo de rectificación lo más grande posible (la fachada entera) y usa una medida que conozcas con seguridad — de eso depende la precisión de todas las cotas.',
    action: { facade: true },
  },
  {
    id: 'solar', icon: '☀️', title: 'Techo solar',
    what: 'Informe solar instantáneo de cualquier techo de Suiza con los datos oficiales del catastro solar (sonnendach.ch): aptitud, superficie, orientación, inclinación y producción anual estimada.',
    steps: [
      'Elige ☀️ Techo solar y toca un techo en el mapa.',
      'El techo se resalta y aparece su informe completo.',
      'Activa la capa ☀️ en el control de capas para ver de un vistazo qué techos son buenos (colores).',
    ],
    tip: 'Combínalo con un vuelo: la ortofoto de tu drone muestra el estado real del techo (claraboyas, chimeneas) que el catastro no ve.',
    action: { tool: 'solar' },
  },
  {
    id: 'radiografia', icon: '🧠', title: 'Radiografía del terreno',
    what: 'Un toque = dossier oficial completo del punto: elevación exacta, zonas de restricción de drones (BAZL), zona de construcción (ARE), techo solar (BFE), zonas de fauna protegida (BAFU), paisajes BLN y el clima con viento medido. Todo cruzado en un segundo.',
    steps: [
      'Elige 🧠 Radiografía y toca cualquier punto de Suiza.',
      'Revisa la tarjeta: 🚫 = restricciones legales de vuelo; 🦌 = fauna con período de protección; 🏞️ = paisaje protegido.',
      '🖨️ PDF genera el dossier imprimible para adjuntar a ofertas o permisos.',
    ],
    tip: 'Úsala SIEMPRE antes de volar en un sitio nuevo: te dice en un toque si puedes volar y qué autorización harían falta.',
    action: { tool: 'intel' },
  },
  {
    id: 'clima', icon: '🌤️', title: '¿Puedo volar ahora?',
    what: 'Veredicto de vuelo para el centro del mapa: viento y rachas del pronóstico + lo que MIDE ahora mismo la estación meteorológica oficial más cercana (red SwissMetNet, valores de 10 minutos), con las mejores horas del día para mapear.',
    steps: [
      'Centra el mapa en tu zona de vuelo y pulsa 🌤️ ¿Puedo volar ahora aquí?',
      '✅ / ⚠️ / ❌ según los límites del Mini 4 Pro (<250 g): aviso a 5 m/s, tope 8, rachas 10.',
      'La línea 📡 muestra la medición real de la estación: si difiere mucho del pronóstico, fíate del anemómetro.',
      'Las "mejores horas" combinan viento bajo y sol alto — ideales para fotogrametría.',
    ],
    tip: 'Vuela con sol alto (mediodía) para minimizar sombras: el modelo 3D sale mucho más limpio.',
    action: { weather: true },
  },
  {
    id: 'terreno', icon: '🏔️', title: 'Terreno oficial sin volar',
    what: 'Descarga el modelo de terreno oficial suizo (swissALTI3D, 2 m/píxel) de la zona visible y úsalo como si fuera un vuelo: volúmenes, perfiles y vista 3D en cualquier punto de Suiza sin sacar el drone.',
    steps: [
      'Acércate en el mapa a la zona (máx. ~6 km² de vista) y ve a ⚙️ Procesar.',
      '🏔️ Cargar terreno oficial: en segundos tienes el DSM listo — mide ⛰️ volúmenes o abre 🧊 la vista 3D.',
      'O cárgalo como ⏮️ base de comparación: tras procesar tu vuelo, el 🔥 mapa de calor muestra qué cambió respecto al terreno oficial (acopios, edificios, excavaciones).',
    ],
    tip: 'Perfecto para preparar una oferta sin desplazarte, o para detectar cuánto material hay acumulado desde que swisstopo sobrevoló la zona.',
    action: { tab: 'process' },
  },
  {
    id: 'procesar', icon: '⚙️', title: 'Procesar un vuelo',
    what: 'Convierte las fotos del vuelo en un mapa medible: ortofoto (foto aérea corregida) y DSM (modelo de elevación). El cálculo lo hace OpenDroneMap en un servidor tuyo; la app lo orquesta y carga los resultados.',
    steps: [
      'Nada más aterrizar: 📷 Verificar cobertura lee el GPS de las fotos y muestra sus huellas — comprueba que no hay huecos antes de irte del sitio.',
      'Sube las fotos en la pestaña ⚙️ Procesar y espera el resultado (o instala el servidor con server/install.sh en un PC).',
      'La ortofoto se superpone al mapa (ajusta su opacidad) y el DSM habilita volúmenes y 3D.',
      'También puedes cargar GeoTIFF a mano si procesas con otro programa.',
    ],
    tip: 'Guarda el DSM de cada vuelo: cargando el del vuelo anterior puedes medir la diferencia exacta de material entre visitas.',
    action: { tab: 'process' },
  },
  {
    id: 'comparar', icon: '🔥', title: 'Comparar vuelos',
    what: 'Mide lo que cambió entre dos vuelos (o contra el terreno oficial): cuánto material entró o salió, y dónde. El mapa de calor pinta en rojo lo añadido y en azul lo retirado.',
    steps: [
      'Carga el DSM actual y el del vuelo anterior (o 🏔️ terreno oficial como base).',
      '🔥 Mapa de calor de cambios muestra dónde hubo movimiento (> 10 cm).',
      'Para el número exacto: herramienta ⛰️ Volumen con base "⏮️ Vuelo anterior" y dibuja la zona — obtienes Δ total, añadido y retirado por separado.',
    ],
    tip: 'Es la herramienta de facturación: "este mes entraron 1 240 m³ de grava" con evidencia visual y números.',
    action: { tab: 'process' },
  },
  {
    id: 'gcp', icon: '🎯', title: 'Puntos de control (GCP)',
    what: 'Para precisión topográfica de centímetros, el procesado necesita puntos de control: marcas visibles en el suelo con coordenadas exactas conocidas. Aquí los gestionas y los marcas en las fotos con el editor visual.',
    steps: [
      'Coloca dianas físicas en el terreno (lonas o cruces pintadas) antes de volar.',
      'Añádelas con + añadir (coordenadas) o toma sus puntos con 📍 y conviértelos.',
      '🎯 editor: abre cada foto donde salga una diana y marca su centro exacto (zoom con la rueda). Mínimo 3 fotos por diana.',
      'Exporta la Lista GCP y súbela junto a las fotos al procesar — el modelo queda anclado a las coordenadas reales.',
    ],
    tip: '5 GCP bien repartidos (4 esquinas + centro) bastan para la mayoría de trabajos.',
    action: { gcp: true },
  },
  {
    id: 'exportar', icon: '💾', title: 'Exportar e informes',
    what: 'Todo lo que mides sale de la app en formatos estándar: GeoJSON (QGIS/web), KML (Google Earth), GPX (GPS), CSV con coordenadas suizas LV95, lista GCP para ODM, 🏗️ DXF 3D y ☁️ nube XYZ para programas CAD (ArchiCAD, Vectorworks, AutoCAD), informe imprimible y copia de seguridad completa.',
    steps: [
      'En la sección Exportar, pulsa el formato que necesites — se descarga al instante.',
      '🏗️ DXF 3D incluye el terreno como malla 3D (si hay DSM cargado), las mediciones como líneas con etiquetas y los puntos, organizados por capas CAD.',
      '☁️ Nube XYZ exporta el terreno como puntos E/N/Z en LV95 absoluto con precisión de cm.',
      '🗺️ Situationsplan genera el plano de situación a escala (1:200/1:500/1:1000) con fondo del catastro oficial, tus mediciones en rojo, flecha de norte, barra de escala, coordenadas LV95 y los datos del edificio del registro federal (GWR) en el cajetín — el plano que acompaña una solicitud de obra.',
      '🖨️ Informe abre un documento imprimible; 💾 Copia / 📂 Restaurar respaldan el proyecto entero.',
    ],
    tip: 'El DXF usa un origen local (nota incluida en el archivo) para que ArchiCAD no proteste por coordenadas lejanas; súmale las constantes E/N para volver a LV95 absoluto.',
    action: null,
  },
  {
    id: 'app360', icon: '📷', title: 'Workpulse 360 (interiores)',
    what: 'La medición con cámaras 360° (Insta360) es una app hermana pensada para interiores: pones la cámara en el centro de la habitación, y sobre la foto esférica mides distancias, alturas y superficies, y generas el plano de planta (SVG/PNG/DXF para CAD).',
    steps: [
      'Ábrela desde ⚙️ Procesar → 📷 Abrir Workpulse 360.',
      'Sube la foto 360 (equirectangular), indica la altura de la cámara y calibra con una referencia conocida.',
      'Mide suelo, alturas de objetos y habitaciones completas; exporta el plano y el informe.',
    ],
    tip: 'Dispara la cámara a la altura del pecho (~1.4 m), nivelada y lejos de espejos para máxima precisión.',
    action: { href: './360/' },
  },
]

export default function Manual({ onClose, onAction, initial = 'inicio' }) {
  const [chapterId, setChapterId] = useState(initial)
  const idx = CHAPTERS.findIndex((c) => c.id === chapterId)
  const ch = CHAPTERS[idx] ?? CHAPTERS[0]

  return (
    <div className="manual" role="dialog" aria-label="Manual de uso">
      <div className="manual-box">
        <header className="manual-head">
          <b>📖 Manual de Workpulse Drohne</b>
          <button className="mini" onClick={onClose}>✕ cerrar</button>
        </header>
        <div className="manual-body">
          <nav className="manual-nav">
            {CHAPTERS.map((c) => (
              <button
                key={c.id}
                className={c.id === ch.id ? 'active' : ''}
                onClick={() => setChapterId(c.id)}
              >
                {c.icon} <span>{c.title}</span>
              </button>
            ))}
          </nav>
          <article className="manual-page">
            {ILLOS[ch.id]}
            <h2>{ch.icon} {ch.title}</h2>
            <p className="manual-what">{ch.what}</p>
            <h3>Cómo se usa</h3>
            <ol>
              {ch.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
            <p className="manual-tip">💡 <b>Consejo:</b> {ch.tip}</p>
            <div className="manual-actions">
              <button disabled={idx === 0} onClick={() => setChapterId(CHAPTERS[idx - 1].id)}>
                ← Anterior
              </button>
              {ch.action && (
                <button className="manual-try" onClick={() => onAction?.(ch.action)}>
                  ▶️ Probar ahora
                </button>
              )}
              <button disabled={idx === CHAPTERS.length - 1} onClick={() => setChapterId(CHAPTERS[idx + 1].id)}>
                Siguiente →
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
