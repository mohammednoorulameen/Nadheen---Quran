import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(), VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico'],
      manifest: {
        name: 'nadheenQuran',
        short_name: 'nadheen',
        description: 'My React PWA Application',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/alquran.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/alquran.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })],
  resolve:{
    alias:{
      "@": path.resolve(__dirname, "./src")
    }
  }
})
