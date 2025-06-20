describe("FullScreenMenu", () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.viewport(1280, 800);
    cy.visit("/");
  });

  it("toggles between dark and light mode", () => {
    cy.get('[data-testid="theme-toggle"]').click();

    cy.get("html").should("have.class", "dark");

    cy.get('[data-testid="theme-toggle"]').click();

    cy.get("html").should("not.have.class", "dark");
  });
});
