const ct = require('../controllers/home');
const UsuarioAcessoToken = require('../common/protecaoAcesso');
const Acesso = new UsuarioAcessoToken();

module.exports = (server) => {
    

    server.get('/home/totais/formapagamento', async (req, res) => {
        const result = await ct.controllers().obterTotaisFormaPagamento(req);
        res.send(result);
    })

    
    server.get('/home/totais/tiposentrega', async (req, res) => {
        const result = await ct.controllers().obterTotaisTiposEntrega(req);
        res.send(result);
    })


    server.get('/home/totais/hoje', async (req, res) => {
        const result = await ct.controllers().obterTotaisPedidoHoje(req);
        res.send(result);
    })


    server.get('/home/totais/diassemana', async (req, res) => {
        const result = await ct.controllers().obterTotaisDiasSemana(req);
        res.send(result);
    })









}