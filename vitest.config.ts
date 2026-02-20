import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    css: {
      modules: {
        classNameStrategy: 'scoped', // Valid options: 'stable' or 'scoped'
      },
    },
    // Remove the deps.inline line since we're not using vitest-canvas-mock
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});