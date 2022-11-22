/// <reference types="Cypress" />

describe('RSS', () => {
  let items = []
  let title = ''

  before(() => {
    cy.request('/rss.xml')
    .as('rss')
    .then((response) => {
      let body = Cypress.$(response.body)
      title = body.find('channel>title').text()
      items = body.find('item').toArray()
    });
  });

  it('should have a feed title', () => {
    expect(title).to.contain('RSS Feed')
  });

  it('should have items', () => {
    expect(items.length).to.be.greaterThan(0)
  });
});