import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional, you can set custom port
    open: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
