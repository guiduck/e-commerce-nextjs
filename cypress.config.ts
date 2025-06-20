// cypress.config.ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "src/components/**/*.cy.{js,ts,jsx,tsx}",
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
