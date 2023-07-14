import { 
    DADOS
} from "./dados";


export const BODYS = {
    newUser: {
        nome: DADOS.newUser.nome,
        email: DADOS.newUser.email,
        password: DADOS.newUser.pass,
        administrador: DADOS.newUser.adm
    },

    editUser: {
        nome: DADOS.changeUser.nomeAlterado,
        email: DADOS.changeUser.emailAlterado,
        password: DADOS.changeUser.passAlterado,
        administrador: DADOS.changeUser.admAlterado
    }
}