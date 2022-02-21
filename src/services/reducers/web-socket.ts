import { TWSActions } from './../actions/web-socket';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_AUTH_CLOSED,
  WS_CONNECTION_AUTH_ERROR,
  WS_CONNECTION_AUTH_SUCCESS,
  WS_GET_AUTH_MESSAGE,
} from '../actions/web-socket';

type TWSState = {
  wsConnected: boolean;
  wsAuthConnected: boolean;
  feed: any;
  orderHistory: any;
};

const initialState: TWSState = {
  wsConnected: false,
  wsAuthConnected: false,
  feed: {},
  orderHistory: {},
};

const wsReducer = (state = initialState, action: TWSActions) => {

  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        feed: action.payload,
      };

    case WS_CONNECTION_AUTH_SUCCESS:
      return {
        ...state,
        wsAuthConnected: true,
      };

    case WS_CONNECTION_AUTH_ERROR:
      return {
        ...state,
        wsAuthConnected: false,
      };

    case WS_CONNECTION_AUTH_CLOSED:
      return {
        ...state,
        wsAuthConnected: false,
      };

    case WS_GET_AUTH_MESSAGE:
      return {
        ...state,
        orderHistory: action.payload,
      };

    default:
      return state;
  }
};

export { wsReducer };
