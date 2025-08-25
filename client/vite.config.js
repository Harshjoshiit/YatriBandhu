import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // This tells Vite's bundler (Rollup) to treat these Node.js modules
      // as "external". This means it won't try to bundle them for the browser,
      // which is what causes the build to fail.
      external: [
        'fs',
        'path',
        'os',
        'crypto',
        'stream',
        'http',
        'https',
        'net',
        'tls',
        'zlib',
        'url'
      ]
    }
  }
});
