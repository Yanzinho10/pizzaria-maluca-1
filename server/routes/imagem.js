const ct = require('../controllers/imagem');
const UsuarioAcessoToken = require('../common/protecaoAcesso');
const Acesso = new UsuarioAcessoToken();

module.exports = (server) => {


    // faz o upload do logotipo na pasta
    server.post('/image/logo/upload', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().uploadLogo(req);
        res.send(result);

    })



    // remove o logotipo da pasta
    server.post('/image/logo/remove', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().removeLogo(req);
        res.send(result);

    })




     // faz o upload da imagem do produto na pasta
     server.post('/image/produto/upload/:idproduto', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().uploadImagemProduto(req);
        res.send(result);
    })



    // remove a imagem do produto da pasta
    server.post('/image/produto/remove', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().removeImagemProduto(req);
        res.send(result);

    })


}