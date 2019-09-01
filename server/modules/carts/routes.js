import { Router } from 'express';
import * as CartController from './controller';

const routes = new Router();
routes.post('/cart/addtocart', CartController.addToCart);
routes.put('/cart/updatecart',CartController.updateCart);
routes.delete('/cart/deletecart/:cart_item_id',CartController.deleteCart);
export default routes;


