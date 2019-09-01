import {Router} from 'express';
import * as VoucherController from './controller';
import {ensureIsAuth} from '../../config/authCheck';

const routes = new Router();

routes.post('/voucher/set',ensureIsAuth,VoucherController.checkVoucherDiscount);

export default routes;