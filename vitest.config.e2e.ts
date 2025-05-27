import { resolve } from 'path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    alias: {
      '@': './src',
      '@test': './test',
    },
    root: './'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@test': './test'
    }
  },
  plugins: [swc.vite()]
});