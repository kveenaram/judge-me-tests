const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://judge.me',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    videoCompression: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // This is where you can add custom plugins or configurations
    },
  },
  env: {
    reviewsPath: '/reviews',
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/test-results-[hash].xml',
    toConsole: true
  }
})