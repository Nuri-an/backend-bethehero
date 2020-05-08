const connection = require('../database/connection');  //conecção com o bd


module.exports = {

    async list (request, response){
        const {page = 1} = request.query;  //para a paginação

        const [count] = await connection('incidents').count();

        console.log(count);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
    

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value} = request.body;

        const ong_id = request.headers.authorization;

        //ao cadastrar será gerado um id, unnica posiçao do vetor resultado, e este será salvo aqui
        const [id] = await connection('incidents').insert({  //iniciando inserção na tabela ongs
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params; //pega o parametro enviado, route params
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)  //procura pela linha que possui este id
            .select('ong_id') //seleciona o campo ong_id dessa linha
            .first();        //pega o primeiro, e unico, valor encontrado
    
        if (incident.ong_id != ong_id){ //verifica se o valor encontrado é gual ao valor enviado pela route params
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },
};