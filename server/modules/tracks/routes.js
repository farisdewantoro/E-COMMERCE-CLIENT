import { Router } from 'express';
import * as TrackRoutes from './controller';
import passport from 'passport';
const routes = new Router();

routes.post('/v1/track/cart', TrackRoutes.cartTrack);
routes.get('/v1/track',(req,res)=>{
    // res.cookie('hammerstout_t', req.csrfToken());
    return res.status(200).send(req.csrfToken());
});

routes.post('/v1/track/order-id',TrackRoutes.trackShipment);
export default routes;



