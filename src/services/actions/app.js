export const SET_ERROR = 'SET_ERROR';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';

export const showNotification = (message, duration = 3000) => {
  return (dispatch) => {
    dispatch({type: SET_MESSAGE, payload: message});
    setTimeout(() => {
      dispatch({type: SET_MESSAGE, payload: ''});
    }, duration);
  }
};