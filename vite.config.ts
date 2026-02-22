import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
