const connection = require('../database/connections');

module.exports = {
    async create(req, resp){
        
        const { description } = req.body;

        try { 
          const response = await connection('consultant').insert({
            description,
          }); 

          return resp.json( response );

        }catch(erro) {
            return resp.json({ message: 'Something went wrong'})
        }

    },
    async show(req, resp) {
        try {
            const response = await connection('consultant').select('*');

            return resp.json({ response });

        }catch(erro){
            return resp.json({ message: 'Something went wrong!' })
        }
    },
    async delete(req, resp){
        try {
            const { id } = req.params;

            const response = await connection('consultant').where('id', id).delete();

            return resp.json(response);

        }catch(erro){
            return resp.json({ message: `Deleted id: ${id}`});
        }
    },
    async searchConsultant(req, resp){
        const { consultantName } = req.body;

        try {
            const response = await connection('request')
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
            .where('c.description', consultantName)
            .join('type as ty', 'ty.id','=', 'r.type_id')
            .join('consultant as c', 'c.id','=', 'r.consultant_id')

            return resp.json(response);
        }
        catch(erro) {
            return resp.json({ message: 'Something went wrong!' });
        }
    }
}