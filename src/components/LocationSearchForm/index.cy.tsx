describe("LocationSearchForm", () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.visit("/warehouses");
  });

  it("renders the form with default values", () => {
    cy.contains("Inserir localização").should("exist");
    cy.contains("Localização atual").should("exist");
    cy.get("input[type='radio']").should("have.length", 2);
    cy.get("input[placeholder*='Latitude']").should("exist");
    cy.contains("Buscar Localizações").should("exist");
  });

  it("allows manual input and submits", () => {
    const testInput = "40.7128,-74.0060";

    cy.get("input[placeholder*='Latitude']").type(testInput);
    cy.contains("Buscar Localizações").click();

    cy.contains(testInput).should("not.exist");
  });

  it("toggles to current location mode", () => {
    cy.contains("Localização atual").click();

    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
        (cb) => {
          cb({ coords: { latitude: 1.23, longitude: 4.56 } });
        }
      );
    });

    cy.contains("Buscar Localizações").click();
  });
});
