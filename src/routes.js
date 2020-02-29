import { Router } from 'express';
import ClienteController from './app/controllers/ClienteController';
import PedidoController from './app/controllers/PedidoController';

import ClienteMiddleware from './app/middlewares/Cliente';
import PedidoMiddleware from './app/middlewares/Pedido';

const routes = new Router();

// CLIENTES
routes.get('/clientes', ClienteController.index);
routes.post('/clientes', ClienteController.store);

routes.get('/clientes/:id', ClienteMiddleware, ClienteController.show);
routes.put('/clientes/:id', ClienteMiddleware, ClienteController.update);
routes.delete('/clientes/:id', ClienteMiddleware, ClienteController.delete);

// PEDIDOS
routes.get('/pedidos', PedidoController.index);
routes.post('/pedidos', PedidoController.store);

routes.get('/pedidos/:id', PedidoMiddleware, PedidoController.show);
routes.put('/pedidos/:id', PedidoMiddleware, PedidoController.update);
routes.delete('/pedidos/:id', PedidoMiddleware, PedidoController.delete);

export default routes;
