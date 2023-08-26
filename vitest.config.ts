import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      all: true,
      clean: true,
      enabled: true,
      exclude: [
        '**/app/*',
        'appServer.ts',
        '**/lib/*',
        '**/migrations/*',
        '**/modules/**/*.route.ts',
        '**/modules/**/*.mapper.ts',
        '**/routes/*',
        '**/entity/*',
        '**/types/*',
        '__tests__/*',
        'dist/*',
        'vitest.config.ts',
      ],
      provider: 'v8',
      reportsDirectory: './__tests__/coverage',
      skipFull: true,
      thresholdAutoUpdate: true,
    },
    exclude: [...configDefaults.exclude],
    globals: true,
    include: ['./__tests__/unit/**/*.test.ts'],
    mockReset: true,
    slowTestThreshold: 50,
    typecheck: { checker: 'tsc' },
  },
});
