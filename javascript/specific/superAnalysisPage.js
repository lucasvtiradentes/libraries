// LAST EDIT: 15/06/2020

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports = {
      getMarket,
      getOrderStatus,
      getPhone,
      getCreatedAccountDate,
      getShippingAddress,
      getFirstOrderDate,

      getInShoppingOrders,
      getInAnalysisOrders,
      getInSeparationOrders,
      getDeliveredOrders,
      getCancelledOrders,

      getAllUserCards,
      getUserUniqueCards,
      getCurrentOrderTransactionCard,
      getDeliveryMethod,

      getAllAnalysisPageProperties
   }

// DEFINIR FUNÇÕES #####################################################################################################
   function getMarket(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('field-market')[0];
         if(el_tmp){
            let el_supermercado = el_tmp.getElementsByClassName('readonly')[0];
            return el_supermercado.innerText
         }
   }


   function getOrderStatus(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('field-market')[1];
         if(el_tmp){
            let el_statusPedido = el_tmp.getElementsByClassName('readonly')[0];
            return el_statusPedido.innerText
         }

   }

   function getPhone(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module');
         if(el_tmp){
            try {
               let el_classeInfo = el_tmp[1].getElementsByClassName('field-delivery_type')[3].getElementsByClassName('readonly')[0];
               return el_classeInfo.innerText;
            } catch(err){
            return;
            }
         }

   }

   function getCreatedAccountDate(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module');
         if(el_tmp){
            try {
               let el_classeInfo = el_tmp[1].getElementsByClassName('field-shipping_address')[0].getElementsByClassName('readonly')[0];
               return el_classeInfo.innerText;
               } catch(err){
               return;
            }
         }

   }


   function getShippingAddress(page){

      if (!page) {return}

      let STR_TodosEnderecos;
      let el_tmp = page.getElementsByClassName('module')[1];

         if(el_tmp){
            let el_linhaEnderecos = el_tmp.getElementsByClassName('field-shipping_address')[3];
            let el_enderecos = el_linhaEnderecos.getElementsByClassName('readonly')[0];
            let ARR_enderecos = el_enderecos.innerText.split('\n');

               for(let x=0; x<ARR_enderecos.length; x++){
                  let STR_linhaIteracao = ARR_enderecos[x];
                  STR_linhaIteracao = STR_linhaIteracao.trim();
                     if(STR_linhaIteracao && STR_linhaIteracao != "[Padrão]") {
                        let ARR_soEndereco = STR_linhaIteracao.split("|");
                        let STR_SoEndereco = ARR_soEndereco[0];
                           if (STR_TodosEnderecos){
                              STR_TodosEnderecos = STR_TodosEnderecos + "\n" + STR_SoEndereco;
                           } else {
                              STR_TodosEnderecos = STR_SoEndereco;
                           }
                     }
               }

               if (STR_TodosEnderecos){
                  return STR_TodosEnderecos;
               }

         }

   }


   function getFirstOrderDate(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[2];
      
         if(el_tmp){
            let el_pedidosAnteriores = el_tmp.getElementsByClassName('field-delivery_type')[0];
            let STR_primeiraCompra_linha = el_pedidosAnteriores.getElementsByClassName('readonly')[0];
            let ARR_primeiraCompra = STR_primeiraCompra_linha.innerText.split("|");
            let STR_primeiraCompra = ARR_primeiraCompra[0];
            STR_primeiraCompra = STR_primeiraCompra.trim();
            return STR_primeiraCompra;
         }
   }


