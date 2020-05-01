const connection = require('../../database/connections');
const knex = require('knex');

module.exports = {
    async show(req, resp) {
        const date = new Date();
        const DAY = date.getDate() > 10 ? `0${date.getDate()}`: date.getDate() ;
        const MONTH = date.getMonth()+1 > 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
        const YEAR = date.getFullYear();

        try{
            const response = await connection('request')
            .select(                
                'ty.description as type',       
            )
            .count('r.number as qtd')
            .from('request as r')
            .join('type as ty', 'ty.id','=', 'r.type_id')
            .join('consultant as c', 'c.id','=', 'r.consultant_id')
            .whereBetween('created_at', ['2020-04-27 00:00:00', `${YEAR}-${MONTH}-${DAY} 00:00:00`])
            .groupBy('ty.description');

            
            const highest = response.reduce((prev, curr) =>  prev.qtd > curr.qtd ? prev : curr );
            const lowest = response.reduce((prev, curr) =>  prev.qtd < curr.qtd ? prev : curr );

            const finalHighest = Object.assign({}, highest, { type: 'up' });
            const finalLowest  = Object.assign({}, lowest,  { type: 'down' });

            const responseFinal = [finalHighest, finalLowest];
                
                return resp.json(responseFinal);
        }catch(erro){
            return resp.json({ message: erro })
        }
    }
}