import {Router} from 'express';
import * as AddressController from './controller';
const routes = new Router();


routes.get('/address/get/provinces',AddressController.getProvinces);
routes.post('/address/find/regencies',AddressController.findCity);
routes.post('/address/find/districts',AddressController.findDistricts);
routes.post('/address/find/villages',AddressController.findVillages);
routes.post('/address/get/option',AddressController.findOptionAddress);
export default routes;