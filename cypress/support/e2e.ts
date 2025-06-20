// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "whatwg-fetch";
export {};
Cypress.env("NODE_ENV", "test");

beforeEach(() => {
  cy.intercept("GET", "/products", {
    statusCode: 200,
    body: [
      {
        id: 1,
        title: "Global Mock Product",
        description: "Mock description",
        price: 42,
        category: { name: "Global Category", id: 1 },
        images: ["mock.png"],
      },
      {
        id: 2,
        title: "Global Mock Product",
        description: "Mock description",
        price: 45,
        category: { name: "Global Category", id: 1 },
        images: ["mock.png"],
      },
      {
        id: 3,
        title: "Global Mock Product",
        description: "Mock description",
        price: 47,
        category: { name: "Global Category", id: 1 },
        images: ["mock.png"],
      },
    ],
  }).as("getProducts");
});
