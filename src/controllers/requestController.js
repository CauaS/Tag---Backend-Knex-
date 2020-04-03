const connection = require('../database/connections');

module.exports = {
    async create(req, resp){

        const { description, number, date, type_id, consultant_id, tags } = req.body;
        const tagsArr = tags.split(',').map(tag => tag.trim());

        let exists = await connection('request').select('number').where('number', number);
        
        if(exists.length == 0){
            //insert one request
            try {
                const [id] = await connection('request').insert({
                    description, 
                    number, 
                    date, 
                    tags,
                    type_id, 
                    consultant_id,
                });
                //insert all tags, not in a single register
                return tagsArr.map( async tag => {
                    try {
                        await connection('tags').insert({
                            description: tag,
                            request_id: id
                        })
                        return resp.json(id);
                    }catch(erro) {
                        return resp.status(400).json({ message: 'Something when wrong to inser tags'});
                    }
                })
    
    
            }catch(erro){
                return resp.status(400).json({message: 'Bad request'});
            }
        }else{
            return resp.status(400).json({ message: 'Request already exists' });
        }

    },
    async show(req, resp) {
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
            .join('type as ty', 'ty.id','=', 'r.type_id')
            .join('consultant as c', 'c.id','=', 'r.consultant_id')

            return resp.json(response);

        }catch(erro){
            return resp.json({ message: 'Something went wrong!' })
        }
    },
    async delete(req, resp){
        try {
            const { id } = req.params;

            const response = await connection('request').where('id', id).delete();

            return resp.json(response);

        }catch(erro){
            return resp.json({ message: `Deleted id: ${id}`});
        }
    },
    async searchRequest(req, resp){

        const { number } = req.body;
		
        console.log(number);

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
            .where('r.number', number)
            .join('type as ty', 'ty.id','=', 'r.type_id')
            .join('consultant as c', 'c.id','=', 'r.consultant_id')

            return resp.json(response);
        }
        catch(erro) {
            return resp.json({ message: 'Something went wrong!' });
        }
    },

    async searchRequestIn(req, resp){
        const { requests } = req.body;
        const requestArr = requests.split(',').map(tag => tag.trim());
        
        try {
            const response  = await connection('request')
            .select(                
                'r.description',
                'r.number',
                'r.date',
                'c.description as consultant',
                'ty.description as type', 
                'ty.color',
                'r.tags'               
            )
            .from('request as r')
            .whereIn('r.number', requestArr)
            .join('type as ty', 'ty.id','=', 'r.type_id')
            .join('consultant as c', 'c.id','=', 'r.consultant_id')
            .groupBy('r.number');

            return resp.json(response);

        }catch(erro){
            return resp.json({ message: 'Something went wrong!'})
        } 
    }
}