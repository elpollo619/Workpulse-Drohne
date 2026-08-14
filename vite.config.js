import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // El backend de procesamiento (server/) corre en :4000 en desarrollo.
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
  build: {
    // Separa las librerías pesadas en chunks propios para mejorar la carga.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          geo: ['@turf/turf', 'proj4'],
          raster: ['georaster', 'georaster-layer-for-leaflet'],
          map: ['leaflet', '@geoman-io/leaflet-geoman-free'],
          three: ['three'],
        },
      },
    },
  },
})
