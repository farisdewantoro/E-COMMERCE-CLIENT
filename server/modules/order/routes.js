import {Router} from 'express';
import * as OrderController from './controller';
import {ensureIsAuth} from '../../config/authCheck';
const routes = new Router();

routes.post('/order/submit',ensureIsAuth,OrderController.orderSubmit)
routes.get('/order/get/current/:token_order',ensureIsAuth,OrderController.getCurrentOrder);
routes.get('/order/get/all-order',ensureIsAuth,OrderController.getAllOrder);
routes.get('/order/get/current/payment/:token_order',ensureIsAuth,OrderController.getCurrentOrderPayment);
routes.post('/order/get/order_list',ensureIsAuth,OrderController.getOrderList);
routes.post('/order/confirm/payment',ensureIsAuth,OrderController.confirmPayment);
export default routes;