// #####################################################################################################################

   function getInShoppingOrders(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[2];

         if(el_tmp){
            let el_pedidosAnteriores = el_tmp.getElementsByClassName('field-delivery_type');
               for(let x=0; x<el_pedidosAnteriores.length; x++){
                  let STR_iteracao
                  STR_iteracao = el_pedidosAnteriores[x].innerText;
                  STR_iteracao = STR_iteracao.trim();
                     if (STR_iteracao.search("Carrinho") > -1){
                        let STR_numEntregues = el_pedidosAnteriores[x].getElementsByClassName('readonly')[0];
                        return Number(STR_numEntregues.innerText)
                     }
               }
         }

      return 0;
   }


   function getInAnalysisOrders(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[2];

         if(el_tmp){
            let el_pedidosAnteriores = el_tmp.getElementsByClassName('field-delivery_type');
               for(let x=0; x<el_pedidosAnteriores.length; x++){
                  let STR_iteracao
                  STR_iteracao = el_pedidosAnteriores[x].innerText;
                  STR_iteracao = STR_iteracao.trim();
                     if (STR_iteracao.search("análise") > -1){
                        let STR_numEntregues = el_pedidosAnteriores[x].getElementsByClassName('readonly')[0];
                        return Number(STR_numEntregues.innerText)
                     }
               }
         }

      return 0;
   }

   function getInSeparationOrders(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[2];

         if(el_tmp){
            let el_pedidosAnteriores = el_tmp.getElementsByClassName('field-delivery_type');
               for(let x=0; x<el_pedidosAnteriores.length; x++){
                  let STR_iteracao
                  STR_iteracao = el_pedidosAnteriores[x].innerText;
                  STR_iteracao = STR_iteracao.trim();
                     if (STR_iteracao.search("Separação") > -1){
                        let STR_numEntregues = el_pedidosAnteriores[x].getElementsByClassName('readonly')[0];
                        return Number(STR_numEntregues.innerText)
                     }
               }
         }

      return 0;

   }

   function getDeliveredOrders(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[2];

         if(el_tmp){
            let el_pedidosAnteriores = el_tmp.getElementsByClassName('field-delivery_type');
               for(let x=0; x<el_pedidosAnteriores.length; x++){
                  let STR_iteracao
                  STR_iteracao = el_pedidosAnteriores[x].innerText;
                  STR_iteracao = STR_iteracao.trim();
                     if (STR_iteracao.search("Entregue") > -1){
                        let STR_numEntregues = el_pedidosAnteriores[x].getElementsByClassName('readonly')[0];
                        return Number(STR_numEntregues.innerText)
                     }
               }
         }

      return 0;
   }


   function getCancelledOrders(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module')[2];

         if(el_tmp){
            let el_pedidosAnteriores = el_tmp.getElementsByClassName('field-delivery_type');
               for(let x=0; x<el_pedidosAnteriores.length; x++){
                  let STR_iteracao
                  STR_iteracao = el_pedidosAnteriores[x].innerText;
                  STR_iteracao = STR_iteracao.trim();

                     if (STR_iteracao.search("Cancelado") > -1){
                        let STR_numEntregues = el_pedidosAnteriores[x].getElementsByClassName('readonly')[0];
                        return Number(STR_numEntregues.innerText)
                     }
               }
         }

      return 0;
   }

// #####################################################################################################################

   function getAllUserCards(page){

      if (!page) {return}

      let ARR_TodosCartoes = new Array();
      let el_tmp = page.getElementsByClassName('payments')[0];

         if(el_tmp){
            let el_Pagamentos = el_tmp.getElementsByClassName('payments__item');

               for(let x=0; x<el_Pagamentos.length; x++){

                  let tmp_TituloTransacao = el_Pagamentos[x].getElementsByTagName("H3")[0];
                  let STR_TituloTransacao = tmp_TituloTransacao.innerText;
                  STR_TituloTransacao = STR_TituloTransacao.toString();
                  // STR_TituloTransacao = STR_TituloTransacao
                  let ARR_tituloTransacao = STR_TituloTransacao.split("- ");

                  let tmp_destinoTransacao = ARR_tituloTransacao[0].replace(/ /g, '');
                  tmp_destinoTransacao = tmp_destinoTransacao.replace(/[^a-z]/gi, '');
                  let tmp_DataHoraTransacao = ARR_tituloTransacao[1];

                  let tmp_statusTransacao = el_Pagamentos[x].getElementsByClassName('field-delivery_type')[0].getElementsByClassName('readonly')[0];
                  let STR_statusTransacao = tmp_statusTransacao.innerText;
                  STR_statusTransacao = STR_statusTransacao.trim();

                  let tmp_NumeroCartao = el_Pagamentos[x].getElementsByClassName('field-delivery_type')[1].getElementsByClassName('readonly')[0];
                  let STR_NumeroCartao = tmp_NumeroCartao.innerText;
                  STR_NumeroCartao = STR_NumeroCartao.trim();
                  STR_NumeroCartao = STR_NumeroCartao.replace(/ /g, '');
                  let ARR_NumeroCartao = STR_NumeroCartao.split('-');
                     if (ARR_NumeroCartao[1] && ARR_NumeroCartao[0]){
                        STR_NumeroCartao = ARR_NumeroCartao[0] + " - " + ARR_NumeroCartao[1].substring(1, ARR_NumeroCartao[1].length)
                     }

                  let tmp_nomeCartao = el_Pagamentos[x].getElementsByClassName('field-delivery_type')[2].getElementsByClassName('readonly')[0];
                  let STR_nomeCartao = tmp_nomeCartao.innerText;
                  STR_nomeCartao = STR_nomeCartao.trim();
                  // STR_nomeCartao = STR_nomeCartao.replace(/ /g, '');

                  let tmp_idTransacao = el_Pagamentos[x].getElementsByClassName('field-delivery_type')[3].getElementsByClassName('readonly')[0];
                  let STR_idTransacao = tmp_idTransacao.innerText;
                  STR_idTransacao = STR_idTransacao.trim();
                  STR_idTransacao = STR_idTransacao.replace(/ /g, '');

                  let tmp_ValorTransacao = el_Pagamentos[x].getElementsByClassName('field-delivery_type')[4].getElementsByClassName('readonly')[0];
                  let STR_ValorTransacao = tmp_ValorTransacao.innerText;
                  STR_ValorTransacao = STR_ValorTransacao.trim();
                  STR_ValorTransacao = STR_ValorTransacao.replace(/ /g, '');  

                  ARR_TodosCartoes.push([tmp_destinoTransacao, tmp_DataHoraTransacao, undefined, STR_statusTransacao, STR_NumeroCartao, STR_nomeCartao, STR_idTransacao, STR_ValorTransacao])

               }

            return ARR_TodosCartoes;

         }
   }


   function getUserUniqueCards(ARR_TodosCartoes){

      if (!ARR_TodosCartoes){return}

      let TMP_cartoes;
      let ARR_cartoesNovos;
      let BOL_CartaoEncontrado;

         for (let x=0; x < ARR_TodosCartoes.length; x++){

            let TMP_cartaoNovo = ARR_TodosCartoes[x][4].toString();

            if (ARR_cartoesNovos){

               BOL_CartaoEncontrado = false;

                  for (let y=0; y<ARR_cartoesNovos.length; y++){
                     let TMP_cartaoIteracao = ARR_cartoesNovos[y][4];
                     TMP_cartaoIteracao = TMP_cartaoIteracao.toString();
                        if (TMP_cartaoIteracao == TMP_cartaoNovo){
                           BOL_CartaoEncontrado = true;
                        }
                  }

                  if (!BOL_CartaoEncontrado){
                     ARR_cartoesNovos.push(ARR_TodosCartoes[x]);
                  }
            } else {
               ARR_cartoesNovos  = new Array();
               ARR_cartoesNovos.push(ARR_TodosCartoes[x]);
            }

         }

      return ARR_cartoesNovos;
   }

   function getCurrentOrderTransactionCard(ARR_TodosCartoes, STR_ValorTotalPedido, STR_DataHoraPedido){
      
      if (!ARR_TodosCartoes){return}

         for (let x=0; x<ARR_TodosCartoes.length; x++){
            let TMP_valorPedidoIteracao = ARR_TodosCartoes[x][7];
            let TMP_statusAprovacaoIteracao = ARR_TodosCartoes[x][3];
            let TMP_dataHoraPedido = ARR_TodosCartoes[x][1];
               if (TMP_valorPedidoIteracao == STR_ValorTotalPedido && TMP_statusAprovacaoIteracao == "00 - Transacao autorizada") {
                  return ARR_TodosCartoes[x];
               } else if (TMP_dataHoraPedido == STR_DataHoraPedido && TMP_statusAprovacaoIteracao == "00 - Transacao autorizada") {
                  return ARR_TodosCartoes[x];
               }
         }
   }


   function getDeliveryMethod(page){

      if (!page) {return}

      let el_tmp = page.getElementsByClassName('module');
      let BOL_encontrouModuloEntrega;

         if(el_tmp){
            if (el_tmp[5]){
               let el_titulo = el_tmp[5].getElementsByTagName('h2')[0];
                  if (el_titulo){
                     if (el_titulo.innerText == "Endereço utilizado na compra"){
                        return "Entregar à domicílio";
                     } else {
                        return "Buscar na Loja";
                     }
                  }
            } else {
               return "Buscar na Loja";
            }
         }
   }

