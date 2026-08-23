// ⚖️ Catastro de restricciones de derecho público (ÖREB / RDPPF): las
// limitaciones legales OFICIALES sobre una parcela — plan de uso, zonas de
// protección de aguas, grados de sensibilidad al ruido, zonas de seguridad
// aérea, etc. Es la información que hay que revisar ANTES de comprometerse
// con un proyecto o un cliente.
//
// El ÖREB es federado: cada cantón hospeda su propio servicio REST (mismo
// estándar). Aquí se implementa Berna (verificado); fuera de BE se devuelve
// el estado con enlace al portal cantonal en vez de fallar.

import { fetchParcelAt } from './swiss.js'

// Endpoints de extracto por cantón (se ampliará según haga falta).
const CANTON_ENDPOINTS = {
  BE: 'https://www.oereb2.apps.be.ch',
}

// Nombres legibles de los temas ÖREB más frecuentes.
const THEME_LABELS = {
  'ch.Nutzungsplanung': { es: 'Plan de uso / zona', de: 'Nutzungsplanung' },
  'ch.Gewaesserschutzbereiche': { es: 'Zona de protección de aguas', de: 'Gewässerschutzbereiche' },
  'ch.Grundwasserschutzzonen': { es: 'Zona de protección de aguas subterráneas', de: 'Grundwasserschutzzonen' },
  'ch.Grundwasserschutzareale': { es: 'Área de protección de aguas subterráneas', de: 'Grundwasserschutzareale' },
  'ch.Laermempfindlichkeitsstufen': { es: 'Grado de sensibilidad al ruido', de: 'Lärmempfindlichkeitsstufen' },
  'ch.Sicherheitszonenplan': { es: '✈️ Plan de zona de seguridad aérea', de: 'Sicherheitszonenplan' },
  'ch.ProjektierungszonenNationalstrassen': { es: 'Zona de proyecto de autopista', de: 'Projektierungszonen Nationalstrassen' },
  'ch.BaulinienNationalstrassen': { es: 'Alineación de autopista', de: 'Baulinien Nationalstrassen' },
  'ch.StatischeWaldgrenzen': { es: 'Límite estático de bosque', de: 'Statische Waldgrenzen' },
  'ch.Waldabstandslinien': { es: 'Distancia mínima al bosque', de: 'Waldabstandslinien' },
  'ch.BelasteteStandorte': { es: 'Sitio contaminado', de: 'Belastete Standorte' },
}

/** Texto del idioma pedido de una lista [{Language, Text}]. */
function pickText(arr, lang = 'de') {
  if (!Array.isArray(arr)) return null
  return (arr.find((x) => x.Language === lang) ?? arr.find((x) => x.Language === 'de') ?? arr[0])?.Text ?? null
}

/**
 * Extracto ÖREB de la parcela en un punto.
 * @returns {Promise<null|{
 *   egrid:string, parcel:string|null, canton:string|null,
 *   available:boolean, portalUrl:string|null,
 *   restrictions:Array<{theme:string, themeLabel:{es,de}, text:string|null, office:string|null}>
 * }>}
 */
export async function fetchOerebExtract(lng, lat) {
  const parcel = await fetchParcelAt(lng, lat).catch(() => null)
  if (!parcel?.egrid) return null
  const canton = parcel.canton
  const base = CANTON_ENDPOINTS[canton]
  const portalUrl = `https://map.geo.admin.ch/?lang=de&topic=ech&layers=ch.swisstopo-vd.oereb-lex&E=&N=`

  if (!base) {
    // Cantón no cableado aún: se informa la disponibilidad sin bloquear.
    return {
      egrid: parcel.egrid, parcel: parcel.number, canton,
      available: false, portalUrl, restrictions: [],
    }
  }

  try {
    const res = await fetch(`${base}/extract/json?EGRID=${encodeURIComponent(parcel.egrid)}&GEOMETRY=false`, {
      signal: AbortSignal.timeout(12000),
    })
    if (!res.ok) throw new Error(`ÖREB HTTP ${res.status}`)
    const data = await res.json()
    const raw = data?.GetExtractByIdResponse?.extract?.RealEstate?.RestrictionOnLandownership ?? []

    // Dedup por (tema + texto de leyenda).
    const seen = new Set()
    const restrictions = []
    for (const r of raw) {
      const theme = r?.Theme?.Code ?? '—'
      const text = pickText(r.LegendText)
      const key = `${theme}|${text}`
      if (seen.has(key)) continue
      seen.add(key)
      // Los temas cantonales usan prefijo (ch.BE.Gewaesserschutzbereiche);
      // se normaliza a ch.Gewaesserschutzbereiche para la etiqueta.
      const normalized = theme.replace(/^ch\.[A-Z]{2}\./, 'ch.')
      restrictions.push({
        theme,
        themeLabel: THEME_LABELS[theme] ?? THEME_LABELS[normalized] ?? { es: theme, de: theme },
        text,
        office: pickText(r.ResponsibleOffice),
      })
    }
    return { egrid: parcel.egrid, parcel: parcel.number, canton, available: true, portalUrl, restrictions }
  } catch {
    return { egrid: parcel.egrid, parcel: parcel.number, canton, available: false, portalUrl, restrictions: [] }
  }
}
