describe("ProductCard", () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.visit("/produtos");
    cy.waitForProducts();
  });

  it("shows at least one product card", () => {
    cy.get("[data-testid=product-card]").should("have.length.greaterThan", 0);
  });

  it("renders product price", () => {
    cy.get("[data-testid=product-card]")
      .first()
      .within(() => {
        cy.get("p").contains("$").should("exist");
      });
  });

  it("shows delete button if allowed", () => {
    cy.get("[data-testid=product-card]")
      .first()
      .within(() => {
        cy.contains("Deletar").should("exist");
      });
  });
});
