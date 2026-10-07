import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // SPA fallback: refreshing /residential serves index.html in dev + preview.
  appType: 'spa',
  build: { target: 'es2019', cssCodeSplit: true }
});
