describe("Product Detail Page", () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.visit("/produtos");
  });

  it("opens product detail and displays content", () => {
    cy.get("[data-testid=product-card]")
      .first()
      .find("a[href^='/produto/']")
      .click({ force: true });

    cy.location("pathname", { timeout: 10000 }).should("include", "/produto/");

    cy.contains("Produto").should("exist");
    cy.get("img").should("exist");
    cy.contains(/\$\d+/).should("exist");
  });
});
