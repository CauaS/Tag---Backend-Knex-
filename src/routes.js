const { Router } = require('express');

const routers = Router();
const  consultController = require('./controllers/consultController');
const  typeController = require('./controllers/typeController');
const  requestController = require('./controllers/requestController');
const  tagsController = require('./controllers/tagsController');


routers.post('/consultant', consultController.create);
routers.get('/consultant', consultController.show);
routers.delete('/consultant/:id', consultController.delete);
routers.get('/consultant/name', consultController.searchConsultant);

routers.post('/type', typeController.create);
routers.get('/type', typeController.show);
routers.delete('/type/:id', typeController.delete);

routers.post('/request', requestController.create);
routers.get('/request', requestController.show);
routers.delete('/request/:id', requestController.delete);
routers.post('/request/number', requestController.searchRequest);
routers.post('/request/in', requestController.searchRequestIn);

routers.get('/tags', tagsController.show);
routers.delete('/tags/:id', tagsController.delete);
routers.post('/tags/in', tagsController.searchTagIn);

module.exports = routers;