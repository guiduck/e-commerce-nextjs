describe("Homepage", () => {
  it("should load homepage and show main title", () => {
    cy.visit("/");
    cy.contains("h1", "Welcome").should("exist"); // ajuste conforme seu conteúdo real
  });
});
