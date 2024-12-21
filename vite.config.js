import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Set this to true to avoid seeing deprecation warnings from dependencies
        quietDeps: true,
        api: 'modern-compiler', // or 'modern'
        silenceDeprecations: ['legacy-js-api'],
        // silenceDeprecations: true
      },
    },
  },
})
