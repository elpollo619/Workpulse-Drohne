#!/usr/bin/env bash
# Instalador de un clic del motor de procesamiento de Workpulse Drohne.
#
#   bash server/install.sh
#
# Comprueba los requisitos, levanta NodeODM (OpenDroneMap) en Docker,
# instala las dependencias de la API y la deja corriendo en :4000.
set -euo pipefail

cd "$(dirname "$0")"

say() { printf '\n\033[1;32m▸ %s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31m✗ %s\033[0m\n' "$*"; exit 1; }

say "Workpulse Drohne — instalación del motor de procesamiento"

# 1. Requisitos
command -v docker >/dev/null 2>&1 \
  || fail "Falta Docker. Instálalo desde https://docs.docker.com/get-docker/ y vuelve a ejecutar."
docker info >/dev/null 2>&1 \
  || fail "Docker está instalado pero no corriendo. Arranca Docker Desktop (o el daemon) y reintenta."
command -v node >/dev/null 2>&1 \
  || fail "Falta Node.js (≥18). Instálalo desde https://nodejs.org y vuelve a ejecutar."

NODE_MAJOR=$(node -e 'console.log(process.versions.node.split(".")[0])')
[ "$NODE_MAJOR" -ge 18 ] || fail "Node.js $NODE_MAJOR es demasiado viejo; se necesita ≥18."

# 2. Motor NodeODM (OpenDroneMap)
say "Levantando NodeODM (la primera vez descarga ~1.5 GB, paciencia)…"
docker compose up -d

say "Esperando a que NodeODM responda en :3000…"
for i in $(seq 1 60); do
  if curl -sf http://localhost:3000/info >/dev/null 2>&1; then break; fi
  sleep 2
  [ "$i" -eq 60 ] && fail "NodeODM no respondió tras 2 minutos. Mira: docker compose logs"
done

# 3. API de orquestación
say "Instalando dependencias de la API…"
npm install --no-audit --no-fund

say "Todo listo. Arrancando la API en http://localhost:4000 (Ctrl+C para parar)"
say "Deja esta terminal abierta y abre la app: la pestaña ⚙️ Procesar quedará activa."
exec npm start
