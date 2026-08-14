// Persistencia local de proyectos en el navegador (localStorage).
// Un "proyecto" agrupa las mediciones, puntos GPS y GCP de un vuelo.

const KEY = 'workpulse.projects.v1'

export function loadProjects() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveProjects(projects) {
  localStorage.setItem(KEY, JSON.stringify(projects))
}

export function newProject(name) {
  return {
    id: crypto.randomUUID(),
    name: name || `Proyecto ${new Date().toLocaleDateString()}`,
    createdAt: new Date().toISOString(),
    measurements: [], // { id, type: 'distance'|'area', coords, result }
    points: [],       // { id, label, lng, lat, elev, note }
    gcps: [],         // { id, name, lng, lat, elev, note }
  }
}
