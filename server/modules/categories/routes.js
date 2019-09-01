import { Router } from 'express';
import * as CategoryController from './controller';

const routes = new Router();


routes.get('/category/get/all', CategoryController.getAllCategory);
export default routes;