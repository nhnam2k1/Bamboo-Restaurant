describe('Chat Test', ()=>{
    beforeEach(() => {
        cy.visit('login');
        cy.get(':nth-child(1) > .form-control').clear();
        cy.get(':nth-child(1) > .form-control').type('fifa12345');
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('fifa12345');
        cy.get('.btn').click();
    });

    it('Get the chat pop-up', ()=>{
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.material-icons').should('have.text', 'comment');
        cy.get('section > .btn').should('have.class', 'chat-btn');
        cy.get('.material-icons').should('be.visible');
        cy.get('section > .btn').should('be.visible');
        cy.get('section > .btn').should('be.enabled');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Open Chat Popup', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('section > .btn').click();
        cy.get('.chat-popup').should('have.class', 'chat-popup');
        cy.get('.chat-popup').should('be.visible');
        cy.get('.chat-popup-header').should('be.visible');
        cy.get('.chat-popup-header').should('have.class', 'chat-popup-header');
        cy.get('.chat-input-area > .btn').should('have.class', 'submit-msg');
        cy.get('.chat-input-area > .btn').should('be.visible');
        cy.get('.chat-input-area > .btn').should('be.enabled');
        cy.get('.chat-area').should('have.class', 'chat-area');
        cy.get('.chat-area').should('be.visible');
        cy.get('.chat-input-area > input').should('be.visible');
        cy.get('.chat-input-area > input').should('be.enabled');
        cy.get('.chat-input-area > input').should('have.attr', 'name', 'message');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Make a Chat', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('section > .btn').click();
        cy.get('.chat-input-area > input').clear();
        cy.get('.chat-input-area > input').type('Welcome to the Chat');
        cy.get('.chat-input-area > .btn > .material-icons').click();
        cy.get('.chat-area > :nth-last-child(1)').should('have.text', 'Welcome to the Chat');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Go To Admin Chat', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.wait(1000);
        cy.visit('admin/chat');
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.col-md-5').should('be.visible');
        cy.get('.col-md-7').should('have.class', 'chat-page-col');
        cy.get('.chat-area').should('have.class', 'chat-page-area');
        /* ==== End Cypress Studio ==== */
    });
});