import { defineConfig } from '@playwright/test';
export default defineConfig({
    testDir: './tests',
    timeout: 10000,
    retries: 1,
    use: {
        headless: false,
        baseURL: 'https://todomvc.com/examples/react/dist/',
        screenshot: 'only-on-failure',
        launchOptions: {
            slowMo: 500,
        },
    },
});
