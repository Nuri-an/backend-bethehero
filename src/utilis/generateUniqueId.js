const crypto = require('crypto');  //metodo de criptografia, gera uma string aleatória

module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX'); // Gera 4 bytes de caracteres hexadecimais e armazena-se em id
}