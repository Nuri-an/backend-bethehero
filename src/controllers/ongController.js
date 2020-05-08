const connection = require('../database/connection');  //conecção com o bd
const generateUniqueId = require('../utilis/generateUniqueId');  //metodo de criptografia, gera uma string aleatória

module.exports = {
    async list (request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body; // ao invés de armazenar tudo em uma variavél, armazeou-se cada uma em uma

        const id = generateUniqueId();

    await connection('ongs').insert({  //iniciando inserção na tabela ongs
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    return response.json({ id });
    }
}