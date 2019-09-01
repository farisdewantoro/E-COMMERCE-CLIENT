import {Router} from 'express';
import * as ShippingRouter from './controller'

const routes = new Router();

routes.post('/shipping/check/cost',ShippingRouter.checkCost);

export default routes;