// LAST EDIT: 01/06/2020

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports = {
      setDefaultLengthToString,
      left,
      right,
      mid
   }

// DEFINIR FUNÇÕES #####################################################################################################
   function setDefaultLengthToString(ARG_STR_String, ARG_INT_NumCaracteres){
         
      if (typeof ARG_STR_String == "undefined" || !ARG_INT_NumCaracteres){return}
      let STR_Final;

      let STR_StringRepetir = ' ';
      let INT_NumeroCaracteresString = ARG_STR_String.length;
      let INT_NumeroCaracteresColoca = ARG_INT_NumCaracteres-INT_NumeroCaracteresString;

         if (INT_NumeroCaracteresColoca<0){
            STR_Final = ARG_STR_String.substring(0, ARG_INT_NumCaracteres);
         } else {
            STR_Final = ARG_STR_String + STR_StringRepetir.repeat(INT_NumeroCaracteresColoca);
         }

      return STR_Final;

   }

   function left(ARG_STR_analisada, ARG_INT_QuantidadeCaracteres){
      if (!ARG_STR_analisada){return}
      return ARG_STR_analisada.substring(0, ARG_INT_QuantidadeCaracteres);
   }

   function right(ARG_STR_analisada, ARG_INT_QuantidadeCaracteres){
      if (!ARG_STR_analisada){return}
      return ARG_STR_analisada.substring(ARG_STR_analisada.length - ARG_INT_QuantidadeCaracteres, ARG_STR_analisada.length);
   }

   function mid(ARG_STR_analisada, ARG_INT_CaractereInicial, ARG_INT_QuantidadeCaracteres){
      if (!ARG_STR_analisada){return}
      let STR_tmp = ARG_STR_analisada.substring(ARG_INT_CaractereInicial)
      return STR_tmp.substring(0, ARG_INT_QuantidadeCaracteres);
   }
