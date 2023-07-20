/// <reference types="Cypress" />

import { DADOS } from "../../support/dados";
import { ELEMENTS } from "../../support/elements";

describe('Validar valor de todos os produtos no carrinho', () => {
    let totalItemsPrices = 0; 
    let tax = 0;
    let totalPrice = 0;

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

    it('Incluir todos os itens no carrinho', () => {
        const productsToAdd = [
            ELEMENTS.productsList.addCartProdct1,
            ELEMENTS.productsList.addCartProdct2,
            ELEMENTS.productsList.addCartProdct3,
            ELEMENTS.productsList.addCartProdct4,
            ELEMENTS.productsList.addCartProdct5,
            ELEMENTS.productsList.addCartProdct6,
          ];
      
          cy.wrap(productsToAdd).each((product) => {
            cy.get(product).click();
            cy.get(ELEMENTS.productsList[`priceProduct${productsToAdd.indexOf(product) + 1}`])
              .invoke('text')
              .then((response) => {
                cy.trataValores(response).then((valor) => {
                totalItemsPrices += valor;
                });
              });
          });
        });

    it('Fechar compra e validar valor', () => {
        cy.get(ELEMENTS.generalPageElements.shoppingCart).click()
        cy.get(ELEMENTS.shoppingCart.checkout).click()
        cy.get(ELEMENTS.checkoutBuyerInformations.checkoutFirstName)
            .type(DADOS.sauceDemo.buyerInfos.buyerFirstName)
        cy.get(ELEMENTS.checkoutBuyerInformations.checkoutLastName)
            .type(DADOS.sauceDemo.buyerInfos.buyerLastName)
        cy.get(ELEMENTS.checkoutBuyerInformations.checkoutPostalCode)
            .type(DADOS.sauceDemo.buyerInfos.buyerPostalCode)
        cy.get(ELEMENTS.checkoutBuyerInformations.continueButtom).click()
        cy.get(ELEMENTS.checkoutOverview.subtotal).should('have.text', `Item total: $${totalItemsPrices}`)
        cy.get(ELEMENTS.checkoutOverview.tax)
            .invoke('text')
            .then((response) => {
                cy.trataValoresTax(response).then((valor) => {
                tax = valor;
                });
              });
        cy.get(ELEMENTS.checkoutOverview.TotalValue).then(() => {
            totalPrice = (totalItemsPrices + tax)
            cy.get('.summary_total_label').should('have.text', `Total: $${totalPrice}`)
        })
    })  
})