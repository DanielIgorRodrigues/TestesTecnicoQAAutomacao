import { DADOS } from "../../support/dados";
import { ELEMENTS } from "../../support/elements";

describe('Compra completa com mais de um produto', () => {

    beforeEach(() => {
        Cypress.Cookies.defaults({
            preserve: 'session-username'
        })
        cy.restoreLocalStorage();
    })
      
    afterEach(() => {
        cy.saveLocalStorage();
    });

    before(() => {
        cy.login()
    })
    
    it('Incluir itens no carrinho', () => {
        cy.get(ELEMENTS.productsList.addCartProdct3).click()
        cy.get(ELEMENTS.productsList.removeCartProduct3).should('have.text', 'Remove')
        cy.get(ELEMENTS.productsList.addCartProdct4).click()
        cy.get(ELEMENTS.productsList.removeCartProduct4).should('have.text', 'Remove')
        cy.get(ELEMENTS.generalPageElements.shoppingCart).click()
        cy.get(ELEMENTS.shoppingCart.cartItem1).should('have.text', 'Sauce Labs Bolt T-Shirt')
        cy.get(ELEMENTS.shoppingCart.cartItem2).should('have.text', 'Sauce Labs Fleece Jacket')
    })

    it('Concluir Compra', () => {
        cy.get(ELEMENTS.shoppingCart.checkout).click()
        cy.get(ELEMENTS.checkoutBuyerInformations.checkoutFirstName)
            .type(DADOS.sauceDemo.buyerInfos.buyerFirstName)
            .should('have.value', DADOS.sauceDemo.buyerInfos.buyerFirstName)
        cy.get(ELEMENTS.checkoutBuyerInformations.checkoutLastName)
            .type(DADOS.sauceDemo.buyerInfos.buyerLastName)
            .should('have.value', DADOS.sauceDemo.buyerInfos.buyerLastName)
        cy.get(ELEMENTS.checkoutBuyerInformations.checkoutPostalCode)
            .type(DADOS.sauceDemo.buyerInfos.buyerPostalCode)
            .should('have.value', DADOS.sauceDemo.buyerInfos.buyerPostalCode)
        cy.get(ELEMENTS.checkoutBuyerInformations.continueButtom).click()
        cy.get(ELEMENTS.checkoutOverview.checkoutFinish).click()
        cy.get(ELEMENTS.generalPageElements.pageName)
            .should('have.text', ELEMENTS.messages.checkoutComplete)
        cy.get(ELEMENTS.checkoutComplete.checkoutComplete)
            .should('have.text', ELEMENTS.messages.OrderComplete)
    })

})