import { BODYS } from "../../support/bodys"
import { DADOS } from "../../support/dados";
import { URLS } from "../../support/urls"

const post = require ('./1-novoUsuario.spec').NEWUSER

export const EDITUSER = describe('Editar usuario cadastrado', () => {

    it('3 - Validar Edição de um usuário', () => {
        cy.request({
            method: 'PUT',
            url: URLS.api.baseUrl + URLS.api.endpoint + Cypress.env('userID'),
          
            body: BODYS.editUser

        }).then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.be.equal(200)
            expect(response.body.message).to.be.eq('Registro alterado com sucesso')        
        })
    
        cy.request({
            method: 'GET',
            url: URLS.api.baseUrl + URLS.api.endpoint + Cypress.env('userID')
        }).then(response => {
            expect(response.body.email).to.be.equal(DADOS.changeUser.emailAlterado) // Valida que o email retornado foi alterado conforme preenchido
            expect(response.body.nome).to.be.equal(DADOS.changeUser.nomeAlterado) // Valida que o nome retornado foi alterado conforme preenchido
            expect(response.body.password).to.be.equal(DADOS.changeUser.passAlterado) // Valida que a senha retornada foi alterada conforme preenchido
            expect(response.body.administrador).to.be.equal(DADOS.changeUser.admAlterado) // Valida que o usuário não é mais administrador
        })
    });
    const get = require ('./4-listaUsuarios.spec').LISTUSER
})


