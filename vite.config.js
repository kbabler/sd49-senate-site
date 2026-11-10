import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    },
    proxy: {
      '/api/substack-feed': {
        target: 'https://www.toptal.com',
        changeOrigin: true,
        rewrite: () => `/developers/feed2json/convert?url=${encodeURIComponent('https://krisbabler.substack.com/feed')}`
      }
    }
  }
})
