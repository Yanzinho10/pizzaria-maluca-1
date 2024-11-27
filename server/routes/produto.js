const ct = require('../controllers/produto');
const UsuarioAcessoToken = require('../common/protecaoAcesso');
const Acesso = new UsuarioAcessoToken();

module.exports = (server) => {

    // obtem a lista de produtos para exibir no cardapio
    server.get('/produto', async (req, res) => {
        const result = await ct.controllers().listaCardapio(req);
        res.send(result);
    })





    // obtem o produto por id
    server.get('/produto/:id', async (req, res) => {
        const result = await ct.controllers().obterPorId(req);
        res.send(result);
    })




    
    // obtem a lista de produtos pela categoria ID
    server.get('/produto/categoria/:id', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().obterPorCategoriaId(req);
        res.send(result);
    })



     // salva as informações do produto na "pagina Cardapio"
     server.post('/produto', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarDados(req);
        res.send(result);

    })


     // salva a nova ordem dos produtos
     server.post('/produto/ordenar', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().ordenarProdutos(req);
        res.send(result);

    })


     // remover o produtos
     server.post('/produto/remover', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().removerProduto(req);
        res.send(result);

    })








    // duplicar os produtos
    server.post('/produto/duplicar', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().duplicarProduto(req);
        res.send(result);

    })







}