// #####################################################################################################################

   async function getAllAnalysisPageProperties(page){

      let ARR_TodosCartoes = getAllUserCards(page);
      let ARR_CartoesUnicos = getUserUniqueCards(ARR_TodosCartoes);
      let INT_CartoesJaUtilizados = ARR_CartoesUnicos ? ARR_CartoesUnicos.length : 0;

      let OBJ_AbaAnalisar = {

         // -------------------------------------------------------------------------------------------------
            ANA_STR_NomeSupermercado: getMarket(page),
            ANA_STR_StatusPedido: await getOrderStatus(page),
            // NUMERO DO PEDIDO
            // PDV

         // -------------------------------------------------------------------------------------------------
            // NOME
            // EMAIL
            // CPF
            ANA_STR_Telefone: getPhone(page),
            ANA_STR_DataCriacaoConta: getCreatedAccountDate(page),
            // DATA DE ATUALIZACAO DA CONTA
            // MÉTODOS DE PAGAMENTO
            ANA_STR_EnderecosSalvos: getShippingAddress(page) || "[Sem endereços salvos]",

         // -------------------------------------------------------------------------------------------------
            ANA_STR_DataPrimeiraCompra: getFirstOrderDate(page),
            ANA_INT_PedidosCarrinho: getInShoppingOrders(page),
            ANA_INT_PedidosEmAnalise: getInAnalysisOrders(page),
            ANA_INT_PedidosSeparacao: getInSeparationOrders(page),
            ANA_STR_PedidosEntregues: getDeliveredOrders(page),
            ANA_INT_PedidosCancelados: getCancelledOrders(page),

         // --------------------------------------------------------------------------------------------------
            ANA_ARR_TodosCartoes: ARR_TodosCartoes,
            ANA_ARR_CartoesUnicos: ARR_CartoesUnicos,
            // ANA_ARR_CartaoUtilizadoNoPedido: await getCurrentOrderTransactionCard(ARR_TodosCartoes, STR_ABAMOD_ValorFinalPedido),
            ANA_INT_QuantidadeCartoesUtilizados: INT_CartoesJaUtilizados,
            ANA_STR_TipoEntrega: getDeliveryMethod(page)

      }

      return OBJ_AbaAnalisar;

   }

// #####################################################################################################################
