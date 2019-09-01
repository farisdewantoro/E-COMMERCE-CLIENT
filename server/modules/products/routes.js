import { Router } from 'express';
import * as ProductController from './controller';

const routes = new Router();
routes.get('/product', ProductController.getProduct);
routes.get('/product/highlight/:category', ProductController.getProductHiglight);
routes.get('/product/:tag', ProductController.getProduct);
routes.get('/product/:tag/:category', ProductController.getProduct);
routes.get('/collection/get/:collection', ProductController.getProduct);
routes.get('/product/:tag/:category/:type', ProductController.getProduct);
routes.get('/product/detail/:category/:id/:slug',ProductController.getProductDetail);
// routes.get('/product/:category', ProductController.getProductWithParamCategory);
// routes.get('/product/query/:category',ProductController.getProductWithQueryCategory);
export default routes;