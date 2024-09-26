import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // Makes server externally accessible
    port: 3000,   // Frontend will run on port 3000
    proxy: {
      '/api': {
        target: 'http://localhost:4000',  // URL of the Node.js backend
        changeOrigin: true,               // Changes the origin of the host header to the target URL
        secure: false,                    // Use secure false if backend is HTTP (not HTTPS)
        rewrite: (path) => path.replace(/^\/api/, '') // Optionally rewrite the URL (removes '/api' from the path)
      }
    }
  }
})
