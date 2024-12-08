const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://judge.me',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    videoCompression: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      // We can add custom plugins here later if needed
    },
    env: {
      reviewsPath: '/reviews',
      // Add these for better network handling
      apiTimeout: 20000,
      waitForAnimations: true,
      animationDistanceThreshold: 50
    },
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'results/test-results-[hash].xml',
      toConsole: true
    }
  }
})