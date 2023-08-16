import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude],
    include: [...configDefaults.include],
    alias: {
      '#src': './dist/src',
      '#test': './test',
    },
    threads: true,
    useAtomics: true,
    isolate: true,
    coverage: {
      provider: 'v8',
      enabled: true,
      clean: true,
      cleanOnRerun: true,
      reportsDirectory: './coverage',
      reporter: ['text', 'html'],
      reportOnFailure: true,
      skipFull: false,
    },
    restoreMocks: true,
    sequence: {
      shuffle: true,
      seed: Date.now(),
    },
    typecheck: {
      checker: 'tsc',
    },
  },
})
