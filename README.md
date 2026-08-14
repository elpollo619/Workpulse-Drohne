# Workpulse Drohne

Plataforma web para **medir** a partir de vuelos de drone: distancias, áreas,
volúmenes de acopios, puntos GPS y modelos 3D — pensada para drones DJI de
consumo como el **DJI Mini 4 Pro**.

> **Importante — cómo funciona de verdad.** No se puede instalar software
> *dentro* del DJI Mini 4 Pro ni en el mando DJI RC 2: su firmware está cerrado
> y el SDK de DJI no soporta este modelo. La medición profesional con este tipo
> de drone se hace por **fotogrametría**: el drone captura fotos con solape y
> geoetiquetadas, y *este software* las procesa y permite medir sobre los
> productos resultantes. Ver [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).

## Qué hace

| Capacidad | Estado | Cómo |
|---|---|---|
| 📏 Distancias | ✅ Funcional | Traza líneas sobre el mapa/ortomosaico (geodésico, metros reales) |
| ⬛ Áreas y perímetros | ✅ Funcional | Polígonos (m², ha) |
| 📍 Puntos GPS | ✅ Funcional | Marca y registra coordenadas, exporta CSV/GeoJSON |
| ⛰️ Volúmenes de acopio | ✅ Funcional | Sobre un DSM (GeoTIFF): plano base mín./medio, corte y relleno |
| 🎯 Puntos de control (GCP) | ✅ Gestión + exportación | Para georreferenciar con precisión topográfica |
| 🧊 Vista 3D del terreno | ✅ Funcional | Malla 3D del DSM con Three.js (órbita/zoom, color por elevación) |
| ⚙️ Procesar fotos → orto/DSM | ✅ Integrado | Pestaña *Procesar*: sube fotos, progreso en vivo, carga automática de resultados (requiere NodeODM en `server/`) |
| 📐 Volumen base perímetro | ✅ Funcional | Superficie base interpolada del borde del acopio (estándar profesional) |
| 🏔️ Volumen vs terreno oficial | ✅ Funcional | Base swissALTI3D: volumen = DSM del drone − terreno oficial suizo |
| 🛫 Plan de vuelo automático | ✅ Funcional | Polígono → rejilla óptima → misión KMZ para DJI Fly (Mini 4 Pro) |
| 📷 Foto 360° con medición | ✅ Funcional | Insta360/equirectangular: distancias reales sobre el suelo con altura de cámara conocida |

### 🇨🇭 Integración suiza (swisstopo / geo.admin.ch)

Pensada para operar en **Berna y toda Suiza** con la infraestructura geodata
oficial (open data, sin clave de API):

| Función | Fuente oficial |
|---|---|
| Ortofoto aérea de **10 cm** como capa base | SWISSIMAGE (swisstopo) |
| Mapa nacional como capa alternativa | Landeskarte (swisstopo) |
| **Elevación automática** al marcar puntos (~0.5 m) | swissALTI3D vía api3.geo.admin.ch |
| **Desnivel** (↗subida/↘bajada) en cada distancia | Servicio de perfil geo.admin.ch |
| Coordenadas **LV95 (EPSG:2056)** en vivo, en listas y CSV | CH1903+ oficial |

## El flujo de trabajo

```
   VUELO (DJI Fly)              PROCESAMIENTO                  MEDICIÓN (esta app)
 ┌───────────────────┐      ┌────────────────────┐        ┌──────────────────────┐
 │ Fotos con solape  │      │ OpenDroneMap /      │        │ Cargar ortomosaico   │
 │ (80% frontal,     │ ───▶ │ NodeODM (server/):  │ ─────▶ │ + DSM (GeoTIFF)      │
 │  70% lateral),    │      │  → ortomosaico.tif  │        │ Medir dist/área/vol  │
 │  geoetiquetadas   │      │  → dsm.tif          │        │ Marcar puntos GPS    │
 │ + dianas GCP      │      │  → nube de puntos   │        │ Exportar resultados  │
 └───────────────────┘      └────────────────────┘        └──────────────────────┘
```

Para **precisión topográfica** (centimétrica) con un Mini 4 Pro —que no tiene
RTK— se usan **Puntos de Control Terrestre (GCP)**. Guía completa en
[`docs/PRECISION-GCP.md`](docs/PRECISION-GCP.md).

## Ejecutar la app de medición

```bash
npm install
npm run dev      # abre http://localhost:5173
```

Luego:
1. **Cargar ortomosaico** (GeoTIFF georreferenciado) → se sitúa a escala real.
2. Elige una **herramienta** (distancia, área, volumen, punto) y dibuja.
3. Para **volumen**: carga también el **DSM** y traza el contorno del acopio.
4. **Exporta** en GeoJSON / CSV / lista de GCP.

Los datos del proyecto se guardan en el navegador (localStorage). ¿No tienes un
GeoTIFF a mano? Puedes probar distancias/áreas/puntos directamente sobre el mapa
base de OpenStreetMap.

## Estructura

```
├── src/                 App web de medición (React + Leaflet + Turf + georaster)
│   ├── components/       MapView (mapa e interacción)
│   └── lib/              measure (Turf), raster (volumen/GeoTIFF), export, storage
├── server/              Esqueleto de procesamiento (OpenDroneMap / NodeODM)
└── docs/                Arquitectura, precisión con GCP, flujo de trabajo
```

## Documentación

- [Arquitectura y decisiones técnicas](docs/ARQUITECTURA.md)
- [Precisión topográfica con GCP](docs/PRECISION-GCP.md)
- [Flujo de trabajo de campo a medición](docs/FLUJO-DE-TRABAJO.md)
- [Servidor de procesamiento](server/README.md)
