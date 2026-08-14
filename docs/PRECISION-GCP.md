# Precisión topográfica con Puntos de Control Terrestre (GCP)

El objetivo de precisión **centimétrica** condiciona todo el flujo. Esta guía
explica cómo conseguirla con un drone **sin RTK** como el DJI Mini 4 Pro.

## Por qué el GPS del drone no basta

El Mini 4 Pro geoetiqueta cada foto con su GPS/GNSS interno, pero su exactitud
absoluta es de **~1–3 m horizontal y peor en vertical**. Eso sirve para
mediciones *relativas* aproximadas, pero no para trabajo topográfico.

Dos caminos dan precisión centimétrica:

| Método | Disponible en Mini 4 Pro | Precisión típica |
|---|---|---|
| **RTK/PPK** (corrección GNSS a bordo) | ❌ No tiene | 1–3 cm |
| **GCP** (puntos de control en el suelo) | ✅ Sí (método recomendado) | 2–5 cm |

Como el Mini 4 Pro no tiene RTK, **la vía real es GCP**.

## Qué es un GCP

Un **Punto de Control Terrestre** es una marca visible en el suelo (una diana en
cruz o damero) cuya posición exacta se mide con un instrumento de precisión
(GNSS RTK de topografía, estación total, o un punto geodésico oficial conocido).

Durante el procesamiento, se le dice al software *"este píxel de estas fotos
corresponde a estas coordenadas reales"*. Con suficientes GCP bien repartidos,
la reconstrucción se **ancla** al sistema de coordenadas real con exactitud
centimétrica.

## Cuántos y dónde

- **Mínimo 5 GCP** por zona; mejor 7–10 en terrenos grandes o con relieve.
- **Bien repartidos**: esquinas + centro; no todos alineados.
- **En cambios de cota** si el terreno es irregular (mejora la vertical).
- Cada GCP debe ser **visible en ≥ 3–5 fotos**.

```
   ┌─────────────────────────┐
   │ ◎          ◎          ◎ │   ◎ = GCP
   │                         │
   │            ◎            │   Reparte por esquinas,
   │                         │   bordes y centro.
   │ ◎          ◎          ◎ │
   └─────────────────────────┘
```

## Flujo de trabajo con esta plataforma

1. **Antes del vuelo:** coloca las dianas y mide sus coordenadas
   (lat, lon, elev) con GNSS de precisión. Apunta el sistema de coordenadas
   (p.ej. `EPSG:4326` o el UTM local).
2. **Registra los GCP** en la app (panel *Puntos de control GCP → + añadir*) o
   impórtalos. Expórtalos con el botón **Lista GCP**.
3. **Vuela** cubriendo toda la zona con solape alto (ver
   [FLUJO-DE-TRABAJO.md](FLUJO-DE-TRABAJO.md)); asegúrate de que las dianas
   queden nítidas en varias fotos.
4. **Marca las dianas con el editor visual integrado** (panel *Puntos de
   control GCP → 🎯 editor*): añade las fotos del vuelo, elige cada diana y
   toca con un clic el centro exacto donde aparece en cada foto (mínimo 3
   fotos por diana; el editor lleva la cuenta). El botón
   **💾 Exportar gcp_list.txt** genera el archivo completo:
   ```
   EPSG:4326
   lng lat elev  px py  nombre_imagen.jpg  gcp_name
   ...
   ```
5. **Procesa con el archivo**: en la pestaña ⚙️ Procesar, adjunta el
   `gcp_list.txt` junto a las fotos antes de lanzar. OpenDroneMap ancla la
   reconstrucción a tus dianas.
6. **Verifica el error:** el 📊 Informe de calidad reporta el error de
   reproyección de los GCP (idealmente pocos cm). Deja 1–2 GCP como
   *checkpoints* para validar.
7. **Mide** cargando el ortomosaico y el DSM ya georreferenciados en esta app.

## Buenas prácticas de exactitud

- Vuela con **solape 80% frontal / 70% lateral** y a **altura constante**.
- Evita viento fuerte, sombras duras y superficies sin textura (agua, nieve).
- Para **volúmenes** fiables, incluye GCP en el terreno base alrededor del acopio.
- Documenta siempre el **sistema de coordenadas** usado; no mezcles datums.
