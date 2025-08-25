import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      // If any Node built-ins are accidentally imported
      external: ['fs', 'path', 'os', 'crypto', 'stream', 'util'],
    },
  },
});
