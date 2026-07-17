const { defineConfig } = require('cypress');

module.exports = defineConfig({
  allowCypressEnv: false,
  video: true,

  e2e: {
    baseUrl: 'https://automationpratice.com.br',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
