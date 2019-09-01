import { createStore, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createBrowserHistory, createMemoryHistory } from "history";
import rootReducer from "./reducers";
import { googleAnalytics } from './reactGAMiddlewares'
import createRootReducer from './reducers'
import {removeError} from './errorMiddlewarres';
import { composeWithDevTools } from 'redux-devtools-extension';
import {setCSRF} from './app/utils/setCSRF';
// A nice helper to tell us if we're on the server
export const isServer = !(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);



export default (url = "/") => {
  // Create a history depending on the environment
  const history = isServer
    ? createMemoryHistory({
        initialEntries: [url]
      })
    : createBrowserHistory();

  const enhancers = [];

  // Dev tools are helpful
  if (process.env.NODE_ENV === "development" && !isServer) {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }
  }

  const middleware = [thunk, routerMiddleware(history), googleAnalytics, setCSRF, removeError];
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );
  // const composedEnhancers = composeWithDevTools(
  // applyMiddleware(...middleware),
  // );

  // Do we have preloaded state available? Great, save it.
  const initialState = !isServer ? window.__PRELOADED_STATE__ : {};

  // Delete it once we have it stored in a variable
  if (!isServer) {
    delete window.__PRELOADED_STATE__;
  }

  // Create the store
  const store = createStore(
    createRootReducer(history),
    // connectRouter(history)(rootReducer),
    initialState,
    composedEnhancers
  );

  return {
    store,
    history
  };
};
