import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import dotenv from 'dotenv'

export default defineConfig(() => {
  dotenv.config()

  return {
    define: {
      'process.env': {
        ...process.env,
      },
    },
    build: {
      outDir: 'build',
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.CLIENT_PORT as string),
      cors: false,
    },
    plugins: [react(), tsconfigPaths()],
  }
})
