import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/api',
  reporter: 'html',
  use: {
    // All requests we send go to this API endpoint.
    baseURL: 'https://demoqa.com',

  }
});