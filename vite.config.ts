import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from "path";
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({ 
      registerType: 'autoUpdate' ,
      includeAssets: ['logo.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Timer',
        short_name: 'Timer',
        description: 'Just another timer',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: [
      { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
    ]
  }
})
