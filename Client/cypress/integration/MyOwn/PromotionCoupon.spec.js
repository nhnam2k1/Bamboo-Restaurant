describe('Promotion Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login');
      cy.get(':nth-child(1) > .form-control').clear();
      cy.get(':nth-child(1) > .form-control').type('fifa12345');
      cy.get(':nth-child(2) > .form-control').clear();
      cy.get(':nth-child(2) > .form-control').type('fifa12345');
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Visit Promotion Page', function() {
      /* ==== Generated with Cypress Studio ==== */
      cy.get('.btn').click();
      cy.get(':nth-child(3) > .nav-link').should('have.text', ' Promotion');
      cy.get(':nth-child(3) > .nav-link').click();
      cy.get('.promotion-page-header').should('have.class', 'promotion-page-header');
      cy.get('.promotion-page').should('have.class', 'promotion-page');
      cy.get('.progress').should('have.class', 'progress');
      /* ==== End Cypress Studio ==== */
    });
});