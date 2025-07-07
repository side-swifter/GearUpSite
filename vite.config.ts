import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Enable strict file system handling
    fs: {
      strict: true,
    },
    // This ensures that the server handles SPA routing
    // by serving index.html for all routes
    proxy: {
      // This is a catch-all proxy for SPA routing
      // It tells the dev server to serve index.html for all routes
      '^/(?!@vite|@react-refresh|@id|node_modules|src|assets|public).*': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: (path) => '/index.html',
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    outDir: 'dist',
    assetsDir: 'assets',
    // This ensures the _redirects file is copied to the output directory
    assetsInlineLimit: 0, // Ensure all assets are copied as files
  },
  // This ensures the _redirects file is properly handled
  publicDir: 'public',
  // This is important for client-side routing
  // It sets the base URL for the application
  base: '/',
})
