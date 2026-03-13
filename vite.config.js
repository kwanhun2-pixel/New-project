import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/ecos': {
        target: 'https://ecos.bok.or.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ecos/, '/api'),
      },
    },
  },
})
