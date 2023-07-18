import { BODYS } from "../../support/bodys"
import { URLS } from "../../support/urls"

const post = require ('./1-novoUsuario.spec').NEWUSER

export const SEARCHUSER = describe('Valida usuario cadastrado', () => {

    it('2 - Validar verificações realizadas no cadastro do usuário', () => {
        cy.request({
            method: 'GET',
            url: URLS.api.baseUrl + URLS.api.endpoint + Cypress.env('userID')
        }).then((response) => {
            expect(response.body.email).to.be.equal(BODYS.newUser.email) // Valida que o email retornado corresponde ao preenchido no cadastro
            expect(response.body.nome).to.be.equal(BODYS.newUser.nome) // Valida que o nome retornado corresponde ao preenchido no cadastro 
            expect(response.body.password).to.be.equal(BODYS.newUser.password) // Valida que a senha retornado corresponde à preenchida no cadastro
            expect(response.body.administrador).to.be.equal(BODYS.newUser.administrador) // Valida que o usuário é administrador, conforme indicado no cadastro
        })
    });
    const get = require('./3-editarUsuario.spec').EDITUSER
})