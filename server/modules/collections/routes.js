import {Router} from 'express';
import * as CollectionController from './controller';
const routes = new Router();

routes.get('/collection/getall',CollectionController.getAllCollection);


export default routes;