# Plan de vuelo automático: de la app al mando DJI RC 2

La herramienta **🛫 Plan de vuelo** genera una misión waypoint lista para que
el Mini 4 Pro vuele la rejilla de mapeo **solo**: recorre las líneas, apunta la
cámara a −90° y dispara una foto en cada posición calculada.

## 1. Generar la misión

1. En la app, herramienta **🛫 Plan de vuelo** → dibuja el polígono de la zona.
2. Ajusta altura (40–120 m), solapes y velocidad. La app muestra en vivo:
   fotos, GSD (cm/píxel), líneas, distancia y duración estimada.
3. **💾 Descargar misión KMZ** → obtienes `<proyecto>.kmz`.

La rejilla se dibuja en morado sobre el mapa para que compruebes la cobertura.

## 2. Instalarla en el DJI RC 2

DJI Fly no tiene botón de "importar misión", pero las misiones son archivos
KMZ que se pueden reemplazar (método verificado por la comunidad):

1. **En DJI Fly** (con el drone conectado): abre modo Waypoint y crea una
   misión cualquiera de 2 puntos donde sea. Guárdala. Es el "hueco" que vamos
   a rellenar.
2. **Conecta el RC 2 al ordenador por USB-C** (modo transferencia de archivos).
3. Navega a: `Android/data/dji.go.v5/files/waypoint/`
4. Verás carpetas con nombres tipo UUID (`550E8400-E29B-...`). Entra en la de
   **fecha más reciente** (la misión que acabas de crear). Dentro hay un
   archivo `<uuid>.kmz`.
5. **Renombra tu misión descargada** exactamente con ese mismo nombre
   `<uuid>.kmz` y **reemplaza** el archivo original.
6. Desconecta, abre DJI Fly → Waypoint → abre la misión: verás tu rejilla.

## 3. Volar

- Despega desde un punto con vista a toda la zona.
- Lanza la misión desde DJI Fly. El drone vuela la serpentina, orienta la
  cámara a nadir y fotografía cada punto automáticamente.
- Al terminar ejecuta *goHome* (vuelve solo). Si se pierde señal: *goBack*.

## ⚠️ Avisos importantes

- **Método no oficial**: DJI no documenta la importación de misiones en
  DJI Fly. Funciona porque el archivo usa el mismo formato WPML que genera la
  propia app (`droneEnumValue 68`, valor verificado por la comunidad para
  drones de consumo). Tras una actualización de DJI Fly podría requerir
  ajustes.
- **Primer vuelo, vigílalo siempre**: comprueba en pantalla que la ruta es la
  esperada y ten el pulgar listo para pausar (el stick cancela la misión).
- **Batería**: la app avisa si el plan supera ~25 min. Divide zonas grandes.
- **Suiza**: máx. 120 m AGL (el deslizador ya lo limita), registro OFAC/BAZL,
  y revisa restricciones locales en map.geo.admin.ch antes de volar.
- **Límite de waypoints**: DJI Fly acepta ~180; la app avisa y bloquea la
  descarga si tu plan los supera (sube la altura o divide la zona).

## Cómo se calcula la rejilla

Con la óptica real del Mini 4 Pro (sensor 1/1.3", focal 6.7 mm, 4032 px):

- Huella de foto en el suelo = sensor × altura / focal
- Separación entre líneas = huella_ancho × (1 − solape_lateral)
- Separación entre fotos = huella_alto × (1 − solape_frontal)
- GSD (cm/px) = sensor_mm × altura / (focal × ancho_imagen)

A 70 m: GSD ≈ 2.5 cm/px, líneas cada ~31 m, foto cada ~15 m.
