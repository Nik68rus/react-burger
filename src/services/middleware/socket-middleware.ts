import { AppDispatchActions, RootState } from './../../types/index';
import type { TApplicationActions } from "../../types";
import {Middleware, MiddlewareAPI} from 'redux';

export const socketMiddleware = (wsActions: any): Middleware => {
  return (store: MiddlewareAPI<AppDispatchActions, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        //@ts-ignore
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };
        
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };
        
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};