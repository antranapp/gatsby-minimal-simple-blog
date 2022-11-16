/// <reference types="Cypress" />

describe("Blog Index", () => {
    beforeEach(() => {
      cy.visit("/")
    })
    
    describe('Headline', () => {
      it("should contain", () => {
        cy.contains('h1 > a', 'gatsby-minimal-simple-blog');
      })
    })

    describe('Bio', () => {
      it('should have avatar.', function () {
        cy.get('.bio-avatar').should('exist');
      });
  
      it('should contain expected sentence.', function () {
        cy.contains(
          'p',
          /Personal blog by./i
        );
      });
  
      it('should contain a link to twitter profile.', function () {
        cy.get("a[href='https://twitter.com/AnTranApp']").should('exist');
      });
    });    
})