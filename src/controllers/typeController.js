const connection = require('../database/connections');

module.exports = {
    async create(req, resp){
        
        const { description, color } = req.body;

        try { 
          const response = await connection('type').insert({
            description,
            color
          }); 

          return resp.json( response );

        }catch(erro) {
            return resp.json({ message: 'Something went wrong'})
        }

    },
    async show(req, resp) {
        try {
            const response = await connection('type').select('*');

            return resp.json( response );

        }catch(erro){
            return resp.json({ message: 'Something went wrong!' })
        }
    },
    async delete(req, resp){
        try {
            const { id } = req.params;

            const response = await connection('type').where('id', id).delete();

            return resp.json(response);

        }catch(erro){
            return resp.json({ message: `Deleted id: ${id}`});
        }
    }
}