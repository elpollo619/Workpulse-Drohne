import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Rutas relativas: funciona igual en local y bajo /Workpulse-Drohne/ en Pages.
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      // La compilación Rollup rompe la cadena CJS interna de esta librería
      // ("proj4.defs is not a function" al arrancar en producción). Su bundle
      // webpack preempaquetado no tiene ese problema.
      // Fuerza a que todo require/import de proj4 resuelva al build UMD, cuyo
      // module.exports es directamente la función (evita el lío {default: fn}).
      proj4: fileURLToPath(
        new URL('./node_modules/proj4/dist/proj4-src.js', import.meta.url)
      ),
      georaster: fileURLToPath(
        new URL(
          './node_modules/georaster/dist/georaster.browser.bundle.min.js',
          import.meta.url
        )
      ),
      'georaster-layer-for-leaflet': fileURLToPath(
        new URL(
          './node_modules/georaster-layer-for-leaflet/dist/georaster-layer-for-leaflet.bundle.js',
          import.meta.url
        )
      ),
    },
  },
  server: {
    port: 5173,
    host: true,
    // El backend de procesamiento (server/) corre en :4000 en desarrollo.
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
  build: {
    // Nota: no usar manualChunks aquí — separar proj4/georaster en chunks
    // distintos rompe la interoperabilidad CJS de georaster en producción
    // ("proj4.defs is not a function" al arrancar). Vite agrupa correctamente
    // por sí solo.
    chunkSizeWarningLimit: 2000,
  },
})
