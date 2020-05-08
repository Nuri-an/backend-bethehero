const connection = require('../database/connection');  //conecção com o bd

module.exports = {
    async create(request, response){
        const { id } = request.body; //pega o parametro enviado, route params
        
        const ong = await connection('ongs')
            .where('id', id)  //procura pela linha que possui este id
            .select('name') //seleciona o campo ong_id dessa linha
            .first();        //pega o primeiro, e unico, valor encontrado
    
        if (!ong){
            return response.status(400).json({ error: 'No ONG found with this ID'});
        }

        return response.json(ong);
    },
};