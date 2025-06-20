import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    NODE_ENV: "test",
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "src/components/**/*.cy.{js,ts,jsx,tsx}",
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    setupNodeEvents(on, config) {
      return config;
    },
  },
  // component: {
  //   devServer: {
  //     framework: "next",
  //     bundler: "webpack",
  //   },
  //   specPattern: "src/components/**/*.cy.{js,ts,jsx,tsx}",
  //   supportFile: "cypress/support/component.ts",
  // },
});
