import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer'
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import trackReducer from './trackReducer';
import addressReducer from './addressReducer';
import notifReducer from './notifReducer';
import shippingReducer from './shippingReducer';
import uiReducer from './uiReducer';
import lookbookReducer from './lookbookReducer';
import orderReducer from './orderReducer';
import voucherReducer from './voucherReducer';
import collectionReducer from './collectionReducer';
import sizingReducer from './sizingReducer';
import instagramReducer from './instagramReducer';
import { connectRouter } from 'connected-react-router'
import csrfReducer from './csrfReducer';
export default (history) => combineReducers({
    router: connectRouter(history),
    products: productReducer,
    carts: cartReducer,
    errors: errorReducer,
    auths: authReducer,
    tracks:trackReducer,
    address: addressReducer,
    notification: notifReducer,
    shipping: shippingReducer,
    UI: uiReducer,
    lookbooks:lookbookReducer,
    orders:orderReducer,
    vouchers:voucherReducer,
    collections: collectionReducer,
    sizings: sizingReducer,
    instagrams: instagramReducer,
    token: csrfReducer
});