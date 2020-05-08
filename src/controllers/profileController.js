const connection = require('../database/connection');  //conecção com o bd


module.exports = {
    async profileList(request, response){
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);
    },
};
