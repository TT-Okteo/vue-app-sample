import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      clearMocks: true,
      reporters: ['default', 'json'],
      outputFile: 'results/vitest-results.json',
      coverage: {
        provider: 'istanbul',
        all: true,
        include: ['src'],
        exclude: ['src/**/__tests__/*', 'src/main.ts', 'src/router/index.ts', 'src/models/*', 'src/config/*', 'src/constants/*'],
        reporter: ['json-summary', 'text', 'html', 'lcov'],
      },
      setupFiles: ['src/test-setup.ts'],
    },
  }),
);
