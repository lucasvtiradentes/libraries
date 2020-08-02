// LAST EDIT: 15/06/2020

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports =  {
      getOrdersFromAllStatus,
      getOrdersFromEachStatus,
      getOrdersSumInformation,
   }

// DEFINIR FUNÇÕES #####################################################################################################

   async function getOrdersFromAllStatus(STR_Link_Analisar, OPT_ElementoMostraProgresso){

      // MOD_web | MOD_table | MOD_array | MOD_superOrdersPage

      let el_mudaNumero;
      let STR_conteudoInicial;
      let PAG_analisar;
      let STR_Link_PaginaNova;
      let ARR_total = new Array();
      let ARR_tmp;

      console.log('\n' + STR_Link_Analisar);

         if (OPT_ElementoMostraProgresso){
            STR_conteudoInicial = OPT_ElementoMostraProgresso.innerText + ": ";
         }
         
      PAG_analisar =  await MOD_web.getSiteContent(STR_Link_Analisar);
      const INT_NumPaginas = getTotalPages(PAG_analisar);
      const INT_totalOrders = getTotalOrders(PAG_analisar)

      if (INT_totalOrders != 0) {

            if (OPT_ElementoMostraProgresso){
               OPT_ElementoMostraProgresso.innerText = STR_conteudoInicial + 1;
            }

         ARR_tmp = await getOrdersTable(PAG_analisar);
         ARR_total = MOD_array.concatenateArraysVertically(ARR_total, ARR_tmp);

            if (INT_NumPaginas > 0) {

               for(let x=1; x < INT_NumPaginas; x++){

                  console.log('\n' + x + "/" + INT_NumPaginas + " -> " + STR_Link_PaginaNova);

                     if (OPT_ElementoMostraProgresso){
                        let PagTotal = Number(INT_NumPaginas) + 1;
                        let PAGAtual = Number(x)+1;
                        OPT_ElementoMostraProgresso.innerText = STR_conteudoInicial + PAGAtual + "/" + PagTotal;
                     }

                  STR_Link_PaginaNova = STR_Link_Analisar + "&" + "p=" + x;
                  PAG_analisar =  await MOD_web.getSiteContent(STR_Link_PaginaNova);
                  ARR_tmp = await getOrdersTable(PAG_analisar);
                  ARR_total = MOD_array.concatenateArraysVertically(ARR_total, ARR_tmp);

               }

            }

         return ARR_total;
      }

   }

   async function getOrdersFromEachStatus(URL_final, OPT_ElementoMostraProgresso){

      const MOD_array = await import(chrome.runtime.getURL('resources/modules/array.js'));

      let ARR_dados;
      let ARR_resultados = new Array();

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = 'Pedidos no carrinho'}
      let ARR_Carrinho = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosEmCarrinho, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_Carrinho);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = 'Pedidos em análise'}
      let ARR_Analise = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosEmAnalise, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_Analise);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = 'Pedidos autorizados'}
      let ARR_Autorizado = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosAutorizado, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_Autorizado);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = "Pedidos aceitos"}
      let ARR_Aceito = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosAceito, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_Aceito);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = "Pedidos em separação"}
      let ARR_Separacao = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosEmSeparacao, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_Separacao);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = "Pedidos separados"}
      let ARR_Separado = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosSeparado, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_Separado);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = "Pedidos recebidos pelo entregador"}
      let ARR_RecebidoEntregador = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosRecebidoPeloEntregador, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_RecebidoEntregador);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = "Pedidos pronto para retirada"}
      let ARR_ProntoParaRetirada = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosProntoParaRetirada, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_ProntoParaRetirada);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = "Pedidos pronto para entrega"}
      let ARR_ProntoParaEntrega = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosProntoParaEntrega, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_ProntoParaEntrega);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = "Pedidos que sairam para entrega"}
      let ARR_SaiuParaEntrega = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosSaiuParaEntrega, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_SaiuParaEntrega);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = "Pedidos entregues"}
      let ARR_Entregue = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosEntregue, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_Entregue);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = "Pedidos não entregues"}
      let ARR_NaoEntregue = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosNaoEntregue, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_NaoEntregue);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = "Pedidos cancelados pelo cliente"}
      let ARR_CanceladosPeloCliente = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosCanceladoPeloCliente, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_CanceladosPeloCliente);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = "Pedidos cancelados"}
      let ARR_Cancelado = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosCancelado, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_Cancelado);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = "Pedidos aceitos pelo entregador"}
      let ARR_PedidosEntregaAceitaEntregador = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosEntregaAceitaEntregador, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_PedidosEntregaAceitaEntregador);

      if (OPT_ElementoMostraProgresso){OPT_ElementoMostraProgresso.innerHTML = "Pedidos com pagamento finalizado"}
      let ARR_PagamentoFinalizado = await getOrdersFromAllStatus(URL_final + "&" + URL_PedidosPagamentoFinalizado, OPT_ElementoMostraProgresso);
      ARR_dados = MOD_array.concatenateArraysVertically(ARR_dados, ARR_PagamentoFinalizado);

      return {
         todos: ARR_dados,
         carrinho: ARR_Carrinho,
         analise: ARR_Analise,
         autorizado: ARR_Autorizado,
         aceito: ARR_Aceito,
         separacao: ARR_Separacao,
         separado: ARR_Separado,
         recebidoEntregador: ARR_RecebidoEntregador,
         prontoParaRetirada: ARR_ProntoParaRetirada,
         prontoParaEntrega: ARR_ProntoParaEntrega,
         saiuParaEntrega: ARR_SaiuParaEntrega,
         entregue: ARR_Entregue,
         naoEntregue: ARR_NaoEntregue,
         canceladoCliente: ARR_CanceladosPeloCliente,
         cancelado: ARR_Cancelado,
         aceitoPeloEntregador: ARR_PedidosEntregaAceitaEntregador,
         pagamentoFinalizado: ARR_PagamentoFinalizado
      };

   }


   async function getOrdersSumInformation(OBJ_Pedidos){

      // DEP: MOD_array (sumColumn)
      
      if (!OBJ_Pedidos){return}

      let ARR_resultados;
      let ARR_Util;

      let ARR_todos = OBJ_Pedidos['todos'];
      let ARR_Carrinho = OBJ_Pedidos['carrinho'];
      let ARR_Analise = OBJ_Pedidos['analise'];
      let ARR_Autorizado = OBJ_Pedidos['autorizado'];
      let ARR_Aceito = OBJ_Pedidos['aceito'];
      let ARR_Separacao = OBJ_Pedidos['separacao'];
      let ARR_Separado = OBJ_Pedidos['separado'];
      let ARR_RecebidoEntregador = OBJ_Pedidos['recebidoEntregador'];
      let ARR_ProntoParaRetirada = OBJ_Pedidos['prontoParaRetirada'];
      let ARR_ProntoParaEntrega = OBJ_Pedidos['prontoParaEntrega'];
      let ARR_SaiuParaEntrega = OBJ_Pedidos['saiuParaEntrega'];
      let ARR_Entregue = OBJ_Pedidos['entregue'];
      let ARR_NaoEntregue = OBJ_Pedidos['naoEntregue'];
      let ARR_CanceladosPeloCliente = OBJ_Pedidos['canceladoCliente'];
      let ARR_Cancelado = OBJ_Pedidos['cancelado'];
      let ARR_PedidosEntregaAceitaEntregador = OBJ_Pedidos['aceitoPeloEntregador'];
      let ARR_PagamentoFinalizado = OBJ_Pedidos['pagamentoFinalizado'];

      const getOrdersSumInformation_AUX = async function (ARG_ARR_resultados, ARG_ARR_Adicionar, ARG_STR_Label){

            // DEP: MOD_array (sumColumn)
      
            let ARR_tmp = new Array();
      
               if (ARG_ARR_resultados){
                  ARR_tmp = ARG_ARR_resultados
               }
      
               if (ARG_ARR_Adicionar){
                  console.log(ARG_ARR_Adicionar)
                  let SomaSuper = Number(MOD_array.sumColumn(ARG_ARR_Adicionar, 8));
                  let SomaMercado = Number(MOD_array.sumColumn(ARG_ARR_Adicionar, 9));
                  let SomaMmercadoSuper = Number(MOD_array.sumColumn(ARG_ARR_Adicionar, 10));
                  ARR_tmp.push([ARG_STR_Label, ARG_ARR_Adicionar.length, SomaSuper, SomaMercado, SomaMmercadoSuper]) // MERCADO
               } else {
                  ARR_tmp.push([ARG_STR_Label, 0, 0, 0, 0])
               }
      
            return ARR_tmp;
      
         }
      
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_Carrinho, "Carrinho");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_Analise, "Análise");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_Autorizado, "Autorizado");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_Aceito, "Aceito");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_Separacao, "Separação");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_Separado, "Separado");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_RecebidoEntregador, "Recebido pelo Entregador");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_ProntoParaRetirada, "Pronto para retirada");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_ProntoParaEntrega, "Pronto para entrega");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_SaiuParaEntrega, "Saiu para entrega");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_Entregue, "Entregue");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_NaoEntregue, "Não entregue");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_CanceladosPeloCliente, "Cancelado pelo cliente");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_Cancelado, "Cancelado");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_PedidosEntregaAceitaEntregador, "Entrega aceita pelo entragador");
      ARR_resultados = await getOrdersSumInformation_AUX(ARR_resultados, ARR_PagamentoFinalizado, "Pagamento Finalizado");

      ARR_Util = await getOrdersSumInformation_AUX(ARR_Util, ARR_Autorizado, "Autorizado");
      ARR_Util = await getOrdersSumInformation_AUX(ARR_Util, ARR_Aceito, "Aceito");
      ARR_Util = await getOrdersSumInformation_AUX(ARR_Util, ARR_Separacao, "Separação");
      ARR_Util = await getOrdersSumInformation_AUX(ARR_Util, ARR_Separado, "Separado");
      ARR_Util = await getOrdersSumInformation_AUX(ARR_Util, ARR_RecebidoEntregador, "Recebido pelo Entregador");
      ARR_Util = await getOrdersSumInformation_AUX(ARR_Util, ARR_ProntoParaRetirada, "Pronto para retirada");
      ARR_Util = await getOrdersSumInformation_AUX(ARR_Util, ARR_ProntoParaEntrega, "Pronto para entrega");
      ARR_Util = await getOrdersSumInformation_AUX(ARR_Util, ARR_SaiuParaEntrega, "Saiu para entrega");
      ARR_Util = await getOrdersSumInformation_AUX(ARR_Util, ARR_Entregue, "Entregue");
      ARR_Util = await getOrdersSumInformation_AUX(ARR_Util, ARR_PagamentoFinalizado, "Pagamento Finalizado");

      return {
         array_resultados: ARR_resultados,
         array_util: ARR_Util
      };

   }
