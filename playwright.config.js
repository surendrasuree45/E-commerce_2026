// @ts-check
/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';
import { getRequiredEnvironmentVariable } from './tests/utils/environment.js';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({

  testDir: './tests',
  retries: 1,
 
  reporter: [
    ['html'],
    ['./reporters/consoleReporter.ts'],
  ],
 
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    baseURL: getRequiredEnvironmentVariable('WEB_BASE_URL'),
    trace: 'on-all-retries',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

});

