const connection = require('../database/connections');
const knex = require('knex');

module.exports = {
    async create(req, resp){
        const { description } = req.body;

        try {
           const response = await connection('event').insert({
                description   
           });

           return resp.json(response);
            

        }catch(erro){
            return resp.json({ message: `Something when wrong : ${erro}`})
        }
    },

    async show(req, resp){
        try{
            const response = await connection('event').select('*');

            return resp.json(response);
        }catch(erro){
            return resp.json({ message: `Something when wrong: ${erro}`})
        }
    }
}