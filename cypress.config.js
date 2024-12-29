module.exports = {
  viewportWidth: 1080,
  viewportHeight: 920,
  video: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/integration/Specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/integration.js',
  },
}
