/* ==== Test Created with Cypress Studio ==== */
it('Logout Test', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('login');
  cy.get(':nth-child(1) > .form-control').clear();
  cy.get(':nth-child(1) > .form-control').type('fifa12345');
  cy.get(':nth-child(2) > .form-control').clear();
  cy.get(':nth-child(2) > .form-control').type('fifa12345');
  cy.get('.btn').click();
  cy.get(':nth-child(5) > .nav-link').should('have.text', ' Logout');
  cy.wait(1000);
  cy.get(':nth-child(5) > .nav-link').click();
  cy.get('.btn').should('have.text', 'Log In');
  /* ==== End Cypress Studio ==== */
});