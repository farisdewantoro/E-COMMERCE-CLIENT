import {Router} from 'express';
import * as CheckoutRouter from './controller';
import { ensureIsAuth } from '../../config/authCheck';
const routes  =new Router();

routes.post('/checkout/pay/:token_order',ensureIsAuth,CheckoutRouter.submitPayment);
routes.post('/checkout/pay/submit/:token_order',ensureIsAuth,CheckoutRouter.insertPaymentOrder);
routes.post('/checkout/manual/submit/:token_order',ensureIsAuth,CheckoutRouter.insertPaymentOrderManual);
export default routes;