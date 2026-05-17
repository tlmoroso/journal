/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Temporary cast keeps typecheck/lint green until vitest config typing is finalized.
export default defineConfig({
  plugins: [process.env.VITEST ? null : tanstackStart(), viteReact()],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
} as unknown as import('vite').UserConfig);
