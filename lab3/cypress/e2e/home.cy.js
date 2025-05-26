describe("Home Page Tests", () => {
  beforeEach(() => {
    cy.visit("https://piw-lab3-project.web.app/");
  });

  it("Home page should be loaded and books should be displayed", () => {
    cy.contains("Apple Worm 2.0 - Library").should("exist");
    cy.get("li").should("have.length.greaterThan", 0);
  });

  it("Books should be filtered by title", () => {
    cy.get("#titleFilter").type("War and Peace");

    cy.get("li").should("have.length", 1);
    cy.contains("War and Peace").should("exist");
  });

  it("Books should be filtered by author", () => {
    cy.get("#authorFilter").type("Tolstoy");

    cy.get("li").should("have.length", 1);
    cy.contains("Leo Tolstoy").should("exist");
  });

  it("Hard Cover checkbox should filter the books", () => {
    cy.visit("https://piw-lab3-project.web.app/");

    cy.get("li").should("have.length.greaterThan", 0);

    cy.contains("label", "Hard Cover").click();

    cy.get("li").should("have.length.greaterThan", 0).and("have.length.lte", 6);
  });

  it("Soft Cover checkbox should filter the books", () => {
    cy.visit("https://piw-lab3-project.web.app/");

    cy.get("li").should("have.length.greaterThan", 0);

    cy.contains("label", "Soft Cover").click();

    cy.get("li").should("have.length.greaterThan", 0).and("have.length.lte", 6);
  });

  it("No results should be shown when having bad input", () => {
    cy.get("#titleFilter").type("qwerty");
    cy.get("p").should("contain", "No books found");
  });
});
