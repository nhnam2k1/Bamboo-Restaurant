describe('Registration Page', ()=>{
    let crypto = require("crypto");
    let randomUser = crypto.randomBytes(4).toString('hex');
    let password = "Testing12345";

    beforeEach(() => {
        cy.visit('registration');
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Visit Registration', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.mt-3 > .text-info')
        .should('have.text', 'Already have account ? Login here');
        cy.get('form').should('have.text', 'Register');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Success Registration', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .form-group > .form-control').clear();
        cy.get(':nth-child(1) > .form-group > .form-control').type('Nam');
        cy.get('.row > :nth-child(2) > .form-group > .form-control').clear();
        cy.get('.row > :nth-child(2) > .form-group > .form-control').type('Nam');
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('n@g.com');
        cy.get(':nth-child(3) > .form-control').clear();
        cy.get(':nth-child(3) > .form-control').type('Eindhoven');
        cy.get(':nth-child(4) > .form-control').clear();
        cy.get(':nth-child(4) > .form-control').type('Lolo12345');
        cy.get(':nth-child(4) > .form-control').clear();
        cy.get(':nth-child(4) > .form-control').type(randomUser);
        cy.get(':nth-child(5) > .form-control').clear();
        cy.get(':nth-child(5) > .form-control').type(password);
        cy.get(':nth-child(6) > .form-control').clear();
        cy.get(':nth-child(6) > .form-control').type(password);
        cy.get('.btn').click();
        cy.get('form').should('have.text', 'Log In');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Duplicate Username', function() {
        cy.get(':nth-child(1) > .form-group > .form-control').clear();
        cy.get(':nth-child(1) > .form-group > .form-control').type('Nam');
        cy.get('.row > :nth-child(2) > .form-group > .form-control').clear();
        cy.get('.row > :nth-child(2) > .form-group > .form-control').type('Nam');
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('n@g.com');
        cy.get(':nth-child(3) > .form-control').clear();
        cy.get(':nth-child(3) > .form-control').type('Eindhoven');
        cy.get(':nth-child(4) > .form-control').clear();
        cy.get(':nth-child(4) > .form-control').type('Lolo12345');
        cy.get(':nth-child(4) > .form-control').clear();
        cy.get(':nth-child(4) > .form-control').type(randomUser);
        cy.get(':nth-child(5) > .form-control').clear();
        cy.get(':nth-child(5) > .form-control').type(password);
        cy.get(':nth-child(6) > .form-control').clear();
        cy.get(':nth-child(6) > .form-control').type(password);
        cy.get('.btn').click();
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(4) > .invalid-feedback > small')
        .should('have.text', 'This username has been existed');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Confirm Password Not Same', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .form-group > .form-control').clear();
        cy.get(':nth-child(1) > .form-group > .form-control').type('Nam');
        cy.get('.row > :nth-child(2) > .form-group > .form-control').clear();
        cy.get('.row > :nth-child(2) > .form-group > .form-control').type('Nam');
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('n@g.com');
        cy.get(':nth-child(3) > .form-control').clear();
        cy.get(':nth-child(3) > .form-control').type('Eindhoven');
        cy.get(':nth-child(4) > .form-control').clear();
        cy.get(':nth-child(4) > .form-control').type('Lolo12345');
        cy.get(':nth-child(5) > .form-control').clear();
        cy.get(':nth-child(5) > .form-control').type(password);
        cy.get(':nth-child(6) > .form-control').clear();
        cy.get(':nth-child(6) > .form-control').type(password+"123");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(6) > .invalid-feedback > small').should('be.visible');
        cy.get(':nth-child(6) > .invalid-feedback > small').should('have.text', 'Passwords must match');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Username Too Short', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .form-group > .form-control').clear();
        cy.get(':nth-child(1) > .form-group > .form-control').type('Nam');
        cy.get('.row > :nth-child(2) > .form-group > .form-control').clear();
        cy.get('.row > :nth-child(2) > .form-group > .form-control').type('Nam');
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('n@g.com');
        cy.get(':nth-child(3) > .form-control').clear();
        cy.get(':nth-child(3) > .form-control').type('Eindhoven');
        cy.get(':nth-child(4) > .form-control').clear();
        cy.get(':nth-child(4) > .form-control').type('Lolo12345');
        cy.get(':nth-child(4) > .form-control').clear();
        cy.get(':nth-child(4) > .form-control').type("1234");
        cy.get(':nth-child(5) > .form-control').clear();
        cy.get(':nth-child(5) > .form-control').type(password);
        cy.get(':nth-child(6) > .form-control').clear();
        cy.get(':nth-child(6) > .form-control').type(password);
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(4) > .invalid-feedback > small').should('be.visible');
        cy.get(':nth-child(4) > .invalid-feedback > small').should('have.text', 'The username must consists at least 8 characters');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Password Too Short', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .form-group > .form-control').clear();
        cy.get(':nth-child(1) > .form-group > .form-control').type('Nam');
        cy.get('.row > :nth-child(2) > .form-group > .form-control').clear();
        cy.get('.row > :nth-child(2) > .form-group > .form-control').type('Nam');
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('n@g.com');
        cy.get(':nth-child(3) > .form-control').clear();
        cy.get(':nth-child(3) > .form-control').type('Eindhoven');
        cy.get(':nth-child(4) > .form-control').clear();
        cy.get(':nth-child(4) > .form-control').type('Lolo12345');
        cy.get(':nth-child(4) > .form-control').clear();
        cy.get(':nth-child(4) > .form-control').type(password);
        cy.get(':nth-child(5) > .form-control').clear();
        cy.get(':nth-child(5) > .form-control').type("123456");
        cy.get(':nth-child(6) > .form-control').clear();
        cy.get(':nth-child(6) > .form-control').type("123456");
        cy.get('.btn').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(5) > .invalid-feedback > small').should('be.visible');
        cy.get(':nth-child(5) > .invalid-feedback > small').should('have.text', 'The password must consist at least 8 characters');
        /* ==== End Cypress Studio ==== */
    });
});