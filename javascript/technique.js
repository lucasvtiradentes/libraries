// LAST EDIT: 01/06/2020

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports = {
      sleep,
      booleanToAnswer,
      answerToBoolean,
      showFunctionTitle,
      showModuleMethods
   }
   
// DEFINIR FUNÇÕES #####################################################################################################
   async function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));  
   }

   function booleanToAnswer(ARG_BOL_Analisado){
      let TMP_resposta = ARG_BOL_Analisado ? 'sim' : 'não';
      return TMP_resposta;
   }

   function answerToBoolean(ARG_STR_Restosta){
      if (ARG_STR_Restosta === "NÃO" || ARG_STR_Restosta === "não") {
         return false;
      } else if (ARG_STR_Restosta === "SIM" || ARG_STR_Restosta === "sim" ){
         return true;
      }
   }

   function showFunctionTitle(ARG_STR_TituloFuncao, ARG_STR_Simbolo, ARG_INT_MaximoCaracteres){
      // if (!ARG_STR_TituloFuncao || !ARG_STR_Simbolo || !ARG_INT_MaximoCaracteres){return}
      let STR_Feita = ARG_STR_TituloFuncao + " " + ARG_STR_Simbolo.repeat(ARG_INT_MaximoCaracteres);
      return '\n' + padronizarTamanhoString(STR_Feita, ARG_INT_MaximoCaracteres) + '\n';
   }

   function showModuleMethods(ARG_OBJ_Method){

      let OBJ_Methods = Object.keys(ARG_OBJ_Method);

      console.log(OBJ_Methods);
      // showModuleMethods(require('./array.js'))
      // showModuleMethods(module.exports)

      return OBJ_Methods;

   }

