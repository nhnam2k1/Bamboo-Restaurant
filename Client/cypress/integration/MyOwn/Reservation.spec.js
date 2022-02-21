// Reservation.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Rerservation Page', () =>  {
    /* ==== Test Created with Cypress Studio ==== */
    beforeEach(() => {
        cy.visit('login');
        cy.get(':nth-child(1) > .form-control').clear();
        cy.get(':nth-child(1) > .form-control').type('fifa12345');
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('fifa12345');
        cy.get('.btn').click();
        cy.get(':nth-child(2) > .nav-link').click();
    });

    it('Visit Reservation Page', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.reservation-page-body').should('have.class', 'reservation-page-body');
        cy.get('.reservation-page-header').should('have.class', 'reservation-page-header');
        /* ==== End Cypress Studio ==== */
    });
    
    /* ==== Test Created with Cypress Studio ==== */
    it('Show Create New Reservation Form', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.btn-info').click();
        cy.get('.modal-header').should('have.text', 'Create New Reservation');
        cy.get('.modal-header').should('have.class', 'modal-header');
        cy.get('.modal-body').should('have.class', 'modal-body');
        cy.get('.modal-footer').should('have.class', 'modal-footer');
        cy.get('.btn-warning').should('have.text', 'Reset');
        cy.get('.btn-success').should('have.text', 'Make Reservation');
        /* ==== End Cypress Studio ==== */
    });

    it('Make New Reservation', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.btn-info').click();
        cy.get('#create-reservation-date').clear();
        cy.get('#create-reservation-date').type('2022-12-28');
        cy.get('#startTime').clear();
        cy.get('#startTime').type('15:30');
        cy.get('#nrPeople').clear();
        cy.get('#nrPeople').type('6');
        cy.get('#description').clear();
        cy.get('#description').type('Lunch');
        cy.get('#aisle').check();
        cy.get('.btn-success').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .card-body > :nth-child(1) > .reservation-detail')
        .should('have.class', 'reservation-detail');
        cy.get(':nth-child(1) > .card-body > :nth-child(1) > .reservation-detail')
        .should('have.text', 
                'ReservationDate: 2022-12-28Time: 15:30:00-16:30:00Description:  This booking will have 6 people in a table.LunchAllergies: NoPreferred Table: Aisle');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Remove Reservation', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.btn-danger').should('have.text', 'Remove');
        cy.get('.btn-danger').click();
        cy.get('.reservation-page-body').should('have.class', 'reservation-page-body');
        /* ==== End Cypress Studio ==== */
    });
});
