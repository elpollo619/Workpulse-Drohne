# Arquitectura y decisiones técnicas

## 1. Restricción de partida: el hardware DJI es cerrado

El DJI Mini 4 Pro y el mando DJI RC 2 **no admiten software de terceros**:

- El **firmware del drone** está firmado y bloqueado por DJI. Modificarlo
  inutiliza el equipo y no está soportado.
- El **DJI RC 2** ejecuta un Android bloqueado que solo corre **DJI Fly**. No
  es una plataforma de apps abierta.
- El **DJI Mobile SDK v5** (para crear apps de vuelo propias) **no incluye** el
  Mini 4 Pro en su lista de modelos soportados; se limita a equipos enterprise
  (Matrice, Mavic 3 Enterprise, etc.).

**Conclusión:** el software de medición no vive en el drone, sino que procesa
los **datos que el drone captura**. Este es exactamente el modelo que usan las
herramientas profesionales (Pix4D, DroneDeploy, WebODM).

## 2. Cadena de valor: fotogrametría

```
Fotos geoetiquetadas ──▶ Reconstrucción SfM/MVS ──▶ Productos medibles
   (drone)                 (OpenDroneMap)              orto, DSM, nube 3D
                                                          │
                                                          ▼
                                                  Medición (esta app)
```

- **Ortomosaico** (`orthophoto.tif`): imagen aérea corregida geométricamente, a
  escala real. Base para medir **distancias** y **áreas**.
- **DSM** (`dsm.tif`, Digital Surface Model): elevación por píxel. Base para
  medir **volúmenes**.
- **Nube de puntos** (`point_cloud.laz`) y **malla 3D** (`.obj`): inspección y
  medición 3D (roadmap del visor).

## 3. Componentes

### 3.1 App web de medición (`src/`) — implementada

| Pieza | Tecnología | Por qué |
|---|---|---|
| UI | React + Vite | Rápido, estándar, fácil de desplegar |
| Mapa | Leaflet | Ligero, mismo motor que usa WebODM |
| Dibujo | Leaflet-Geoman | Trazado de líneas/polígonos/marcadores |
| Cálculo geodésico | Turf.js | Distancias y áreas sobre elipsoide WGS84 |
| GeoTIFF | georaster + georaster-layer-for-leaflet | Leer orto/DSM en el navegador |
| Reproyección | proj4 | DSM en UTM ⇄ mapa en lng/lat |
| Persistencia | localStorage | MVP sin backend; migrable a API |

**Cálculo de volumen** (`src/lib/raster.js`): se recorre la malla del DSM, se
filtran las celdas dentro del polígono (reproyectando a lng/lat cuando el raster
es UTM), y se integra `Σ área_celda × (z − z_base)`. El plano base puede ser la
cota mínima (acopio sobre suelo plano), la media, o un valor fijo. Se reportan
**relleno** (fill), **corte** (cut) y volumen neto.

### 3.2 Servidor de procesamiento (`server/`) — esqueleto

Orquesta **OpenDroneMap** vía **NodeODM** (contenedor Docker):

```
Fotos ──▶ API (server/) ──▶ NodeODM ──▶ orto.tif / dsm.tif / nube.laz
```

No reimplementamos fotogrametría: OpenDroneMap es un motor maduro y de código
abierto. El servidor solo gestiona proyectos, sube imágenes, lanza el trabajo y
sirve los resultados a la app. Ver [`server/README.md`](../server/README.md).

## 4. Sistemas de coordenadas

- El mapa y las mediciones geodésicas trabajan en **WGS84 (EPSG:4326)**.
- Los productos de OpenDroneMap suelen exportarse en **UTM** (metros), ideal
  para volúmenes. `src/lib/raster.js` reproyecta con proj4 (soporta 4326, 3857 y
  todas las zonas UTM norte/sur `EPSG:326xx / 327xx`).

## 5. Roadmap

| Fase | Contenido |
|---|---|
| **1 — Medición** (hecho) | Orto/DSM en el navegador; distancia, área, volumen, puntos GPS, GCP, export |
| **2 — Procesamiento** | Backend NodeODM completo: subir fotos, lanzar y monitorizar, descargar productos |
| **3 — 3D** | Visor de nube de puntos (Potree / deck.gl) y medición 3D |
| **4 — GCP asistido** | Marcado de dianas píxel↔terreno en las imágenes para georreferenciación cm |
| **5 — Multiusuario** | API + base de datos, proyectos compartidos, roles |

## 6. Alternativas de captura consideradas

- **DJI Fly** (nativo, gratis): captura foto/vídeo manual. Válido para
  fotogrametría si se vuela con solape y a altura constante. Punto de partida
  recomendado para el Mini 4 Pro.
- **Apps de mapeo automático** (Dronelink, Litchi): planifican rejillas de
  waypoints; su compatibilidad con el Mini 4 Pro varía según versión de firmware.
- **SDK propio**: descartado — el Mini 4 Pro no está soportado.
