/// <reference types="Cypress" />

import { DADOS } from "../../support/dados";
import { ELEMENTS } from "../../support/elements";


const buyerFirstName = 'Fulano';
const buyerLastName = 'Fulano';
const buyerPostalCode = '89190-000';
const purchaseValue = '71.26';


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
        cy.get(ELEMENTS.productsList.addCartProdct1).click()
        cy.get(ELEMENTS.productsList.priceProduct1)
            .invoke('text')
            .then(($value) => {
                let valorText = $value;
                valorText = valorText.replace("$", "")
                let valor = parseFloat(valorText)
                totalItemsPrices += valor;
            })
        cy.get(ELEMENTS.productsList.addCartProdct2).click()
        cy.get(ELEMENTS.productsList.priceProduct2)
            .invoke('text')
            .then(($value) => {
                let valorText = $value;
                valorText = valorText.replace("$", "")
                let valor = parseFloat(valorText)
                totalItemsPrices += valor;
            })
        cy.get(ELEMENTS.productsList.addCartProdct3).click()
        cy.get(ELEMENTS.productsList.priceProduct3)
            .invoke('text')
            .then(($value) => {
            let valorText = $value;
            valorText = valorText.replace("$", "")
            let valor = parseFloat(valorText)
            totalItemsPrices += valor;
        })
        cy.get(ELEMENTS.productsList.addCartProdct4).click()
        cy.get(ELEMENTS.productsList.priceProduct4)
            .invoke('text')
            .then(($value) => {
                let valorText = $value;
                valorText = valorText.replace("$", "")
                let valor = parseFloat(valorText)
                totalItemsPrices += valor;
            })
        cy.get(ELEMENTS.productsList.addCartProdct5).click()
        cy.get(ELEMENTS.productsList.priceProduct5)
            .invoke('text')
            .then(($value) => {
                let valorText = $value;
                valorText = valorText.replace("$", "")
                let valor = parseFloat(valorText)
                totalItemsPrices += valor;
            })
        cy.get(ELEMENTS.productsList.addCartProdct6).click()
        cy.get(ELEMENTS.productsList.priceProduct6)
            .invoke('text')
            .then(($value) => {
                let valorText = $value;
                valorText = valorText.replace("$", "")
                let valor = parseFloat(valorText)
                totalItemsPrices += valor;
            })
    })

    it('Fechar compra e validar valor', () => {
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]')
            .type(buyerFirstName)
            .should('have.value', buyerFirstName)
        cy.get('[data-test="lastName"]')
            .type(buyerLastName)
            .should('have.value', buyerLastName)
        cy.get('[data-test="postalCode"]')
            .type(buyerPostalCode)
            .should('have.value', buyerPostalCode)
        cy.get('[data-test="continue"]').click()
        cy.get('.title').should('have.text', 'Checkout: Overview')
        cy.get('.summary_subtotal_label').should('have.text', `Item total: $${totalItemsPrices}`)
        cy.get('.summary_tax_label')
            .invoke('text')
            .then(($value) => {
                let valorText = $value;
                valorText = valorText.replace("Tax: $", "")
                let valor = parseFloat(valorText)
                tax = valor;
            })
            
        cy.get('.summary_total_label').then((res) => {
            console.log(totalItemsPrices)
            console.log(tax)
            totalPrice = (totalItemsPrices + tax)
            console.log(totalPrice)
            cy.get('.summary_total_label').should('have.text', `Total: $${totalPrice}`)
        })
    })  
})