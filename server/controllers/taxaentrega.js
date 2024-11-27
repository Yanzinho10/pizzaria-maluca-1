const AcessoDados = require('../db/acessodados');
const db = new AcessoDados();
const ReadCommandSql = require('../common/readCommandSql');
const readCommandSql = new ReadCommandSql();
const UsuarioAcessoToken = require('../common/protecaoAcesso');
const Acesso = new UsuarioAcessoToken();


const controllers = () => {

    const obterTaxaEntregaTipo = async (req) => {

        try {

            var ComandoSql = await readCommandSql.retornaStringSql('obterTaxaEntregaTipo', 'taxaentrega');
            var result = await db.Query(ComandoSql);

            return {
                status: 'success',
                data: result
            }

            
        } catch (error) {
            console.log(error);
            return {
                status: 'error',
                message: 'Falha ao obter os tipos de taxas de entrega.'
            }
            
        }
        

    }




    const ativarTaxaEntregaTipo = async (req) => {

        try {

            var ComandoSqlTaxaUnica = await readCommandSql.retornaStringSql('ativarTaxaEntregaTipo', 'taxaentrega');
            await db.Query(ComandoSqlTaxaUnica, { idtaxaentregatipo: 1, ativo: req.body.taxaunica });


            var ComandoSqlTaxaDistancia = await readCommandSql.retornaStringSql('ativarTaxaEntregaTipo', 'taxaentrega');
            await db.Query(ComandoSqlTaxaDistancia, { idtaxaentregatipo: 2, ativo: req.body.taxadistancia });


            var ComandoSqlSemTaxa = await readCommandSql.retornaStringSql('ativarTaxaEntregaTipo', 'taxaentrega');
            await db.Query(ComandoSqlSemTaxa , { idtaxaentregatipo: 3, ativo: req.body.semtaxa });


            return {
                status: 'success',
                message: 'Taxa Selecionada com Sucesso.'
            }

            
        } catch (error) {
            console.log(error);
            return {
                status: 'error',
                message: 'Falha ao selecionar a Taxa.'
            }
            
        }
        

    }



    const obterTaxaUnica = async (req) => {

        try {

            var ComandoSql = await readCommandSql.retornaStringSql('obterTaxaUnica', 'taxaentrega');
            var result = await db.Query(ComandoSql);

            return {
                status: 'success',
                data: result
            }

            
        } catch (error) {
            console.log(error);
            return {
                status: 'error',
                message: 'Falha ao obter Taxa.'
            }
            
        }
        

    }




    const salvarTaxaUnica = async (req) => {

        try {

            // primeiro valida se ja existe uma taxa única no banco
            const idtaxaentrega = req.body.idtaxaentrega;

            // ja existe um registro, então atualiza a linha no banco
            if (idtaxaentrega != null && idtaxaentrega > 0) {

                // valida se realmente existe essa taxa no banco
                var ComandoSqlExiste = await readCommandSql.retornaStringSql('obterTaxaUnicaPorId', 'taxaentrega');
                var taxaExistente = await db.Query(ComandoSqlExiste, {idtaxaentrega: idtaxaentrega });

                if (taxaExistente.length > 0) {

                    // valida se teve alguma alterações nos campos
                    if (taxaExistente[0].valor != req.body.valor || 
                        taxaExistente[0].tempominimo != req.body.tempominimo ||
                        taxaExistente[0].tempomaximo != req.body.tempomaximo) {

                        // desativa a taxa atual no banco
                        var ComandoSqlRemove = await readCommandSql.retornaStringSql('desativarTaxaUnicaPorId', 'taxaentrega');
                        await db.Query(ComandoSqlRemove, {idtaxaentrega: idtaxaentrega });
        


                    }
                    else {

                        // não faz nada, so devolve a mensagem de sucesso
                        return {
                            status: 'success',
                            message: 'Taxa cadastrada com sucesso'
                        }
                    }

                }
                
            }


            // adiciona um registro no banco
            var ComandoSql = await readCommandSql.retornaStringSql('salvarTaxaUnica', 'taxaentrega');
            await db.Query(ComandoSql, {
                 idtaxaentregatipo: 1, 
                 valor: req.body.valor,
                 tempominimo: req.body.tempominimo,
                 tempomaximo: req.body.tempomaximo 
             });
           
     

            return {
                status: 'success',
                message: 'Taxa cadastrada com sucesso'
            }

            
        } catch (error) {
            console.log(error);
            return {
                status: 'error',
                message: 'Falha ao obter Taxa.'
            }
            
        }
        

    }



    const obterTaxaDistancia = async (req) => {

        try {

            var ComandoSql = await readCommandSql.retornaStringSql('obterTaxaDistancia', 'taxaentrega');
            var result = await db.Query(ComandoSql);

            return {
                status: 'success',
                data: result
            }

            
        } catch (error) {
            console.log(error);
            return {
                status: 'error',
                message: 'Falha ao obter Taxa.'
            }
            
        }
        

    }




    const salvarTaxaDistancia = async (req) => {

        try {

            var ComandoSql = await readCommandSql.retornaStringSql('adicionarTaxaDistancia', 'taxaentrega');
            await db.Query(ComandoSql, req.body);


            return {
                status: 'success',
                message: 'Taxa adicionada com sucesso'
            }

 

            
        } catch (error) {
            console.log(error);
            return {
                status: 'error',
                message: 'Falha ao adicionar Taxa.'
            }
            
        }
        

    }




    const removerTaxaDistancia = async (req) => {

        try {

            var ComandoSql = await readCommandSql.retornaStringSql('removerTaxaDistancia', 'taxaentrega');
            await db.Query(ComandoSql, req.body);


            return {
                status: 'success',
                message: 'Taxa removida com sucesso.'
            }

 

            
        } catch (error) {
            console.log(error);
            return {
                status: 'error',
                message: 'Falha ao remover Taxa.'
            }
            
        }
        

    }





    const ativarTaxaDistancia = async (req) => {

        try {

            var ComandoSql = await readCommandSql.retornaStringSql('ativarTaxaDistancia', 'taxaentrega');
            await db.Query(ComandoSql, req.body);


            return {
                status: 'success',
                message: 'Taxa Alterada.'
            }

 

            
        } catch (error) {
            console.log(error);
            return {
                status: 'error',
                message: 'Falha ao remover Taxa.'
            }
            
        }
        

    }






    return Object.create({
        obterTaxaEntregaTipo
        , ativarTaxaEntregaTipo
        , obterTaxaUnica
        , salvarTaxaUnica
        , obterTaxaDistancia
        , salvarTaxaDistancia
        , removerTaxaDistancia
        , ativarTaxaDistancia
       
       

    })

}

module.exports = Object.assign({ controllers })





