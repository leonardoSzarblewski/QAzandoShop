const { defineConfig } = require("cypress");
const { startDevServer } = require("@cypress/webpack-dev-server");
const webpackConfig = require("./webpack.config");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://automationpratice.com.br",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",

    setupNodeEvents(on, config) {
      on("dev-server:start", (options) => startDevServer({ options, webpackConfig }));
      return config;
    },
  },
});
