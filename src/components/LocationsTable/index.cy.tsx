describe("LocationsTable", () => {
  let fixtureData: any;

  before(() => {
    cy.fixture("locations.json").then((data) => {
      fixtureData = data;
    });
  });

  beforeEach(() => {
    cy.loginAsUser();
    cy.viewport(1280, 800);

    cy.visit("/warehouses", {
      onBeforeLoad(win) {
        const stub = cy.stub().callsFake((url: string) => {
          if (url.includes("locations")) {
            return Promise.resolve({
              ok: true,
              json: () => Promise.resolve(fixtureData),
            });
          }
          return fetch(url);
        });

        win.fetch = stub;
        (win as any).fetchStub = stub;
      },
    });
  });

  it("displays table after search", () => {
    cy.get("input[placeholder*='Latitude']").type("40.7128,-74.0060");
    cy.contains("Buscar Localizações").click();

    cy.window().its("fetchStub").should("be.called");

    cy.contains("Resultados", { timeout: 6000 }).should("exist");
    cy.get("table").should("exist");
    cy.get("tbody tr").should("have.length", 2);

    cy.contains("Warehouse NYC").should("exist");
    cy.contains("Centro SP").should("exist");
    cy.contains("Distribuição regional").should("exist");
    cy.contains("Armazenamento").should("exist");
  });
});
