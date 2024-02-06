const {defineConfig} = require("cypress");

module.exports = defineConfig({
  projectId: '9ztpvz',
    e2e: {
        reporter: 'cypress-mochawesome-reporter',
        reporterOptions: {
            reportDir: 'reports/html',
            reportPageTitle: 'DEVAIS Cypress Automation Report',
            charts: true,
            quiet: false,
            showPassed: true,
            showFailed: true,
            showSkipped: true,
            showPending: true,
            showHooks: 'always',
            inlineAssets: true,
            saveAllAttempts: true,
            showTestDuration: true,
            embeddedScreenshots: true
        },
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
        },
        baseUrl: 'https://www.google.com',
        viewportHeight: 1080,
        viewportWidth: 1920,
        retries: 1,
        video: true,
        experimentalWebKitSupport: true,
        experimentalRunAllSpecs: true,
        experimentalStudio: true,
        includeShadowDom: true,
    },

    /*
* Environment Variables are set in the following order of priority:
* 1. URLs for different environments
* 2. Global Environment Variables
* 3. Dev Environment Variables
* 4. Prod Environment Variables
* 5. Test Environment Variables
*/
    env: {
        // URLs for different environments
        TEST_LOCAL_URL: 'http://localhost:1234/test',
        TEST_URL: '',
        DEV_LOCAL_URL: 'http://localhost:1234/dev',
        DEV_URL: '',
        PROD_LOCAL_PROD_URL: 'http://localhost:1234/prod',
        PROD_PROD_URL: '',

        // Global Environment Variables
        GLOBAL_ADMIN_USERNAME: 'https://www.amazon.com/',
        GLOBAL_ADMIN_PASSWORD: 'password',

        // test Environment Variables
        "test": {
            TEST_ADMIN_USERNAME: 'username',
            TEST_ADMIN_PASSWORD: 'password',
        },

        // Dev Environment Variables
        "dev": {
            DEV_ADMIN_USERNAME: 'username',
            DEV_ADMIN_PASSWORD: 'password',
        },

        // Prod Environment Variables
        "prod": {
            PROD_ADMIN_USERNAME: 'username',
            PROD_ADMIN_PASSWORD: 'password',
        },
    }

});
