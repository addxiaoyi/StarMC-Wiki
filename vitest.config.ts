import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['services/**'],
      thresholds: {
        lines: 0.9,
        functions: 0.9,
        branches: 0.8,
        statements: 0.9
      }
    }
  }
});
