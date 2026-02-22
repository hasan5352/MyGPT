import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const env = loadEnv('', process.cwd(), '')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { '/api' : { target: env.BACKEND_API_URL } },
    // changeOrigin: true
  },
  build: {
    outDir: 'dist'
  }

})