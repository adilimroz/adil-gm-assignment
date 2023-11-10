import { defineConfig, devices } from '@playwright/test';

// Environment-specific configurations
const ENV = process.env.NODE_ENV || 'development';
const BASE_URL = process.env.BASE_URL || 'https://demoqa.com';

const commonSettings = {
  trace: 'on-first-retry',
  // other common settings can be defined here
};

export default defineConfig({
  testDir: './tests/ui',
  fullyParallel: true,
  reporter: 'html',
  timeout: 60000,
  use: {
    baseURL: BASE_URL,
    ...commonSettings,
  },
  snapshotDir: './snapshots',
  expect: {
    toHaveScreenshot: { maxDiffPixels: 100 }
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        // additional custom settings for Chromium
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
        // additional custom settings for Firefox
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
        // additional custom settings for WebKit (Safari)
      },
    },
  ],
  // Example: Custom configurations based on the environment
  ...(ENV === 'production' && {
    reporter: 'allure',
  }),
});
