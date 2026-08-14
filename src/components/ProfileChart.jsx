/**
 * Mini-gráfico SVG del perfil de elevación de una distancia medida
 * (datos del servicio oficial de perfil de geo.admin.ch).
 * Sin dependencias: un área rellena + línea, con cotas mín/máx.
 */
export default function ProfileChart({ profile, width = 264, height = 56 }) {
  if (!profile || profile.length < 2) return null

  const alts = profile.map((p) => p.alt).filter((a) => a != null)
  if (!alts.length) return null
  const minAlt = Math.min(...alts)
  const maxAlt = Math.max(...alts)
  const range = Math.max(1, maxAlt - minAlt)
  const maxDist = profile[profile.length - 1].dist || 1

  const PAD = 4
  const x = (d) => PAD + (d / maxDist) * (width - PAD * 2)
  const y = (a) => PAD + (1 - (a - minAlt) / range) * (height - PAD * 2)

  const line = profile
    .filter((p) => p.alt != null)
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.dist).toFixed(1)},${y(p.alt).toFixed(1)}`)
    .join(' ')
  const area = `${line} L${x(maxDist).toFixed(1)},${height - PAD} L${PAD},${height - PAD} Z`

  return (
    <svg
      className="profile-chart"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Perfil de elevación"
    >
      <path d={area} fill="rgba(52, 211, 153, 0.18)" />
      <path d={line} fill="none" stroke="#34d399" strokeWidth="1.5" />
      <text x={PAD + 2} y={11} className="profile-label">{maxAlt.toFixed(0)} m</text>
      <text x={PAD + 2} y={height - 7} className="profile-label">{minAlt.toFixed(0)} m</text>
    </svg>
  )
}
