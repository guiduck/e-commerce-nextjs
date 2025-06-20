describe("Pagination", () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.viewport(1280, 800);
    cy.visit("/produtos?page=1");
  });

  it("navigates to next page", () => {
    cy.contains("button", "2").click();

    cy.url().should("include", "page=2");

    cy.contains("button", "2").should("have.class", "bg-primary");
  });
});
