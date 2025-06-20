// cypress/support/index.d.ts

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    loginAsUser(): Chainable<void>;
  }
}
