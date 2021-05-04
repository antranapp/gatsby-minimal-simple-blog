/// <reference types="Cypress" />

describe('Sitemap', () => {
  let urls = [];

  before(() => {
    cy.request('sitemap.xml')
    .as('sitemap')
    .then((response) => {
      urls = Cypress.$(response.body)
        .find('loc')
        .toArray()
        .map(el => el.innerText);

      console.log(urls)
    });
  });

  it('should have non empty urls', () => {
    expect(urls.length).to.be.greaterThan(0)
  });
});