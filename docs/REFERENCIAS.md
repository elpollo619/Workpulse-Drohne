# Referencias: proyectos open source reutilizables

Catálogo curado de repositorios y servicios que este proyecto usa, copia o
toma como referencia — con su licencia, porque condiciona *cómo* se pueden usar.

## Regla de licencias

- **Permisivas (MIT / BSD / Apache):** se puede copiar e integrar código
  libremente en este proyecto.
- **AGPL-3.0** (OpenDroneMap, WebODM): usar como **motor externo** (proceso
  aparte, vía API) o como referencia de diseño. **No copiar código** al
  proyecto, o habría que liberarlo todo bajo AGPL.
- **Open data oficial** (swisstopo/geo.admin.ch): datos y APIs de uso libre.

## 🇨🇭 Suiza — integrado en la app

| Recurso | Qué aporta | Estado |
|---|---|---|
| [SWISSIMAGE WMTS](https://www.swisstopo.admin.ch/en/orthoimage-swissimage-10) | Ortofoto aérea oficial de 10 cm — capa base por defecto | ✅ Integrado |
| [Mapa nacional WMTS](https://www.swisstopo.admin.ch/en/national-maps) | Cartografía oficial swisstopo como capa alternativa | ✅ Integrado |
| [Servicio de altura geo.admin.ch](https://api3.geo.admin.ch/services/sdiservices.html#height) | Elevación oficial swissALTI3D (~0.5 m) por punto | ✅ Integrado (elevación automática de puntos) |
| [Servicio de perfil geo.admin.ch](https://api3.geo.admin.ch/services/sdiservices.html#profile) | Perfil de elevación a lo largo de una línea | ✅ Integrado (desnivel en distancias) |
| CH1903+ / LV95 (EPSG:2056) | Sistema de coordenadas oficial suizo | ✅ Integrado (readout en vivo, lista y CSV) |
| [geoadmin/web-mapviewer](https://github.com/geoadmin/web-mapviewer) (148★) | El visor oficial map.geo.admin.ch — referencia de UX | Referencia |
| [geoadmin/mf-chsdi3](https://github.com/geoadmin/mf-chsdi3) | Código fuente de api3.geo.admin.ch | Referencia |
| [swisstopo/swissgeol-viewer-suite](https://github.com/swisstopo/swissgeol-viewer-suite) (48★) | Visor 3D CesiumJS de swisstopo — referencia para Fase 3D | Referencia |
| [swissALTI3D](https://www.swisstopo.admin.ch/en/height-model-swissalti3d) | DEM oficial descargable (0.5 m) — base/terreno para volúmenes | Candidato |

## Motor de fotogrametría (fotos → orto/DSM/nube)

| Repo | ★ | Licencia | Uso |
|---|---|---|---|
| [OpenDroneMap/ODM](https://github.com/OpenDroneMap/ODM) | 6.4k | AGPL | Motor de procesamiento — integrado como servicio externo vía NodeODM (`server/`) |
| [WebODM/WebODM](https://github.com/WebODM/WebODM) | 4.1k | AGPL | Referencia de arquitectura/UX; editor de GCP |
| [OpenDroneMap/NodeODM](https://github.com/OpenDroneMap/NodeODM) | — | AGPL | API REST del motor (docker-compose en `server/`) |
| [alicevision/Meshroom](https://github.com/alicevision/Meshroom) | 12.9k | MPL2 | Motor alternativo de reconstrucción 3D (escritorio) |
| [openMVG/openMVG](https://github.com/openMVG/openMVG) | 6.5k | MPL2 | Librería SfM de bajo nivel |

## Medición y análisis raster en el navegador

| Repo | ★ | Licencia | Uso |
|---|---|---|---|
| [GeoTIFF/geoblaze](https://github.com/GeoTIFF/geoblaze) | 191 | MIT ✅ | Estadística zonal sobre GeoTIFF — candidato a sustituir el bucle propio de volumen |
| [GeoTIFF/georaster](https://github.com/GeoTIFF/georaster) | — | MIT ✅ | **Ya en uso** — parseo de GeoTIFF |
| [georaster-layer-for-leaflet](https://github.com/GeoTIFF/georaster-layer-for-leaflet) | — | MIT ✅ | **Ya en uso** — render de GeoTIFF en Leaflet |
| [Turf.js](https://github.com/Turfjs/turf) | 9k+ | MIT ✅ | **Ya en uso** — geodesia (distancias/áreas) |
| [Leaflet-Geoman](https://github.com/geoman-io/leaflet-geoman) | — | MIT ✅ | **Ya en uso** — dibujo de geometrías |
| [NLTGit/Leaflet.LinearMeasurement](https://github.com/NLTGit/Leaflet.LinearMeasurement) | 48 | permisiva | Regla con medidas incrementales por tramo |

## Visor 3D / nube de puntos (Fase 3)

| Repo | ★ | Licencia | Uso |
|---|---|---|---|
| [potree/potree](https://github.com/potree/potree) | 5.5k | **BSD-2 ✅** | Visor WebGL de nubes gigantes **con medición 3D incluida** — plan: integrarlo |
| [tentone/potree-core](https://github.com/tentone/potree-core) | 251 | MIT ✅ | Potree como librería para three.js/React |
| [potree/PotreeConverter](https://github.com/potree/PotreeConverter) | 815 | BSD | Convierte `.laz` de ODM al formato Potree |
| [CesiumGS/3d-tiles](https://github.com/CesiumGS/3d-tiles) | 2.6k | — | Especificación de streaming 3D (lo que usa swissgeol) |

## Puntos de control (GCP)

| Repo | ★ | Uso |
|---|---|---|
| [OpenDroneMap/posm-gcpi](https://github.com/OpenDroneMap/posm-gcpi) | 21 | Interfaz de marcado GCP píxel↔terreno (roadmap Fase 4) |
| [wolkstein/GCP_LIST-generator](https://github.com/wolkstein/OpenDroneMap-GCP_LIST.TXT-generator) | 15 | Detección automática de dianas y generación de `gcp_list.txt` |

> 🇨🇭 En Suiza, las coordenadas de los GCP pueden medirse contra la red oficial
> **swipos** (GNSS RTK de swisstopo) o derivarse de puntos fijos de la
> mensuración oficial (AV/MO), en LV95.

## Cámaras 360° (Insta360 y similares)

| Recurso | ★ | Licencia | Uso |
|---|---|---|---|
| Visor 360 propio (Three.js) | — | — | ✅ **Integrado**: visor equirectangular con medición de suelo por trigonometría (altura de cámara conocida) |
| [mpetroff/pannellum](https://github.com/mpetroff/pannellum) | 4.9k | MIT | Visor panorámico de referencia (sin medición) |
| [Photo Sphere Viewer](https://github.com/JeremyHeleine/Photo-Sphere-Viewer) | 888 | MIT | Alternativa de visor con plugins |
| [Insta360-Research-Team/DAP](https://github.com/Insta360-Research-Team/DAP) | 358 | — | **Depth Any Panoramas**: IA que estima profundidad de una foto 360 — candidato futuro para medición sin altura conocida |
| OpenSfM/ODM cámara esférica | — | AGPL (motor externo) | Varias fotos 360 → nube de puntos 3D completa (`--camera-lens spherical` en ODM) |

> **Flujo 3D completo con Insta360:** exporta fotogramas equirectangulares
> (cada 1–2 m caminando), procésalos en la pestaña ⚙️ con la opción de cámara
> esférica de ODM, y mide sobre el resultado como con las fotos del drone.

## Planificación de vuelo

| Repo | ★ | Uso |
|---|---|---|
| [ethz-asl/polygon_coverage_planning](https://github.com/ethz-asl/polygon_coverage_planning) | 652 | Algoritmos de cobertura de polígonos (ETH Zürich) — referencia |
| [DJI-Mobile-SDK-Tutorials](https://github.com/DJI-Mobile-SDK-Tutorials) | — | Solo informativo — el SDK **no soporta** el Mini 4 Pro |

## Listas curadas

- [awesome-photogrammetry](https://github.com/awesome-photogrammetry/awesome-photogrammetry) (800★)
- [mikeroyal/Photogrammetry-Guide](https://github.com/mikeroyal/Photogrammetry-Guide) (1.5k★)
- [OpenDroneMap/ODMdata](https://github.com/OpenDroneMap/ODMdata) (200★) — datasets de ejemplo para probar el pipeline

## Investigación de mercado (agentes, ago-2026)

**Carencias detectadas en apps comerciales** (DroneDeploy 329-599 USD/mes, Pix4D ~4k€/año, WebODM instalación Docker dolorosa, DJI Terra licencia atada al PC):
sin modo offline, límites de imágenes por plan, GCP de pago, informes rígidos,
parámetros crípticos. → Nuestra respuesta: web sin instalación, sin límites,
gratis, informes propios.

**Funciones únicas construidas a partir de la investigación:**
- 🔥 Mapa de calor de cambios entre vuelos (DroneDeploy lo cobra en tier alto)
- 📷 Verificación de cobertura en campo vía GPS EXIF (nadie la ofrece standalone)
- ☀️ Informe solar oficial por techo vía identify de geo.admin.ch
  (`ch.bfe.solarenergie-eignung-daecher` — datos de sonnendach.ch)

**APIs suizas verificadas pendientes de integrar:**
- `ch.are.bauzonen` (zonas de construcción, identify)
- MeteoSwiss OGD (estaciones SwissMetNet cada 10 min, STAC en data.geo.admin.ch)
- STAC swissALTI3D (descarga directa del MDT 0.5 m de la zona de vuelo)
- `ch.bafu.*` (aguas subterráneas, peligros naturales como overlays)
