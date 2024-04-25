import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      'process.env': { ...process.env, ...env },
    },
    build: {
      outDir: 'build',
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
    plugins: [react(), tsconfigPaths()],
  }
})
