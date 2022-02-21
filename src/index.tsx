import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {rootReducer} from './services/reducers';

import {
  WS_CONNECTION_AUTH_CLOSE,
  WS_CONNECTION_AUTH_CLOSED,
  WS_CONNECTION_AUTH_ERROR,
  WS_CONNECTION_AUTH_START,
  WS_CONNECTION_AUTH_SUCCESS,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_AUTH_MESSAGE,
  WS_GET_MESSAGE,
} from './services/actions/web-socket';

import { socketMiddleware } from './services/middleware';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
    
    const wsActions = {
      wsInit: WS_CONNECTION_START,
      onOpen: WS_CONNECTION_SUCCESS,
      onClose: WS_CONNECTION_CLOSED,
      onError: WS_CONNECTION_ERROR,
      onMessage: WS_GET_MESSAGE,
      wsClose: WS_CONNECTION_CLOSE,
    };

    
    const wsAuthActions = {
      wsInit: WS_CONNECTION_AUTH_START,
      onOpen: WS_CONNECTION_AUTH_SUCCESS,
      onClose: WS_CONNECTION_AUTH_CLOSED,
      onError: WS_CONNECTION_AUTH_ERROR,
      onMessage: WS_GET_AUTH_MESSAGE,
      wsClose: WS_CONNECTION_AUTH_CLOSE,
    };

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions), socketMiddleware(wsAuthActions)));

export const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
