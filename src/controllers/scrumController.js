const connection = require('../database/connections');
const knex = require('knex');

module.exports = {
    async show(req, resp){
        try{
            const response = await connection('occurrence')
                .select(
                     'r.number',
                     knex.raw(`strftime('%d${'/'}%m${'/'}%Y', date(r.created_at)) as request_date`),
                     'ocor.comment',
                     'e.description as event_description',
                     'e.id as event_id',
                     knex.raw(`strftime('%d${'/'}%m${'/'}%Y', date(ocor.created_at)) as ocor_date`),
                     'c.description as consultant',
                     'ty.description as type', 
                     'ty.color', 
                    )
                .from('occurrence as ocor')
                .join('request as r', 'r.id', '=', 'ocor.request_id')
                .join('event as e'  , 'e.id', '=', 'ocor.event_id')
                .join('type as ty', 'ty.id','=', 'r.type_id')
                .join('consultant as c', 'c.id','=', 'r.consultant_id');


            //if there is a property event_description with value 'Analisado', so is added the property 'analisado' to the item itself.
            const fResponse = response.map(item => { 
                if(item.event_description.includes('Analisado')){
                   return Object.assign({}, item, { analisado: true });
                }else{
                    return Object.assign({}, item, { analisado: false });
                }
            });

            return resp.json(fResponse);
        }catch(erro){
            return resp.json({ message: `Something when wrong: ${erro}`})
        }
    },
}