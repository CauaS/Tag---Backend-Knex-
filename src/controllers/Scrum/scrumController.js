const connection = require('../../database/connections');
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
                .join('consultant as c', 'c.id','=', 'r.consultant_id')

            // it's reducing duplicated request numbers
            let fResponseNumbers = new Set(response.map(item => item.number));
            let numbers = [...fResponseNumbers];

            let occurrencesFiltered = [];
            
            //grouping request in objects
            const filtrados = numbers.map(num => {
                return response.filter(data =>  data.number === num ? data : null);
            })
            
            for(item in filtrados){
                //if there is only one register, it's gonna verify it has event 'Analisado'
                if(filtrados[item].length == 1){
                    if(filtrados[item][0].event_description.includes('Analisado')){
                        filtrados[item][0].analisado = true;

                        //the occurrencesFiltered gets the register
                        occurrencesFiltered.push(filtrados[item][0]); 
                    }else {
                        filtrados[item][0].analisado = false;

                        //the occurrencesFiltered gets the register
                        occurrencesFiltered.push(filtrados[item][0]);   
                    }
                }
                else {
                //if there're more then one register, it's gonna verify if the first register has event 'Analisado'
                // if it does, then last register will get new property called analisado with true as value
                  filtrados[item][0].event_description.includes('Analisado')
                  ? filtrados[item][filtrados[item].length-1].analisado = true
                  : filtrados[item][filtrados[item].length-1].analisado = false
                    
                  //the occurrencesFiltered gets the last register
                  occurrencesFiltered.push(filtrados[item][filtrados[item].length-1])
                } 
            }

            return resp.json(occurrencesFiltered);
        }catch(erro){
            return resp.json({ message: `Something when wrong: ${erro}`})
        }
    },
}