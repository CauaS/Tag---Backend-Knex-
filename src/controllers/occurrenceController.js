const connection = require('../database/connections');
const knex = require('knex');

module.exports = {
    async create(req, resp){
        const { request_id, event_id, comment } = req.body;

        try {
           const response = await connection('occurrence').insert({
                request_id,
                event_id,
                comment
           });

           return resp.json(response);
            

        }catch(erro){
            return resp.json({ message: `Something when wrong : ${erro}`})
        }
    },

    async show(req, resp){
        try{
            const response = await connection('occurrence')
                .select(
                     'r.number',
                     'r.created_at as request_date',
                     'ocor.comment',
                     'e.description as event_description',
                     'ocor.created_at as ocor_date',
                     'c.description as consultant',
                     'ty.description as type', 
                     'ty.color', 
                    )
                .from('occurrence as ocor')
                .join('request as r', 'r.id', '=', 'ocor.request_id')
                .join('event as e'  , 'e.id', '=', 'ocor.event_id')
                .join('type as ty', 'ty.id','=', 'r.type_id')
                .join('consultant as c', 'c.id','=', 'r.consultant_id');

            return resp.json(response);
        }catch(erro){
            return resp.json({ message: `Something when wrong: ${erro}`})
        }
    }
}