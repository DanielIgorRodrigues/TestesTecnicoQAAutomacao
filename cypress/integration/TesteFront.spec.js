/// <reference types="Cypress" />

const url = 'https://saucedemo.com';
const standartUser = 'standard_user';
const blockedUser = 'locked_out_user';
const password = 'secret_sauce';
const blockedUserMessege = 'Epic sadface: Sorry, this user has been locked out.';
const buyerFirstName = 'Fulano';
const buyerLastName = 'Fulano';
const buyerPostalCode = '89190-000';
const purchaseValue = '71.26';

describe('Login com usuário bloqueado', () => {
    it('Login com usuário bloqueado', () => {
        cy.visit(url)
        cy.get('[data-test="username"]')
            .type(blockedUser)
            .should('have.value', blockedUser)
        cy.get('[data-test="password"]').type(password)
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('have.text', blockedUserMessege)
    })
})

describe('Compra com mais de um produto', () => {

    beforeEach(() => {
        Cypress.Cookies.defaults({
            preserve: 'session-username'
        })
        cy.restoreLocalStorage();
    })
      
    afterEach(() => {
        cy.saveLocalStorage();
    });

    it('Login com sucesso', () => {
        cy.visit(url)
        cy.get('[data-test="username"]')
            .type(standartUser)
            .should('have.value', standartUser)
        cy.get('[data-test="password"]').type(password)
        cy.get('[data-test="login-button"]').click()
        cy.get('.title').should('have.text', 'Products')
    })

    it('Incluir itens no carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').should('have.text', 'Remove')
        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
        cy.get('[data-test="remove-sauce-labs-fleece-jacket"]').should('have.text', 'Remove')
        cy.get('.shopping_cart_link').click()
        cy.get('#item_1_title_link > .inventory_item_name').should('have.text', 'Sauce Labs Bolt T-Shirt')
        cy.get('#item_5_title_link > .inventory_item_name').should('have.text', 'Sauce Labs Fleece Jacket')
    })

    it('Concluir Compra', () => {
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
        cy.get('.summary_total_label').should('have.text', `Total: $${purchaseValue}`)
        cy.get('[data-test="finish"]').click()
        cy.get('.title').should('have.text', 'Checkout: Complete!')
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
    })

})

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

    it('Login com sucesso', () => {
        cy.clearLocalStorage()
        cy.visit(url)
        cy.get('[data-test="username"]')
            .type(standartUser)
            .should('have.value', standartUser)
        cy.get('[data-test="password"]').type(password)
        cy.get('[data-test="login-button"]').click()
        cy.get('.title').should('have.text', 'Products')
    })

    it('Incluir todos os itens no carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price')
            .invoke('text')
            .then(($value) => {
                let valorText = $value;
                valorText = valorText.replace("$", "")
                let valor = parseFloat(valorText)
                totalItemsPrices += valor;
            })
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get(':nth-child(2) > .inventory_item_description > .pricebar > .inventory_item_price')
            .invoke('text')
            .then(($value) => {
                let valorText = $value;
                valorText = valorText.replace("$", "")
                let valor = parseFloat(valorText)
                totalItemsPrices += valor;
            })
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get(':nth-child(3) > .inventory_item_description > .pricebar > .inventory_item_price')
            .invoke('text')
            .then(($value) => {
            let valorText = $value;
            valorText = valorText.replace("$", "")
            let valor = parseFloat(valorText)
            totalItemsPrices += valor;
        })
        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
        cy.get(':nth-child(4) > .inventory_item_description > .pricebar > .inventory_item_price')
            .invoke('text')
            .then(($value) => {
                let valorText = $value;
                valorText = valorText.replace("$", "")
                let valor = parseFloat(valorText)
                totalItemsPrices += valor;
            })
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get(':nth-child(5) > .inventory_item_description > .pricebar > .inventory_item_price')
            .invoke('text')
            .then(($value) => {
                let valorText = $value;
                valorText = valorText.replace("$", "")
                let valor = parseFloat(valorText)
                totalItemsPrices += valor;
            })
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
        cy.get(':nth-child(6) > .inventory_item_description > .pricebar > .inventory_item_price')
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