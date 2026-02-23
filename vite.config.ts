import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group all MUI packages together
            if (id.includes('@mui')) return 'vendor-mui';
            // Group all Firebase packages together
            if (id.includes('firebase')) return 'vendor-firebase';
            // Group React core together
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router')
            ) {
              return 'vendor-react';
            }
            // Everything else goes into a generic vendor chunk
            return 'vendor';
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    coverage: {
      thresholds: {
        'src/': {
          statements: 60,
          branches: 65,
          functions: 50,
          lines: 60,
        },
        'src/components/': {
          statements: 45,
          branches: 50,
          functions: 35,
          lines: 50,
        },
        'src/lib/': {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
        },
        'src/models/**/*.ts': {
          statements: 90,
          branches: 80,
          functions: 85,
          lines: 90,
        },
        'src/pages/': {
          statements: 40,
          branches: 45,
          functions: 20,
          lines: 35,
        },
      },
    },
  },
});
