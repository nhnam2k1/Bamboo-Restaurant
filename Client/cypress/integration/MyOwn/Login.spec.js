describe('Login Test', () => {
    /* ==== Test Created with Cypress Studio ==== */
    beforeEach(() => {
        cy.visit('login');
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Visit Login', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#bg-block').should('be.visible');
        /* ==== End Cypress Studio ==== */
    });

    it('Successful Login', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .form-control').clear();
        cy.get(':nth-child(1) > .form-control').type('fifa12345');
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('fifa12345');
        cy.get('.btn').click();
        cy.get('.profile-card-area').should('have.class', 'profile-card-area');
        cy.get('.edit-profile-area').should('have.class', 'edit-profile-area');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Wrong Login', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .form-control').clear();
        cy.get(':nth-child(1) > .form-control').type('Fifa123456');
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('Fifa12345');
        cy.get('.btn').click();
        cy.get(':nth-child(2) > .invalid-feedback').should('have.class', 'invalid-feedback');
        cy.get(':nth-child(2) > .invalid-feedback > small').should('have.text', 'Wrong username/password, please try again !');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Go to Registration Page', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.mt-3 > .text-info').click();
        cy.get('.btn').should('have.text', 'Register');
        cy.get('form').should('have.text', 'Register');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Password Too Short', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .form-control').clear();
        cy.get(':nth-child(1) > .form-control').type('fifa12345');
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('fifa');
        cy.get('.btn').click();
        cy.get(':nth-child(2) > .invalid-feedback').should('be.visible');
        cy.get(':nth-child(2) > .invalid-feedback > small').should('have.text', 'The password must consist at least 8 characters');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Username Too Short', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .form-control').clear();
        cy.get(':nth-child(1) > .form-control').type('fifa');
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('fifa12345');
        cy.get('.btn').click();
        cy.get(':nth-child(1) > .invalid-feedback > small').should('be.visible');
        cy.get(':nth-child(1) > .invalid-feedback > small').should('have.text', 'The username must consists at least 8 characters');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Both Too Short', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .form-control').clear();
        cy.get(':nth-child(1) > .form-control').type('fifa');
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('fifa123');
        cy.get('.btn').click();
        cy.get(':nth-child(1) > .invalid-feedback > small').should('be.visible');
        cy.get(':nth-child(2) > .invalid-feedback').should('be.visible');
        cy.get(':nth-child(1) > .invalid-feedback > small').should('have.text', 'The username must consists at least 8 characters');
        cy.get(':nth-child(2) > .invalid-feedback > small').should('have.text', 'The password must consist at least 8 characters');
        /* ==== End Cypress Studio ==== */
    });
});