import { DADOS } from "../../support/dados";
import { ELEMENTS } from "../../support/elements";
import { URLS } from "../../support/urls";

describe('Login', () => {
    it('Login com usuário bloqueado', () => {
        cy.visit(URLS.front.baseUrl)
        cy.get(ELEMENTS.login.username)
            .type(DADOS.sauceDemo.blockUser.user)
            .should('have.value', DADOS.sauceDemo.blockUser.user)
        cy.get(ELEMENTS.login.password)
            .type(DADOS.sauceDemo.blockUser.password, {log: false})
        cy.get(ELEMENTS.login.loginButton).click()
        cy.get(ELEMENTS.login.loginErrorMessage)
            .should('have.text', ELEMENTS.messages.blockedUser)
    })
})