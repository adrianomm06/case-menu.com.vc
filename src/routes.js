import { Router } from 'express';
import ClienteController from './app/controllers/ClienteController';

import ClienteMiddleware from './app/middlewares/Cliente';

const routes = new Router();

// CLIENTES
routes.get('/clientes', ClienteController.index);
routes.post('/clientes', ClienteController.store);

routes.get('/clientes/:id', ClienteMiddleware, ClienteController.show);
routes.put('/clientes/:id', ClienteMiddleware, ClienteController.update);
routes.delete('/clientes/:id', ClienteMiddleware, ClienteController.delete);

// PEDIDOS

export default routes;
