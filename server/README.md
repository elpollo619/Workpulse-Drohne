# Servidor de procesamiento (Fase 2)

Orquesta la reconstrucción fotogramétrica con **OpenDroneMap** a través de
**NodeODM**. Convierte las fotos del vuelo en los productos medibles que consume
la app: **ortomosaico**, **DSM** y **nube de puntos**.

> Estado: **esqueleto funcional**. La app de medición (`../src`) ya funciona sin
> este servidor cargando GeoTIFF a mano. Este módulo automatiza el paso previo
> (fotos → GeoTIFF).

## Arquitectura

```
 App web ──HTTP──▶ API orquestación (index.js) ──HTTP──▶ NodeODM (Docker)
                        :4000                                :3000
                                                               │
                                             ortho.tif · dsm.tif · nube.laz
```

## Puesta en marcha — un solo comando

```bash
bash server/install.sh
```

El instalador comprueba Docker y Node, levanta NodeODM, espera a que
responda, instala dependencias y arranca la API. Deja la terminal abierta y
la pestaña **⚙️ Procesar** de la app queda operativa.

<details>
<summary>Pasos manuales equivalentes</summary>

```bash
# 1. Levanta el motor OpenDroneMap
docker compose up -d          # NodeODM en http://localhost:3000

# 2. Instala y arranca la API de orquestación
npm install
npm start                     # API en http://localhost:4000
```
</details>

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Comprueba que NodeODM responde |
| POST | `/api/tasks` | Sube fotos (`multipart: images[]`) y lanza el procesado |
| GET | `/api/tasks/:uuid` | Estado y progreso de la tarea |
| GET | `/api/tasks/:uuid/download/:asset` | Descarga un producto (`orthophoto.tif`, `dsm.tif`, …) |

Ejemplo:

```bash
curl -F "images=@foto1.jpg" -F "images=@foto2.jpg" \
     http://localhost:4000/api/tasks
# -> { "uuid": "..." }
```

## Requisitos

- **Docker** para NodeODM.
- **RAM**: la fotogrametría es exigente. Para conjuntos grandes conviene ≥ 16 GB
  y limitar la concurrencia (`--max_concurrency 1` en `docker-compose.yml`).
- Para **precisión con GCP**, adjunta el `gcp_list.txt` al crear la tarea (ver
  [../docs/PRECISION-GCP.md](../docs/PRECISION-GCP.md)).

## Pendiente (roadmap)

- Persistencia de proyectos y tareas (base de datos).
- WebSocket/polling de progreso hacia la app.
- Subida directa del `gcp_list.txt` y edición asistida de dianas.
- Autenticación y multiusuario.
