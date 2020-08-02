// LAST EDIT: 01/06/2020

// IMPORTAR BIBLIOTECAS ################################################################################################
   const fs = require('fs')

// EXPORTAR FUNÇÕES ####################################################################################################
   module.exports = {
      getConfigs,
      setConfigs
   }

// DEFINIR FUNÇÕES #####################################################################################################
   function getConfigs(ARG_STR_Arquivo){
      try {
         const jsonString = fs.readFileSync(ARG_STR_Arquivo);
         
         if (!jsonString || jsonString == ""){return}

         const jsonObject = JSON.parse(jsonString);
         return jsonObject;
      } catch(err) {
         console.log(err)
         return;
      }
   }

   function setConfigs(ARG_STR_Arquivo, OBJ_NovasConfigs){
      try {
         const jsonStringfied = JSON.stringify(OBJ_NovasConfigs, null, 2);
         console.log(jsonStringfied);
         fs.appendFileSync(ARG_STR_Arquivo, jsonStringfied);
         //  fs.writeFileSync(ARG_STR_Arquivo, jsonStringfied);
      } catch(err) {
         console.log(err)
         return;
      }
   }
