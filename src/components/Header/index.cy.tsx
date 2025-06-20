describe("Header (Mobile)", () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.viewport("iphone-x");
    cy.visit("/");
  });

  it("opens mobile menu and sees Products", () => {
    cy.get('[aria-label="Menu"]').click();
    cy.contains("nav", "Products").should("be.visible");
  });

  it("toggles theme", () => {
    cy.get('[aria-label="Menu"]').click();

    cy.get("html").within(() => {
      cy.get('[data-testid="theme-toggle"]').first().click({ force: true });
    });

    cy.get("html").should("have.class", "dark");
  });
});

describe("Header (Desktop)", () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.viewport(1280, 800);
    cy.visit("/");
  });

  it("shows navigation links", () => {
    cy.contains("Warehouses").should("be.visible");
    cy.contains("Produtos").should("be.visible");
  });

  it("clicks logout", () => {
    cy.contains("Logout").click();
    cy.url().should("include", "/login");
  });
});
