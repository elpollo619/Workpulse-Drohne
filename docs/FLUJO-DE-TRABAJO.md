# Flujo de trabajo: del vuelo a la medición

Guía práctica para capturar con el **DJI Mini 4 Pro** datos aptos para
fotogrametría y medirlos con Workpulse Drohne.

## 1. Planificación del vuelo

| Parámetro | Recomendación | Motivo |
|---|---|---|
| Solape frontal | **80 %** | Suficientes coincidencias entre fotos consecutivas |
| Solape lateral | **70 %** | Cobertura entre pasadas |
| Altura | **Constante** (p.ej. 60–100 m) | GSD uniforme y mejor reconstrucción |
| Cámara | **Nadir (−90°, apuntando abajo)** para mapas | Ortomosaico y DSM correctos |
| Cámara | **Oblicua (−45°)** para 3D de fachadas | Reconstruye laterales de estructuras |
| Luz | Difusa, sin sombras duras | Evita huecos y falsos relieves |
| Formato | Foto **JPEG** con geoetiqueta activada | EXIF con GPS para el procesado |

> **GSD** (tamaño de píxel en el suelo) ≈ (altura × tamaño de sensor) /
> (distancia focal × ancho de imagen). A menor altura, más detalle y precisión,
> pero más fotos y batería.

### Cómo volar en rejilla con el Mini 4 Pro

DJI Fly no trae "misión de mapeo" clásica en todos los firmwares. Opciones:

- **Manual en rejilla:** vuela líneas paralelas a altura fija disparando fotos a
  intervalo regular. Laborioso pero funciona.
- **Apps de terceros** (Dronelink, Litchi): waypoints automáticos; verifica la
  compatibilidad con tu versión de firmware antes de confiar en ellas.
- **Panorámicas / órbitas** de DJI Fly: útiles para 3D de un objeto concreto.

## 2. Colocar GCP (si se busca precisión topográfica)

Coloca y mide las dianas **antes** de volar. Ver
[PRECISION-GCP.md](PRECISION-GCP.md).

## 3. Descargar las fotos

Transfiere las imágenes del drone/mando al ordenador. Conserva el EXIF (no las
edites ni recomprimas antes de procesar).

## 4. Procesar (OpenDroneMap / WebODM)

Ver [server/README.md](../server/README.md). Salida esperada:

- `odm_orthophoto/odm_orthophoto.tif` → **ortomosaico**
- `odm_dem/dsm.tif` → **DSM**
- `odm_georeferencing/odm_georeferenced_model.laz` → **nube de puntos**

Parámetros útiles en ODM: `--dsm`, `--dtm`, `--orthophoto-resolution`, `--gcp`,
`--pc-quality high`.

## 5. Medir en Workpulse Drohne

1. `npm run dev` y abre la app.
2. **Cargar ortomosaico** → clic en 📏/⬛ para distancias y áreas.
3. **Cargar DSM** → herramienta ⛰️ *Volumen*, traza el contorno del acopio y
   elige el plano base (mínimo para acopios sobre suelo plano).
4. 📍 marca **puntos GPS** de interés; 🎯 registra o revisa los **GCP**.
5. **Exporta** en GeoJSON (todo), CSV (puntos) o lista de GCP.

## 6. Checklist rápido de campo

- [ ] Baterías cargadas (drone + mando) y tarjeta con espacio
- [ ] Geoetiquetado activado, foto en JPEG
- [ ] Zona despejada y permisos/normativa en regla
- [ ] Altura y solape definidos; cámara en nadir
- [ ] Dianas GCP colocadas y medidas (si aplica)
- [ ] Vuelo con líneas paralelas cubriendo toda la zona + margen
- [ ] Comprobar que las fotos no salen movidas antes de recoger
