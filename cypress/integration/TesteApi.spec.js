/// <reference types='Cypress' />

const url = 'https://serverest.dev/';
const endpoint = 'usuarios/'
const nome = 'Manolo Gomes';
const email = 'manolo.gomes@test.com.br';
const pass = '12345';
const adm = 'true';
let userId;
const nomeAlterado = 'Manolo Fred';
const emailAlterado = 'manolo.fred@test.com';
const passAlterado = '1234567';
const admAlterado = 'false';

describe('Usuário no ServeRest', () => {
    

    it('1 - Validar usuário cadastrado com sucesso', () => {
        cy.request({
            method: 'POST',
            url: url+endpoint,
            body: {
                nome: nome,
                email: email,
                password: pass,
                administrador: adm
            }
        }).as('response').then(res => {
            expect(res.status).to.be.equal(201) // Valida que o status code do POST foi 201
            expect(res.statusText).to.be.equal('Created') // Valida a mensagem de retorno do POST
            userId = res.body._id;
        })
    })

    it('2 - Validar verificações realizadas no cadastro do usuário', () => {
        cy.request({
            method: 'GET',
            url: url+endpoint+userId
        }).as('response').then(res => {
            expect(res.body.email).to.be.equal(email) // Valida que o email retornado corresponde ao preenchido no cadastro
            expect(res.body.nome).to.be.equal(nome) // Valida que o nome retornado corresponde ao preenchido no cadastro 
            expect(res.body.password).to.be.equal(pass) // Valida que a senha retornado corresponde à preenchida no cadastro
            expect(res.body.administrador).to.be.equal(adm) // Valida que o usuário é administrador, conforme indicado no cadastro
        })
    })

    it('3 - Validar Edição de um usuário', () => {
        cy.request({
            method: 'PUT',
            url: url+endpoint+userId,
            body: { nome: nomeAlterado,
                    email: emailAlterado,
                    password: passAlterado,
                    administrador: admAlterado}
        }).as('response').then(res => {
            expect(res.status).to.be.equal(200)        
        })

        cy.request({
            method: 'GET',
            url: url+endpoint+userId
        }).as('response').then(res => {
            expect(res.body.email).to.be.equal(emailAlterado) // Valida que o email retornado foi alterado conforme preenchido
            expect(res.body.nome).to.be.equal(nomeAlterado) // Valida que o nome retornado foi alterado conforme preenchido
            expect(res.body.password).to.be.equal(passAlterado) // Valida que a senha retornada foi alterada conforme preenchido
            expect(res.body.administrador).to.be.equal(admAlterado) // Valida que o usuário não é mais administrador
        })
    })

    it('4 - Validar listagem de usuários', () => {
        cy.request({
            method: 'GET',
            url: url+endpoint
        }).as('response').then(res => {
            let index;
            var usuariosCadastrado = res.body.usuarios;
            
            // Busca a posição do usuário cadastrado no array, para que seja possível realizar a busca das informações
            for (var i = 0; i < usuariosCadastrado.length; i++) {
                if (usuariosCadastrado[i].email === emailAlterado) {
                    index = i;
                }
            }
            expect(res.status).to.be.equal(200)
            expect(res.body.usuarios.length).to.be.above(1) // Valida que na lista de usuários constam mais que um usuário, sendo o usuário padrão da aplicação ('Fulano da Silva') e o usuário cadastrado acima;
            expect(usuariosCadastrado[index].email).to.be.equal(emailAlterado) // Valida que o email do usuário cadsatrado consta na lista
            expect(usuariosCadastrado[index].nome).to.be.equal(nomeAlterado) // Valida que o nome do usuário cadastrado consta na lista
            expect(usuariosCadastrado[index].password).to.be.equal(passAlterado) // Valida que a senha do usuário cadastrado consta na lista
            expect(usuariosCadastrado[index].administrador).to.be.equal(admAlterado) // Valida que a indicação de administrador do usuário cadastrado consta na lista
        })
    })

    it('5 - Validar Exclusão de um usuário', () => {
        cy.request({
            method: 'DELETE',
            url: url+endpoint+userId
        }).as('response').then(res => {
            expect(res.status).to.be.equal(200) // Valida que o status code do POST foi 200
            expect(res.body.message).to.be.equal('Registro excluído com sucesso') // Valida a mensagem de retorno do POST
        })

        cy.request({
            method: 'GET',
            url: url+endpoint
        }).as('response').then(res => {
            let index;
            var usuariosCadastrado = res.body.usuarios;
            
            for (var i = 0; i < usuariosCadastrado.length; i++) {
                if (usuariosCadastrado[i].email === emailAlterado) {
                    index = i;
                }
            }
            expect(index).to.be.undefined
        })
    })
})