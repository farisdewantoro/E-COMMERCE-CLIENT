import React from "react";
import { render, hydrate } from "react-dom";
import { Provider } from "react-redux";
import Loadable from "react-loadable";
import { Frontload } from "react-frontload";
import { ConnectedRouter } from "connected-react-router";
import createStore from "./store";
import App from "./app/app";
import jwt_decode from "jwt-decode";
import "./index.css";
import {
    setCurrentUser,
    clearCurrentUser,
    getUserInfo
} from "./app/actions/authActions";
import {
    setCart,
    clearCartList,
    fetchCartList
} from "./app/actions/cartActions";
import {
    setAddressCurrentUser,
    clearAddressUser
} from "./app/actions/myAccounts";
import { getContentHome } from "./app/actions/uiActions";
import { getInstagramMedia } from "./app/actions/instagramActions";
import ReactGA from 'react-ga'
const { store, history } = createStore();
store.dispatch(getContentHome());
store.dispatch(fetchCartList());
store.dispatch(getUserInfo());
store.dispatch(getInstagramMedia());
if(process.env.NODE_ENV !== 'production'){
if (localStorage.hammerstout_a) {
    const decoded = jwt_decode(localStorage.hammerstout_a);
    store.dispatch(setCurrentUser(decoded.user));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        localStorage.removeItem("hammerstout_a");
        store.dispatch(clearCurrentUser());
    }
}
}
if (localStorage.hammerstout_address) {
    const decoded = jwt_decode(localStorage.hammerstout_address);
    store.dispatch(setAddressCurrentUser(decoded.resultData));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        localStorage.removeItem("hammerstout_address");
        store.dispatch(clearAddressUser());
    }
}

if (localStorage.hammerstout_c) {
    const decoded = jwt_decode(localStorage.hammerstout_c);
    store.dispatch(setCart(decoded.result));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        localStorage.removeItem("hammerstout_c");
        store.dispatch(clearCartList());
    }
}

ReactGA.initialize('UA-119403648-1')


// Running locally, we should run on a <ConnectedRouter /> rather than on a <StaticRouter /> like on the server
// Let's also let React Frontload explicitly know we're not rendering on the server here
const Application = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Frontload noServerRender={true}>
                <App />
            </Frontload>
        </ConnectedRouter>
    </Provider>
);

const root = document.querySelector("#root");

if (root.hasChildNodes() === true) {
    // If it's an SSR, we use hydrate to get fast page loads by just
    // attaching event listeners after the initial render
    Loadable.preloadReady().then(() => {
        hydrate(Application, root);
    });
} else {
    // If we're not running on the server, just render like normal
    render(Application, root);
}

