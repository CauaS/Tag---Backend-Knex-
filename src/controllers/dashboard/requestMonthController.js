const connection = require('../../database/connections');

module.exports = {
    async show(req, resp) {
        const date = new Date();
        const DAY = date.getDate() > 10 ? `0${date.getDate()}`: date.getDate() ;
        const MONTH = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
        const PREV_MONTH = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
        const YEAR = date.getFullYear();

        console.log(PREV_MONTH);
        console.log(MONTH);

        try{
            const response = await connection('request')
            .select(                
                'ty.description as type',       
            )
            .count('r.number as qtd')
            .from('request as r')
            .join('type as ty', 'ty.id','=', 'r.type_id')
            .join('consultant as c', 'c.id','=', 'r.consultant_id')
            .whereBetween('created_at', [`${YEAR}-${PREV_MONTH}-01 00:00:00`, `${YEAR}-${MONTH}-${DAY} 00:00:00`])
            .groupBy('ty.description') 
                
                return resp.json(response);
        }catch(erro){
            return resp.json({ message: erro })
        }
    }
}