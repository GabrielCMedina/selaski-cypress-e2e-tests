// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add('loginWithPin', (pin) => {
    cy.visit('https://www.selaski.com/public/reports/shared?token=cdexd34d7a31da5257e1d5f7af80e21995f0dfeft');
  
    cy.get('input[formcontrolname="digit1"]').type(pin[0]);
    cy.get('input[formcontrolname="digit2"]').type(pin[1]);
    cy.get('input[formcontrolname="digit3"]').type(pin[2]);
    cy.get('input[formcontrolname="digit4"]').type(pin[3]);
  
    cy.get('button[type="submit"]').click();
  });