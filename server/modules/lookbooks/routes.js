import {Router} from 'express';
import * as LookbookController from './controller';
const routes = new Router();

routes.get('/lookbook/getall',LookbookController.getAllLookbook);
routes.get('/lookbook/get/detail/:slug',LookbookController.getDetailLookbook);


export default routes;