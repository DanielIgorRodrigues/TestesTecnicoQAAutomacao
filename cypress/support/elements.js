export const ELEMENTS = {
    login: {
        username: '[data-test="username"]',
        password: '[data-test="password"]',
        loginButton: '[data-test="login-button"]',
        loginErrorMessage: '[data-test="error"]'
    },

    generalPageElements: {
        shoppingCart: '.shopping_cart_link',
        pageName: '.title',
    },

    messages: {
        blockedUser: 'Epic sadface: Sorry, this user has been locked out.',
        pageProducts: 'Products',
        checkoutComplete: 'Checkout: Complete!',
        OrderComplete: 'Thank you for your order!'
    },

    productsList: {
        addCartProdct1: '[data-test="add-to-cart-sauce-labs-backpack"]',
        addCartProdct2: '[data-test="add-to-cart-sauce-labs-bike-light"]',
        addCartProdct3: '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
        addCartProdct4: '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
        addCartProdct5: '[data-test="add-to-cart-sauce-labs-onesie"]',
        addCartProdct6: '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',

        removeCartProduct3: '[data-test="remove-sauce-labs-bolt-t-shirt"]',
        removeCartProduct4: '[data-test="remove-sauce-labs-fleece-jacket"]',

        priceProduct1: ':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price',
        priceProduct2: ':nth-child(2) > .inventory_item_description > .pricebar > .inventory_item_price',
        priceProduct3: ':nth-child(3) > .inventory_item_description > .pricebar > .inventory_item_price',
        priceProduct4: ':nth-child(4) > .inventory_item_description > .pricebar > .inventory_item_price',
        priceProduct5: ':nth-child(5) > .inventory_item_description > .pricebar > .inventory_item_price',
        priceProduct6: ':nth-child(6) > .inventory_item_description > .pricebar > .inventory_item_price',
    },

    shoppingCart: {
        cartItem1: '#item_1_title_link > .inventory_item_name',
        cartItem2: '#item_5_title_link > .inventory_item_name',
        checkout: '[data-test="checkout"]'
    },

    checkoutBuyerInformations: {
        checkoutFirstName: '[data-test="firstName"]',
        checkoutLastName: '[data-test="lastName"]',
        checkoutPostalCode: '[data-test="postalCode"]',
        continueButtom: '[data-test="continue"]'
    },

    checkoutOverview: {
        checkoutFinish: '[data-test="finish"]',
        subtotal: '.summary_subtotal_label',
        tax: '.summary_tax_label',
        TotalValue: '.summary_total_label'
    },

    checkoutComplete: {
        checkoutComplete: '.complete-header'
    }
}