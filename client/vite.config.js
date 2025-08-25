import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react'], // Pre-bundle lucide-react to avoid Rollup treating it as external
  },
  build: {
    rollupOptions: {
      // Add any modules that Rollup thinks are Node-only
      external: [],
    },
  },
});
