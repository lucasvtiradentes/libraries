// LAST EDIT: 15/06/2020

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports = {
      getApprovedTransactionsLinks,
      getPaymentId,
   }

// DEFINIR FUNÇÕES #####################################################################################################

   function getPaymentId(page){
      let el_idPagamento = page.getElementsByClassName('field-payment_id');
         if (el_idPagamento[0]){
            return el_idPagamento[0].getElementsByClassName('readonly')[0].innerText;
         }
   }

   async function getApprovedTransactionsLinks(ARG_STR_NumeroPedido){ // 2020051852713

      // DEP: MOD_web, MOD_table, MOD_array

      let ARR_tabela = new Array();
      let ARR_Transacoes = new Array();
      let el_taxaSuper;
      let el_taxaMercado;
      let url_pesquisaUsuario = 'https://admin.appsuper.com.br/payments/payment/?q=' + ARG_STR_NumeroPedido; // 2020051852713
      let PAG_pagamentos = await MOD_web.getSiteContent(url_pesquisaUsuario)
      let el_tabela = PAG_pagamentos.getElementById('result_list');

      if (!el_tabela){return}

      ARR_tabela = MOD_table.table2Array(el_tabela);
      ARR_tabela = MOD_array.deleteLines(ARR_tabela, [0]);

         for (let x=0; x < ARR_tabela.length; x++){
            let STR_StatusTransacao = ARR_tabela[x][5].toString();
               if (STR_StatusTransacao === "Pagamento autorizado"){
                  ARR_Transacoes.push(ARR_tabela[x]);
               }
         }

         if (Number(ARR_Transacoes[0][3].replace(",", ".")) < Number(ARR_Transacoes[1][3].replace(",", "."))){
            el_taxaSuper = PAG_pagamentos.getElementsByClassName('field-tid')[0].getElementsByTagName('a')[0].getAttribute('href');
            el_taxaMercado = PAG_pagamentos.getElementsByClassName('field-tid')[1].getElementsByTagName('a')[0].getAttribute('href');
         } else {
            el_taxaSuper = PAG_pagamentos.getElementsByClassName('field-tid')[1].getElementsByTagName('a')[0].getAttribute('href');
            el_taxaMercado = PAG_pagamentos.getElementsByClassName('field-tid')[0].getElementsByTagName('a')[0].getAttribute('href');
         }

      return {
         transactionSuper: 'https://admin.appsuper.com.br' + el_taxaSuper,
         transactionMarket: 'https://admin.appsuper.com.br' + el_taxaMercado
      }
   }