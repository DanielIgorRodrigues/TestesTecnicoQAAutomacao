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

import { DADOS } from "./dados";
import { ELEMENTS } from "./elements";
import { URLS } from "./urls";

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add("login", () => {
  cy.visit(URLS.front.baseUrl)
  cy.get(ELEMENTS.login.username)
    .type(DADOS.sauceDemo.standardUser.user)
  cy.get(ELEMENTS.login.password).type(DADOS.sauceDemo.standardUser.password)
  cy.get(ELEMENTS.login.loginButton).click()
  cy.get(ELEMENTS.generalPageElements.pageName).should('have.text', ELEMENTS.messages.pageProducts)
})
