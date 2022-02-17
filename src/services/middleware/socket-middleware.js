import { getCookie } from "../../utils/cookies";

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;
    let authSocket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsAuthInit, onAuthOpen, onAuthClose, onAuthError, onAuthMessage } = wsActions;
      const {isAuthorized} = getState().user;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === wsAuthInit && isAuthorized) {
        const token = getCookie('token');
        authSocket = new WebSocket(`${wsUrl}?token=${token}`);
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

      if (authSocket) {
        authSocket.onopen = event => {
          dispatch({ type: onAuthOpen, payload: event });
        };
        
        authSocket.onerror = event => {
          dispatch({ type: onAuthError, payload: event });
        };
        
        authSocket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onAuthMessage, payload: restParsedData });
        };

        authSocket.onclose = event => {
          dispatch({ type: onAuthClose, payload: event });
        };
      }


      next(action);
    };
  };
};