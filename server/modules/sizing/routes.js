import {Router} from 'express';
import * as SizingController from './controller';

const routes = new Router();

routes.get('/sizing/getall',SizingController.getAll);

export default routes