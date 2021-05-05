/// <reference types="Cypress" />

describe("Blog Post", () => {
  beforeEach(() => {
    cy.visit("/2021/minimal-technical-blogging-part3/")
  })
  
  describe('Headline', () => {
    it("should contain", () => {
      // Get header by class `global-header`.
      // Within header, there should be a link to home
      // with text `Minimal Blog`.
      cy.get('header[class="global-header"]').within(($header) => {
        cy.get('a[class="header-link-home"]').then(($link) => {
          expect($link).to.contain('gatsby-minimal-simple-blog');
        });
      });
    })
  })  

  describe('Article', () => {
    it("should have article.", function () {
      cy.get('article[class="blog-post"]').then($article => {
        expect($article).to.have.attr("itemscope")
        expect($article).to.have.attr("itemtype", "http://schema.org/Article")
      })
    })

    describe("Header", () => {
      it("should title with itemprop headline.", function () {
        cy.get('h1[itemprop="headline"]').should("exist")
      })
  
      it("should have published date.", function () {
        cy.get(".published-date").should("exist")
      })

      it("should have reading time.", function () {
        cy.get(".reading-time").should("exist")
      })

    })
  
    describe("Content", () => {
      it("should have article body (content).", function () {
        cy.get('section[itemprop="articleBody"]').should("exist")
      })
    })
      
  })

  describe("Footer", () => {
    it("should exist.", function () {
      cy.get("footer").should("exist")
    })

    it("should have bio.", function () {
      cy.get(".bio").should("exist")
    })

    describe("Bio", () => {
      it("should have avatar.", function () {
        cy.get(".bio-avatar").should("exist")
      })

      it("should have expected phrase.", function () {
        cy.contains(
          "p",
          /Personal blog by./i
        )
      })

      it("should have link to Twitter profile.", function () {
        cy.get('a[href="https://twitter.com/AnTranApp"]')
      })
    })
  })

  it("should have link to previous blog post.", function () {
    cy.get('a[rel="next"]').should("exist")
  })
})