import {Router} from 'express';
import * as InstagramController from './controller';

const routes = new Router();

routes.get('/instagram/get/media/recent',InstagramController.getMediaRecent);
routes.get('/instagram/refresh/token',InstagramController.refreshToken);

export default routes;