import { Router } from 'express';
import * as AuthController from './controller';
import passport from 'passport';
import { ensureIsAuth } from '../../config/authCheck';
import keys from '../../config/keys';
const routes = new Router();
// routes.get('/auth/google',passport.authenticate("google",{
//     scope: ["profile", "email"]
// }));
// routes.get('/auth/google/redirect', passport.authenticate("google"),AuthController.googleRedirect);
// routes.post('/auth/logout',AuthController.logout);

// routes.get('/auth/facebook', passport.authenticate('facebook',{
//     scope: ["email"]
// }));
// routes.get('/auth/facebook/redirect', passport.authenticate('facebook'), AuthController.facebookRedirect);

routes.post('/auth/login',AuthController.loginUser);
routes.post('/auth/logout', AuthController.logout);
routes.post('/auth/register',AuthController.registerUser);
routes.post('/auth/user_info',AuthController.getUserInfo);
routes.put('/auth/update/profile',ensureIsAuth,AuthController.updateProfile);
routes.post('/auth/update/address', ensureIsAuth, AuthController.updateAddress);
routes.get('/auth/get/address',ensureIsAuth,AuthController.getUserAdddress);
export default routes;


