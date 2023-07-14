/// <reference types='Cypress' />

import { BODYS } from "../../support/bodys";
import { URLS } from "../../support/urls";

export const NEWUSER = describe('Cadastro usuário no ServeRest', () => {
    

    it('1 - Validar usuário cadastrado com sucesso', () => {
        cy.request({
            method: 'POST',
            url: URLS.api.baseUrl + URLS.api.endpoint,
            
            body: BODYS.newUser

        }).then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.be.equal(201) // Valida que o status code do POST foi 201.
            expect(response.statusText).to.be.equal('Created') // Valida a mensagem de retorno do POST.
            Cypress.env('userID', response.body._id) // Salva o ID do usuário para ser usado futuramente.
            cy.log('userID: ' + Cypress.env('userID')) // Imprime no log o ID do usuário criado.
        }) 
    });
    const post = require ('./2-buscaUsuario.spec').SEARCHUSER
})