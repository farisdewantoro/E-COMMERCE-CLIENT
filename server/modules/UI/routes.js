import {Router} from 'express';
import * as UIController from './controller';
const routes = new Router();

routes.get('/content/home',UIController.getContentHome);

export default routes;
