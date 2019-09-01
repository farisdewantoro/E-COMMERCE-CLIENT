import {Router} from 'express';
import * as v1Controller from './controller';

const routes = new Router();

// routes.post('/api/payment/notification',v1Controller.getNotification);
routes.get('/api/payment/redirect',v1Controller.redirectTo);
routes.post('/api/maitance/mode/change',v1Controller.changeMode);
export default routes;