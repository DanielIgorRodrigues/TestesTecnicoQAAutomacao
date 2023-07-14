import { DADOS } from "../../support/dados"
import { URLS } from "../../support/urls"

const post = require ('./1-novoUsuario.spec').NEWUSER

export const DELETEUSER = describe('Excluir usuario cadastrado', () => {

    it('5 - Validar Exclusão de um usuário', () => {
        cy.request({
            method: 'DELETE',
            url: URLS.api.baseUrl + URLS.api.endpoint + Cypress.env('userID'),
        }).then(response => {
            expect(response.status).to.be.equal(200) // Valida que o status code do POST foi 200
            expect(response.body.message).to.be.equal('Registro excluído com sucesso') // Valida a mensagem de retorno do POST
        })
    
        cy.request({
            method: 'GET',
            url: URLS.api.baseUrl + URLS.api.endpoint,
        }).then(response => {
            let index;
            var usuariosCadastrado = response.body.usuarios;
            
            for (var i = 0; i < usuariosCadastrado.length; i++) {
                if (usuariosCadastrado[i].email === DADOS.changeUser.emailAlterado) {
                    index = i;
                }
            }
            expect(index).to.be.undefined
        })
    });
})


