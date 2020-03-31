const connection = require('../database/connections');

module.exports = {
    async show(req, resp) {
        try {
            const response = await connection('tags').select('*');

            return resp.json( response );

        }catch(erro){
            return resp.json({ message: 'Something went wrong!' })
        }
    },
    async delete(req, resp){
        try {
            const { id } = req.params;

            const response = await connection('tags').where('id', id).delete();

            return resp.json(response);

        }catch(erro){
            return resp.json({ message: `Deleted id: ${id}`});
        }
    },
    async searchTagIn(req, resp){
        const { tags } =  req.body;
        const tagsArr = tags.split(',').map(tag => tag.trim());

        try {
            const response  = await connection('tags')
            .select(                
                'r.description',
                'r.number',
                'r.date',
                'c.description as consultant',
                'ty.description as type', 
                'ty.color',                 
                'r.tags',                
            )
            .from('request as r')
            .whereIn('t.description', tagsArr)
            .join('type as ty', 'ty.id','=', 'r.type_id')
            .join('consultant as c', 'c.id','=', 'r.consultant_id')
            .join('tags as t', 't.request_id', '=', 'r.id')
            .groupBy('r.number');
            
            return resp.json(response);

        }catch(erro){
            return resp.json({ message: 'Something went wrong!'})
        }   
    }

}