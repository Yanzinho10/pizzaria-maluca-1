const AcessoDados = require('../db/acessodados');
const db = new AcessoDados();
const ReadCommandSql = require('../common/readCommandSql');
const readCommandSql = new ReadCommandSql();
const UsuarioAcessoToken = require('../common/protecaoAcesso');
const Acesso = new UsuarioAcessoToken();

const crypto = require('crypto');

const controllers = () => {

    const login = async (req) => {

        var password = req.body.senha;

        // validar se o usuario existe no banco de dados
        var ComandoSql = await readCommandSql.retornaStringSql('login', 'login');
        var usuarioBanco = await db.Query(ComandoSql, req.body);

        if (usuarioBanco != undefined && usuarioBanco.length > 0) {
            // existe o usuario no banco

            // validar se as senhas são iguais
            var hashSenha = crypto.createHmac('sha256', password).digest('hex');

            console.log('Senha do Usuario: ', hashSenha);
            console.log('Senha no Banco: ', usuarioBanco[0].senha);

            if (hashSenha.toLowerCase() != usuarioBanco[0].senha.toLowerCase()) {

                return {
                    status: 'error',
                    message: "Usuário ou senha incorretos."    //senha incorreta
                }

            }

        }
            var tokenAcesso = Acesso.gerarTokenAcesso(usuarioBanco[0]);

            return {
                status: 'success',
                TokenAcesso: tokenAcesso,
                Nome: usuarioBanco[0].nome,
                Email: usuarioBanco[0].email,
                Logo: usuarioBanco[0].logotipo
            }
        

    };

    return Object.create({
        login
    })

}

module.exports = Object.assign({ controllers })