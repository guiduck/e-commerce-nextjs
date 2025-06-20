describe("ProductsFilter", () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.viewport(1280, 800);
    cy.visit("/produtos");
    cy.waitForProducts();
  });

  it("shows filter controls", () => {
    cy.get("input[placeholder='Buscar por nome']").should("exist");
    cy.get("input[placeholder='Preço mínimo']").should("exist");
    cy.get("input[placeholder='Preço máximo']").should("exist");
    cy.contains("Todas categorias").should("exist");
  });

  it("filters products by name", () => {
    cy.get("input[placeholder='Buscar por nome']").type("cap");

    cy.get("[data-testid=product-card]").each(($card) => {
      cy.wrap($card).should("contain.text", "cap");
    });
  });
});
