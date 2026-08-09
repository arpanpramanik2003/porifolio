import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-lucide': ['lucide-react'],
          'vendor-lenis': ['lenis'],
          'vendor-emailjs': ['@emailjs/browser'],
          'vendor-scroll': ['react-scroll'],
        },
      },
    },
  },
})
