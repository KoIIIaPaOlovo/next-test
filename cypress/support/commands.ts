/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add("login", (email = Cypress.env('ADMIN_EMAIL'), password = Cypress.env('ADMIN_PASSWORD')) => {
    cy.visit('/login');
    cy.get('input[name*="email"]').type(email);
    cy.get('input[name*="password"]').type(password, { log: false });
    cy.get('button[name="submit-form"]').click();
    cy.url().should('not.include', '/login');
})

Cypress.Commands.add("resetDB", () => {
    cy.task('db:clear').then(() => cy.task('db:seed'));
})