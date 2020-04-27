const connection = require('../../database/connections');

module.exports = {
    async show(req, resp) {
        try{
            const response = await connection('request')
            .select(                
                'ty.description as type',       
            )
            .count('r.number as qtd')
            .from('request as r')
            .join('type as ty', 'ty.id','=', 'r.type_id')
            .join('consultant as c', 'c.id','=', 'r.consultant_id')
            .whereBetween('created_at', ['2020-04-27 00:00:00', '2020-04-27 06:59:27'])
            .groupBy('ty.description') 
                
                return resp.json(response);
        }catch(erro){
            return resp.json({ message: erro })
        }
    }
}