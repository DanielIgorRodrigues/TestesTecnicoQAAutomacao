import { DADOS } from "../../support/dados";
import { URLS } from "../../support/urls"

const post = require ('./1-novoUsuario.spec').NEWUSER

export const LISTUSER = describe('Listar usuarios cadastrado', () => {

    it('4 - Validar listagem de usuários', () => {
        cy.request({
            method: 'GET',
            url: URLS.api.baseUrl + URLS.api.endpoint
        }).then((response) => {
            let index;
            var usuariosCadastrado = response.body.usuarios;
            
            // Busca a posição do usuário cadastrado no array, para que seja possível realizar a busca das informações
            for (var i = 0; i < usuariosCadastrado.length; i++) {
                if (usuariosCadastrado[i].email === DADOS.changeUser.emailAlterado) {
                    index = i;
                }
            }
            expect(response.status).to.be.equal(200)
            expect(response.body.usuarios.length).to.be.above(1) // Valida que na lista de usuários constam mais que um usuário, sendo o usuário padrão da aplicação ('Fulano da Silva') e o usuário cadastrado acima;
            expect(usuariosCadastrado[index].email).to.be.equal(DADOS.changeUser.emailAlterado) // Valida que o email do usuário cadsatrado consta na lista
            expect(usuariosCadastrado[index].nome).to.be.equal(DADOS.changeUser.nomeAlterado) // Valida que o nome do usuário cadastrado consta na lista
            expect(usuariosCadastrado[index].password).to.be.equal(DADOS.changeUser.passAlterado) // Valida que a senha do usuário cadastrado consta na lista
            expect(usuariosCadastrado[index].administrador).to.be.equal(DADOS.changeUser.admAlterado) // Valida que a indicação de administrador do usuário cadastrado consta na lista
        })
    });
    const put = require ('./5-excluiUsuario.spec').DELETEUSER
})


