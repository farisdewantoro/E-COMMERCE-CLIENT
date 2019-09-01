import React from 'react';
import { Route, Switch,BrowserRouter as Router } from 'react-router-dom';
import AuthenticatedRoute from '../components/authenticated-route';
import UnauthenticatedRoute from '../components/unauthenticated-route';
import Loadable from 'react-loadable';
import NotFound from './not-found';
import AuthRoute from '../components/common/AuthRoute';
import PrivateRoute from '../components/common/PrivateRoute';
import PrivateRouteOrder from '../components/common/PrivateRouteParams';

const Homepage = Loadable({
  loader: () => import('./home'),
  loading: () => null,
  modules: ['./home'],
  webpack: () => [require.resolveWeak('./home')]
});

const Products = Loadable({
  loader: () => import('./products'),
  loading: () => null,
  modules: ['./products'],
  webpack: () => [require.resolveWeak('./products')]
});
const ProductDetail = Loadable({
  loader: () => import('./productDetail'),
  loading: () => null,
  modules: ['./productDetail'],
  webpack: () => [require.resolveWeak('./productDetail')]
});
const Collection = Loadable({
  loader: () => import('./collection'),
  loading: () => null,
  modules: ['./collection'],
  webpack: () => [require.resolveWeak('./collection')]
});
const TrackShipment = Loadable({
  loader: () => import('./trackShipment'),
  loading: () => null,
  modules: ['./trackShipment'],
  webpack: () => [require.resolveWeak('./trackShipment')]
});


const Lookbook = Loadable({
  loader: () => import('./lookbook'),
  loading: () => null,
  modules: ['./lookbook'],
  webpack: () => [require.resolveWeak('./lookbook')]
});

const DetailLookbook = Loadable({
  loader: () => import('./lookbook/detailLookbook'),
  loading: () => null,
  modules: ['./lookbook/detailLookbook'],
  webpack: () => [require.resolveWeak('./lookbook/detailLookbook')]
});

const ReturnPolicy = Loadable({
  loader: () => import('./returnPolicy'),
  loading: () => null,
  modules: ['./returnPolicy'],
  webpack: () => [require.resolveWeak('./returnPolicy')]
});
const SizeGuide = Loadable({
  loader: () => import('./size'),
  loading: () => null,
  modules: ['./size'],
  webpack: () => [require.resolveWeak('./size')]
});
const PaymentGuide = Loadable({
  loader: () => import('./paymentGuide'),
  loading: () => null,
  modules: ['./paymentGuide'],
  webpack: () => [require.resolveWeak('./paymentGuide')]
});
const Help = Loadable({
  loader: () => import('./help'),
  loading: () => null,
  modules: ['./help'],
  webpack: () => [require.resolveWeak('./help')]
});
const ConfirmPayment = Loadable({
  loader: () => import('./confirmPayment'),
  loading: () => null,
  modules: ['./confirmPayment'],
  webpack: () => [require.resolveWeak('./confirmPayment')]
});
const Carts = Loadable({
  loader: () => import('./carts'),
  loading: () => null,
  modules: ['./carts'],
  webpack: () => [require.resolveWeak('./carts')]
});
const Checkout = Loadable({
  loader: () => import('./checkout'),
  loading: () => null,
  modules: ['./checkout'],
  webpack: () => [require.resolveWeak('./checkout')]
});
const Payment = Loadable({
  loader: () => import('./payment'),
  loading: () => null,
  modules: ['./payment'],
  webpack: () => [require.resolveWeak('./payment')]
});
const Login = Loadable({
  loader: () => import('./auth/Login'),
  loading: () => null,
  modules: ['./auth/Login'],
  webpack: () => [require.resolveWeak('./auth/Login')]
});
const Register = Loadable({
  loader: () => import('./auth/Register'),
  loading: () => null,
  modules: ['./auth/Register'],
  webpack: () => [require.resolveWeak('./auth/Register')]
});
const MyAccount = Loadable({
  loader: () => import('./myAccount'),
  loading: () => null,
  modules: ['./myAccount'],
  webpack: () => [require.resolveWeak('./myAccount')]
});
const Profile = Loadable({
  loader: () => import('./profile'),
  loading: () => null,
  modules: ['./profile'],
  webpack: () => [require.resolveWeak('./profile')]
});
const Address = Loadable({
  loader: () => import('./address'),
  loading: () => null,
  modules: ['./address'],
  webpack: () => [require.resolveWeak('./address')]
});
const Order = Loadable({
  loader: () => import('./order'),
  loading: () => null,
  modules: ['./order'],
  webpack: () => [require.resolveWeak('./order')]
});
const OrderDetail = Loadable({
  loader: () => import('./order/detailOrder'),
  loading: () => null,
  modules: ['./order/detailOrder'],
  webpack: () => [require.resolveWeak('./order/detailOrder')]
});



export default () => (
 
  <Switch>
      <Route  path="/" exact render={(props)=>(
        <Homepage {...props} />
      )} />
      <Route  path="/shop" exact render={(props)=>(
        <Products {...props} />
      )}/>
      <Route path="/redirect" exact render={(props) => (
      <Homepage  {...props} />
      )} />


    <Route path="/carts" exact render={(props) => (
      <Carts {...props} />
    )} />
    <Route path="/track-shipment" exact render={(props) => (
      <TrackShipment {...props} />
    )} />

    <Route path="/shop/:tag" exact render={(props) =>
      (<Products key={props.match.params.tag} {...props} />)
    } />
    <Route path="/shop/:tag/:category" exact render={(props) =>
      (<Products key={props.match.params.category} {...props} />)
    } />
    <Route path="/shop/:tag/:category/:type" exact render={(props) =>
      (<Products key={props.match.params.type} {...props} />)
    } />
    <Route path="/products/:category/:name" exact render={(props) =>
      (<ProductDetail key={props.match.params.name} {...props} />)
    } />


    <Route path="/lookbook" exact render={(props) =>
      (<Lookbook {...props} />)} />
    <Route path="/lookbook/detail/:slug" exact render={(props) =>
      (<DetailLookbook key={props.match.params.slug} {...props} />)} />


    <Route path="/collection" exact render={(props) =>
      (<Collection {...props} />)} />
    <Route path="/collection/:collection" exact render={(props) =>
      (<Products key={props.match.params.collection}  {...props} />)} />

    <Route path="/return-policy" exact render={(props) =>
      (<ReturnPolicy  {...props} />)} />
    <Route path="/size-guide" exact render={(props) =>
      (<SizeGuide  {...props} />)} />
    <Route path="/payment-guide" exact render={(props) =>
      (<PaymentGuide  {...props} />)} />
    <Route path="/help" exact render={(props) => (
      <Help {...props} />
    )} />

   
    <PrivateRoute path="/checkout" exact component={Checkout}
    />
    <PrivateRouteOrder path="/checkout/:token_order" exact component={Payment}
    />


    <AuthRoute path="/sign-in" exact component={Login} />
    <AuthRoute path="/sign-up" exact component={Register} />

    <PrivateRoute path="/confirm-payment" exact component={ConfirmPayment}/>
    <PrivateRoute path="/my-account" exact component={MyAccount} />
    <PrivateRoute path="/my-account/profile" exact component={Profile} />
    <PrivateRoute path="/my-account/address" exact component={Address} />
    <PrivateRoute path="/my-account/orders" exact component={Order} />
    <PrivateRouteOrder path="/my-account/orders/detail/:token_order" exact component={OrderDetail} />

  <Route component={NotFound} />
  </Switch>

);
