const { Router } = require('express');

const routers = Router();
const  consultController = require('./controllers/consultController');
const  typeController = require('./controllers/typeController');
const  requestController = require('./controllers/requestController');
const  tagsController = require('./controllers/tagsController');

const  requestMonthController = require('./controllers/dashboard/requestMonthController');
const  requestPatchController = require('./controllers/dashboard/requestPatchController');

const  eventController = require('./controllers/eventController');
const  occurrenceController = require('./controllers/occurrenceController');

const  scrumController = require('./controllers/Scrum/scrumController');
const  scrumLiberadoController = require('./controllers/Scrum/scrumLiberadoController');
const  scrumAnalisadoController = require('./controllers/Scrum/scrumAnalisadoController');
const  scrumValidadoDesenvController = require('./controllers/Scrum/scrumValidadoDesenvController');
const  scrumValidadoConsultController = require('./controllers/Scrum/scrumValidadoConsultController');
const  scrumAtualizadoClienteController = require('./controllers/Scrum/scrumAtualizadoClienteController');
const  scrumImpedidoController = require('./controllers/Scrum/scrumImpedidoController');


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


routers.get('/dashboard/month', requestMonthController.show);
routers.get('/dashboard/patch', requestPatchController.show);

routers.post('/events', eventController.create);
routers.get('/events', eventController.show);

routers.get('/occurrence', occurrenceController.show);
routers.post('/occurrence', occurrenceController.create);
routers.post('/occurrence/request', occurrenceController.index);

routers.get('/scrum', scrumController.show);
routers.get('/scrum/liberado', scrumLiberadoController.show);
routers.get('/scrum/analisado', scrumAnalisadoController.show);
routers.get('/scrum/validadoDesenv', scrumValidadoDesenvController.show);
routers.get('/scrum/validadoConsult', scrumValidadoConsultController.show);
routers.get('/scrum/atualizadoCliente', scrumAtualizadoClienteController.show);
routers.get('/scrum/impedido', scrumImpedidoController.show);

module.exports = routers;