const ct = require('../controllers/empresa');
const UsuarioAcessoToken = require('../common/protecaoAcesso');
const Acesso = new UsuarioAcessoToken();

module.exports = (server) => {

    // obtem as informsções da empresa para exibir na pagina do cardapio
    server.get('/empresa', async (req, res) => {
        const result = await ct.controllers().obterDados(req);
        res.send(result);

    })


    
    // obtem todas as informsções da empresa para exibir na pagina "sobre"
    server.get('/empresa/sobre', async (req, res) => {
        const result = await ct.controllers().obterDadosCompletos(req);
        res.send(result);

    })




    // valida se a empresta esta aberta ou não
    server.get('/empresa/open', async (req, res) => {
        const result = await ct.controllers().validarEmpresaAberta(req);
        res.send(result);

    })


     // salva todas as informsções da empresa na pagina "sobre"
     server.post('/empresa/sobre', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarDadosSobre(req);
        res.send(result);

    })



    // salva todas as informsções da empresa na pagina "Endereço"
    server.post('/empresa/endereco', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarDadosEndereco(req);
        res.send(result);

    })



}