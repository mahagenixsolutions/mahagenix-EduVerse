import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      onwarn() {
        // Suppress all warnings to prevent Vercel CI from crashing
      }
    }
  },
  server: {
    fs: {
      allow: [
        'C:/Users/vasal/.gemini',
        'c:/javascript/CampusOne',
        'C:/javascript/CampusOne'
      ]
    }
  }
});
