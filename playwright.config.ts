import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 20000,
  expect: {
      timeout: 5000
  },
  maxFailures: process.env.CI ? 3 : undefined,

  /* Ejecutar tests en paralelo cuando sea posible */
  fullyParallel: true,

  /* Prevenir test.only en CI */
  forbidOnly: !!process.env.CI,

  /* Reintentos: 2 en CI para evitar falsos negativos, 0 en local para debugging rápido */
  retries: process.env.CI ? 1 : 1,

  /*
   * Workers optimizado:
   * - CI: 1 worker (ambiente controlado, recursos limitados)
   * - Local: 3 workers (balance entre velocidad y recursos para 10 tests)
   * Con 10 tests, más de 3-4 workers no aporta mejora significativa
   */
  workers: process.env.CI ? 1 : 3,

  /*
   * Reporters:
   * - html: Para análisis detallado post-ejecución
   * - list: Feedback en tiempo real durante ejecución
   */
  reporter: [
    ['html'],
    ['list']
  ],

  /* Configuración compartida para todos los tests */
  use: {
    /* Base URL para simplificar navegación */
    baseURL: 'http://localhost:3000',

    /* Screenshots solo en fallo para debugging */
    screenshot: 'only-on-failure',

    /* Video solo en fallo para análisis de errores */
    video: 'retain-on-failure',

    /* Trace en fallo para debugging profundo */
    trace: 'on-first-retry',

    /* Modo no headless para visualizar la ejecución */
    headless: true,

    /* SlowMo: delay entre acciones para visualizar ejecución (solo en modo demo) */
    launchOptions: {
      slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO) : 0,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000'
  },
});
