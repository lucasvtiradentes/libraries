// IMPORTAR MÓDULOS ####################################################################################################
   const GLOBAL_VAR = require('../configs.js');
   const MOD_technique = require('./technique.js');
   const MOD_pup = require('./pup.js');

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports = {
      esperarTerminarLoadingDoWhatsapp,
      clickarNosBotoesParaMandarMensagem,
      usuarioEstaNaTelaDeCarregando,
      usuarioEstaNaTelaDoQrCode,
      usuarioEstaNaTelaTentandoConectarAoCelular,
      usuarioEstaNaTelaDeLogadoNoWhatsapp,
      usuarioFicouOffLineDepoisDeTerEntrado,
      usuarioEstaNaTelaDeNumeroInvalido,
      mandarMensagemWppNumeroNaoSalvo,
      mandarMensagemWppContatoSalvo,
      selecionarChatParaConversar,
      obterUsuarioDaConversaAtual,
      obterUltimaMensagemQueMandaramNoChatSelecionado,
      digitarMensagemnoChatSelecionado,
      verificarStatusWhatsapp,
      obterTodasMinhasMensagens,
      obterUltimaMensagemQueEuMandeiNoChatSelecionado,
      obterInformacoesMensagemEspecifica
   }

// DEFINIR FUNÇÕES #####################################################################################################
   async function esperarTerminarLoadingDoWhatsapp(ARG_OBG_Pagina){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'esperarTerminarLoadingDoWhatsapp');
      }
      
      if(!ARG_OBG_Pagina){return}

      let TMP_BOL_PaginaEstaCarregando = true;
      let TMP_INT_VezesVerificada = 0;
         
         while (TMP_BOL_PaginaEstaCarregando === true) {
            TMP_INT_VezesVerificada = TMP_INT_VezesVerificada + 1
            TMP_BOL_PaginaEstaCarregando = await usuarioEstaNaTelaDeCarregando(ARG_OBG_Pagina);
            // console.log(TMP_INT_VezesVerificada + " -> " + TMP_BOL_PaginaEstaCarregando);
         }

   }

   async function clickarNosBotoesParaMandarMensagem(OBJ_PaginaZap){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'clickarNosBotoesParaMandarMensagem');
      }

      // BOTÃO 01 ----------------------------------------------------------------
      await OBJ_PaginaZap.waitForSelector('#action-button', {timeout: 0}); 
      await OBJ_PaginaZap.evaluate(`
         (() => {
            let el_Botao01 = document.getElementById('action-button');
            if(el_Botao01){el_Botao01.click()}
         })();
      `);

      // BOTÃO 02 ----------------------------------------------------------------
      await OBJ_PaginaZap.waitForSelector('._8ibw ._36or', {timeout: 0});
      await OBJ_PaginaZap.evaluate(`
         (() => {
            let el_Botao02 = document.getElementsByClassName("_8ibw")
            if (el_Botao02[0]){
            el_Botao02 = el_Botao02[0].getElementsByClassName("_36or");
            el_Botao02[0].click();
            }
         })();
      `);

   }

   async function usuarioEstaNaTelaDeCarregando(ARG_OBJ_Page){
      
      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'usuarioEstaNaTelaDeCarregando');
      }
      
      if (!ARG_OBJ_Page){return}

      let BOL_verificarPropriedade = await ARG_OBJ_Page.evaluate(`
         (() => {
            let el_IdLoading = document.getElementById("startup")
            if (el_IdLoading){
            console.log("Carregando Whatsapp")
            return true;
            } else {
            return false;
            }
         })()
      `);

      return BOL_verificarPropriedade;

   }

   async function usuarioEstaNaTelaDoQrCode(ARG_OBJ_Page){
      
      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'usuarioEstaNaTelaDoQrCode');
      }
      
      let BOL_verificarPropriedade = await ARG_OBJ_Page.evaluate(`
         (() => {
            let el_classError = document.getElementsByClassName("_23IQH")
      
            if (el_classError[0]){
            console.log('Usuário precisa parear celular via QR CODE');
            return true;
            } else {
            return false;
            }
         })();
      `);

      // console.log(BOL_verificarPropriedade);
      return BOL_verificarPropriedade;

   }

   async function usuarioEstaNaTelaTentandoConectarAoCelular(ARG_OBJ_Page){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'usuarioEstaNaTelaTentandoConectarAoCelular');
      }
      
      let BOL_verificarPropriedade = await ARG_OBJ_Page.evaluate(`
         (() => {
            let el_classError = document.getElementsByClassName("_2Qffr")
            if (el_classError[0]){
            let TMP_STR_ConteudoTexto = el_classError[0].innerText;
            let TMP_INT_IndexProcura = TMP_STR_ConteudoTexto.search("conectar");
            // console.log(el_classError[0])
            if (TMP_INT_IndexProcura > -1){
               console.log("Celular desconectado")
               return true;
            } else {
               return false;
            }
            } else {
            return false;
            }
         
         })();
      `);

      // console.log(BOL_verificarPropriedade);
      return BOL_verificarPropriedade;

   }

   async function usuarioEstaNaTelaDeLogadoNoWhatsapp(ARG_OBJ_Page){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'usuarioEstaNaTelaDeLogadoNoWhatsapp');
      }
      
      let BOL_verificarPropriedade = await ARG_OBJ_Page.evaluate(`
         (() => {
      
            let el_ClassAvatar = document.getElementsByClassName("_2goTk") //  _1Jdop _3Whw5
      
            if (el_ClassAvatar[0]){
            console.log('Usuário entrou na tela de mensagens');
            return true;
            } else {
            console.log('NAO ENCONTROU: _2goTk');
            return false;
            }
         
         })();
      `);

      // await MOD_technique.sleep(300000);
      return BOL_verificarPropriedade;

   }

   async function usuarioFicouOffLineDepoisDeTerEntrado(ARG_OBJ_Page){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'usuarioFicouOffLineDepoisDeTerEntrado');
      }
      
      let BOL_verificarPropriedade = await ARG_OBJ_Page.evaluate(` 
         (() => {
      
            let el_classError = document.getElementsByClassName("_2fJ2T")
      
            if (el_classError[0]){
            if (el_classError[0].getElementsByTagName("SPAN")[0]){
               let STR_IconText = el_classError[0].getElementsByTagName("SPAN")[0].getAttribute("data-icon");
         
               if (STR_IconText === 'alert-phone'){
                  console.log('Celular desligado da internet');
                  return true;
               } else {
                  console.log('Celular conectado');
                  return false;
               }
            } else {
               return false;
            }
            } else {
            return false;
            }
         
         })();
      `);
      
      // console.log(BOL_verificarPropriedade);
      return BOL_verificarPropriedade;

   }

   async function usuarioEstaNaTelaDeNumeroInvalido(ARG_OBJ_Page){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'usuarioEstaNaTelaDeNumeroInvalido');
      }
      
      let BOL_verificarPropriedade = await ARG_OBJ_Page.evaluate(`
         (() => {
      
            let el_NumeroInvalido = document.getElementsByClassName("_3lLzD")

            if (el_NumeroInvalido[0]){
            let TMP_STR_TextoElemento = el_NumeroInvalido[0].innerText;
            let TMP_INT_IndexPesquisa = TMP_STR_TextoElemento.search('inválido');

            // console.log(el_NumeroInvalido[0])
            // console.log('|' + el_NumeroInvalido[0].innerText + '|')
            // console.log(TMP_INT_IndexPesquisa);

            if (TMP_INT_IndexPesquisa > -1){
               return true;
            } else {
               return false;
            }
            } else {
            // console.log('nao deu erro');
            return false;
            }

         })();
      `);

      // console.log(BOL_verificarPropriedade);
      return BOL_verificarPropriedade;
      
   }

   async function mandarMensagemWppNumeroNaoSalvo(OBJ_PaginasNavegador, ARG_STR_Numero, ARG_STR_Mensagem){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'mandarMensagemWppNumeroNaoSalvo');
      }
      
      if (!ARG_STR_Numero || !ARG_STR_Mensagem || !OBJ_PaginasNavegador){return}

      let STR_LinkZAP = `https://api.whatsapp.com/send?phone=${encodeURIComponent(ARG_STR_Numero)}&text=${encodeURIComponent(ARG_STR_Mensagem)}`;
      let OBJ_PaginaZAP = await MOD_pup.abrirLinkEmAbaEspecifica(OBJ_PaginasNavegador['OBJ_AbaWhatsapp'], STR_LinkZAP);

      await clickarNosBotoesParaMandarMensagem(OBJ_PaginaZAP)
      try {
         let Pag_promisse = await OBJ_PaginaZAP.waitForNavigation(); 
      } catch (error) {
         //    
      }

      let OBJ_InfoPedido = await verificarStatusWhatsapp(OBJ_PaginaZAP);

      if (OBJ_InfoPedido['BOL_TelaTentandoConectarCelular'] === true || OBJ_InfoPedido['BOL_TelaNumeroInvalido'] === true){
         await MOD_pup.abrirLinkEmAbaEspecifica(OBJ_PaginasNavegador['OBJ_AbaWhatsapp'], 'about:blank');
         return false;
      } else {

         let STR_ConteudoInputBox;
         let STR_StatusUltimaMensagemEnviada;
         let INT_LimiteVezesTenta = 0;

            do {
               
               INT_LimiteVezesTenta = INT_LimiteVezesTenta + 1;

               STR_ConteudoInputBox = await OBJ_PaginaZAP.evaluate(`
                  (() => {
                     console.log("TENTATIVA: ");
                     let el_caixaTexto = document.querySelector('#main > footer div.selectable-text[contenteditable]');
                     if (el_caixaTexto){
                        // console.log(el_caixaTexto.innerText)
                        return el_caixaTexto.innerText;
                     }
                  })();
               `);

               if (!STR_ConteudoInputBox){

                  STR_StatusUltimaMensagemEnviada = await OBJ_PaginaZAP.evaluate(`
                     (() => {
                        let el_TodasMinhasMensagens = document.querySelectorAll('#main div.message-out');
                        let el_UltimaMensagem = el_TodasMinhasMensagens[el_TodasMinhasMensagens.length - 1];

                        if (el_UltimaMensagem){
                        let el_StatusMensagem = el_UltimaMensagem.getElementsByClassName('jdhpF');
                        if (el_StatusMensagem[0]){
                           el_StatusMensagem = el_StatusMensagem[0].getElementsByTagName('span');
                           
                           if (el_StatusMensagem[0]){
                              el_StatusMensagem = el_StatusMensagem[0].getAttribute('data-icon');
                              STR_StatusMensagem = el_StatusMensagem;
                              console.log(STR_StatusMensagem)
                              return STR_StatusMensagem;
                           }
                        }  
                        }
                     })();
                  `);
                  
               } else {

                  await OBJ_PaginaZAP.evaluate(`
                     (() => {

                        console.log('tentou apertar: ');
                        let el_buttonSend = document.getElementsByClassName('_35EW6');
                        console.log(el_buttonSend.length);

                        if (el_buttonSend[0]){
                        el_buttonSend[0].click();
                        }

                     })();
                  `)

                  await OBJ_PaginaZAP.keyboard.press('Enter');
               }

               if (INT_LimiteVezesTenta === 30){
                  break;   
               } else {
                  await MOD_technique.sleep(2000);
               }

            } while (STR_StatusUltimaMensagemEnviada === "msg-time" || STR_ConteudoInputBox !== "")
            
         return true;  
      }

   }

   async function mandarMensagemWppContatoSalvo(OBJ_PaginasNavegador, ARG_STR_ContatoEnviar, ARG_STR_Mensagem){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'mandarMensagemWppContatoSalvo');
      }
      
      let OBJ_PaginaWhatsapp = OBJ_PaginasNavegador['OBJ_AbaWhatsapp'];
      let BOL_SelecionouChat = await selecionarChatParaConversar(OBJ_PaginaWhatsapp, ARG_STR_ContatoEnviar)

         if (BOL_SelecionouChat){
            await MOD_technique.sleep(1000);
            await digitarMensagemnoChatSelecionado(OBJ_PaginaWhatsapp, ARG_STR_Mensagem)
            await OBJ_PaginaWhatsapp.click('#main > footer button._35EW6')
            return true
         } else {
            return false
         }

   }

   async function selecionarChatParaConversar(ARG_OBJ_Page, ARG_STR_ChatAIniciar){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'selecionarChatParaConversar');
      }
      
      let el_chatUser = `[title="${ARG_STR_ChatAIniciar}"] .matched-text`
      await ARG_OBJ_Page.click('#side [contenteditable]')
      await MOD_technique.sleep(1000);

      await ARG_OBJ_Page.keyboard.down('Control');
      await ARG_OBJ_Page.keyboard.press('A');
      await ARG_OBJ_Page.keyboard.up('Control');
      await ARG_OBJ_Page.keyboard.press('Backspace');
      await MOD_technique.sleep(1000);

      await ARG_OBJ_Page.keyboard.type(ARG_STR_ChatAIniciar);
      await MOD_technique.sleep(1000);

      await ARG_OBJ_Page.waitFor(el_chatUser);
      await ARG_OBJ_Page.click(el_chatUser);
      await MOD_technique.sleep(1000);

      await ARG_OBJ_Page.click('#main > footer div.selectable-text[contenteditable]');
      await MOD_technique.sleep(1000);
      let STR_UsuarioSelecionado = await obterUsuarioDaConversaAtual(ARG_OBJ_Page);

         if (ARG_STR_ChatAIniciar === STR_UsuarioSelecionado){
            return true;
         } else {
            return false;
         }

   }
      
   async function obterUsuarioDaConversaAtual(ARG_OBJ_Pagina) {

      const STR_UsuarioAtual = await ARG_OBJ_Pagina.evaluate(`
         (() => {
            let el = document.querySelector('#main > header span[title]');
            return el ? el.innerText : '';
         })();
      `)

      return STR_UsuarioAtual

   }

   async function obterUltimaMensagemQueMandaramNoChatSelecionado(ARG_OBJ_Pagina){

      const STR_UltimaMensagem = await ARG_OBJ_Pagina.evaluate(`
         (() => {
            let selector = '#main div.message-in';
            let nodes = document.querySelectorAll(selector);
            let el = nodes[nodes.length - 1];

            console.log(nodes)
            console.log(el)
            if (el){
            console.log(el.innerText)
            return el.innerText;
            }
         })();
      `);
      
      return STR_UltimaMensagem;

   }

   async function digitarMensagemnoChatSelecionado(ARG_OBJ_Page, message){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'digitarMensagemnoChatSelecionado');
      }
      
      let parts = message.split('\n');

         for (var i = 0; i < parts.length; i++) {
            if (i > 0) {
               await ARG_OBJ_Page.keyboard.down('Shift');
               await ARG_OBJ_Page.keyboard.press('Enter');
               await ARG_OBJ_Page.keyboard.up('Shift');
            }

            await ARG_OBJ_Page.keyboard.type(parts[i]);
         }

   }

   async function verificarStatusWhatsapp(OBJ_PaginaZAP){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'verificarStatusWhatsapp');
      }
      
      if (!OBJ_PaginaZAP){return}

      await esperarTerminarLoadingDoWhatsapp(OBJ_PaginaZAP);
      
      let TMP_BOL_TelaDeCarregando = await usuarioEstaNaTelaDeCarregando(OBJ_PaginaZAP);
      let TMP_BOL_TelaDoQrCode = await usuarioEstaNaTelaDoQrCode(OBJ_PaginaZAP);
      let TMP_BOL_TelaTentandoConectarCelular = await usuarioEstaNaTelaTentandoConectarAoCelular(OBJ_PaginaZAP);
      let TMP_BOL_TelaDeLogadoNoWhatsapp = await usuarioEstaNaTelaDeLogadoNoWhatsapp(OBJ_PaginaZAP);
      let TMP_BOL_UsuarioFicouOffDepoisDeTerEntrado = await usuarioFicouOffLineDepoisDeTerEntrado(OBJ_PaginaZAP);
      let TMP_BOL_TelaNumeroInvalido = await usuarioEstaNaTelaDeNumeroInvalido(OBJ_PaginaZAP);
      
      return {
         BOL_TelaDeCarregando: TMP_BOL_TelaDeCarregando,
         BOL_TelaDoQrCode: TMP_BOL_TelaDoQrCode,
         BOL_TelaTentandoConectarCelular: TMP_BOL_TelaTentandoConectarCelular,
         BOL_TelaDeLogadoNoWhatsapp: TMP_BOL_TelaDeLogadoNoWhatsapp,
         BOL_UsuarioFicouOffDepoisDeTerEntrado: TMP_BOL_UsuarioFicouOffDepoisDeTerEntrado,
         BOL_TelaNumeroInvalido: TMP_BOL_TelaNumeroInvalido
      }

   }

   async function obterTodasMinhasMensagens(ARG_OBJ_Page){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'obterTodasMinhasMensagens');
      }
      
      let ARR_MinhasMensagens = await ARG_OBJ_Page.evaluate(`
         (() => {
            let el_TodasMinhasMensagens = document.querySelectorAll('#main div.message-out');
            console.log(el_TodasMinhasMensagens)
            return el_TodasMinhasMensagens;
         })();
      `);

      return ARR_MinhasMensagens;

   }

   async function obterUltimaMensagemQueEuMandeiNoChatSelecionado(ARG_OBJ_Page){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'obterUltimaMensagemQueEuMandeiNoChatSelecionado');
      }
      
      let OBJ_UltimaMensagem = await ARG_OBJ_Page.evaluate(`
         (() => {
            let el_TodasMinhasMensagens = document.querySelectorAll('#main div.message-out');
            let el_UltimaMensagem = el_TodasMinhasMensagens[el_TodasMinhasMensagens.length - 1];
            // let OBJ_InfoUltimaMensagem = obterInformacoesMensagemEspecifica(el_UltimaMensagem);
         
            // console.log(el_TodasMinhasMensagens);
            // console.log(OBJ_InfoUltimaMensagem);
            return el_UltimaMensagem;
         })();
      `);

      return OBJ_UltimaMensagem;

   }

   function obterInformacoesMensagemEspecifica(el_UltimaMensagem){

      if (GLOBAL_VAR.GBL_BOT_MOSTRAR_FUNCOES_EXECUTADAS){
         console.log('MOD_WHATSAPP: ' + 'obterInformacoesMensagemEspecifica');
      }
      
      let STR_ConteudoMensagem = "";
      let STR_StatusMensagem = "";
      let STR_HoraMensagem = "";
         
         if (el_UltimaMensagem){

            // OBTEM CONTEUDO DA MENSAGEM ----------------------------------------------
               let el_ConteudoMensagem = el_UltimaMensagem.getElementsByClassName('_3FXB1');
               if (el_ConteudoMensagem){
               el_ConteudoMensagem = el_ConteudoMensagem[0].getElementsByTagName('span')[0];
               STR_ConteudoMensagem = el_ConteudoMensagem.innerText;
               }

            // OBTEM CONTEUDO DA MENSAGEM ----------------------------------------------
               let el_HoraMensagem = el_UltimaMensagem.getElementsByClassName('_3EFt_');
               if (el_HoraMensagem){
               // el_ConteudoMensagem = el_ConteudoMensagem[0].getElementsByTagName('span')[0];
               STR_HoraMensagem = el_HoraMensagem[0].innerText;
               }

            // OBTEM STATUS DA MENSAGEM ------------------------------------------------
               let el_StatusMensagem = el_UltimaMensagem.getElementsByClassName('jdhpF');
               if (el_StatusMensagem){
               el_StatusMensagem = el_StatusMensagem[0].getElementsByTagName('span')[0].getAttribute('data-icon');
               STR_StatusMensagem = el_StatusMensagem;
               }
         }

      return {
         STR_StatusMensagem: STR_StatusMensagem,
         STR_HoraMensagem: STR_HoraMensagem,
         STR_ConteudoMensagem: STR_ConteudoMensagem
      }

   }
