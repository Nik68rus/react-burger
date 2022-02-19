export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';

export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' =
'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' =
'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';

export const WS_CONNECTION_AUTH_START: 'WS_CONNECTION_AUTH_START' = 'WS_CONNECTION_AUTH_START';
export const WS_CONNECTION_AUTH_CLOSE: 'WS_CONNECTION_AUTH_CLOSE' = 'WS_CONNECTION_AUTH_CLOSE';

export const WS_CONNECTION_AUTH_SUCCESS: 'WS_CONNECTION_AUTH_SUCCESS' =
'WS_CONNECTION_AUTH_SUCCESS';
export const WS_CONNECTION_AUTH_ERROR: 'WS_CONNECTION_AUTH_ERROR' = 'WS_CONNECTION_AUTH_ERROR';
export const WS_CONNECTION_AUTH_CLOSED: 'WS_CONNECTION_AUTH_CLOSED' =
'WS_CONNECTION_AUTH_CLOSED';
export const WS_GET_AUTH_MESSAGE: 'WS_GET_AUTH_MESSAGE' = 'WS_GET_AUTH_MESSAGE';

interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

interface IWSConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE;
}

interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any;
}

interface IWSConnectionAuthStartAction {
  readonly type: typeof WS_CONNECTION_AUTH_START;
  readonly payload: string;
}

interface IWSConnectionAuthCloseAction {
  readonly type: typeof WS_CONNECTION_AUTH_CLOSE;
}

interface IWSConnectionAuthSuccessAction {
  readonly type: typeof WS_CONNECTION_AUTH_SUCCESS;
}

interface IWSConnectionAuthErrorAction {
  readonly type: typeof WS_CONNECTION_AUTH_ERROR;
}

interface IWSConnectionAuthClosedAction {
  readonly type: typeof WS_CONNECTION_AUTH_CLOSED;
}

interface IWSGetAuthMessageAction {
  readonly type: typeof WS_GET_AUTH_MESSAGE;
  readonly payload: any;
}

export const wsConnectionStart = (url: string): IWSConnectionStartAction => {  
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
};

export const wsConnectionClose = (): IWSConnectionCloseAction => {  
  return {
    type: WS_CONNECTION_CLOSE,
  };
};

export const wsConnectionSuccess = (): IWSConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): IWSConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = (): IWSConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (message: any): IWSGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};

export const wsConnectionAuthStart = (url: string): IWSConnectionAuthStartAction => {  
  return {
    type: WS_CONNECTION_AUTH_START,
    payload: url,
  };
};

export const wsConnectionAuthClose = (): IWSConnectionAuthCloseAction => {  
  return {
    type: WS_CONNECTION_AUTH_CLOSE,
  };
};

export const wsConnectionAuthSuccess = (): IWSConnectionAuthSuccessAction => {
  return {
    type: WS_CONNECTION_AUTH_SUCCESS,
  };
};

export const wsConnectionAuthError = (): IWSConnectionAuthErrorAction => {
  return {
    type: WS_CONNECTION_AUTH_ERROR,
  };
};

export const wsConnectionAuthClosed = (): IWSConnectionAuthClosedAction => {
  return {
    type: WS_CONNECTION_AUTH_CLOSED,
  };
};

export const wsGetAuthMessage = (message: any): IWSGetAuthMessageAction => {
  return {
    type: WS_GET_AUTH_MESSAGE,
    payload: message,
  };
};

export type TWSActions =
  | IWSConnectionStartAction
  | IWSConnectionCloseAction
  | IWSConnectionSuccessAction
  | IWSConnectionClosedAction
  | IWSConnectionErrorAction
  | IWSGetMessageAction
  | IWSConnectionAuthStartAction
  | IWSConnectionAuthSuccessAction
  | IWSConnectionAuthClosedAction
  | IWSConnectionAuthErrorAction
  | IWSGetAuthMessageAction;
