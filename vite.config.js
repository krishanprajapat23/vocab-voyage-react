import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/vocab-voyage-react/',
  resolve: {
    alias: {
      // Add an alias for Bootstrap to resolve the `~` prefix
      bootstrap: 'bootstrap',
    },
  }
});
