import { setMessage } from '.';
import { AppDispatch, AppThunk } from '../../types';

export const SET_ERROR: 'SET_ERROR' = 'SET_ERROR';
export const SET_MESSAGE: 'SET_MESSAGE' = 'SET_MESSAGE';
export const SHOW_LOADER: 'SHOW_LOADER' = 'SHOW_LOADER';
export const HIDE_LOADER: 'HIDE_LOADER' = 'HIDE_LOADER';
export const LOCK_CONSTRUCTOR: 'LOCK_CONSTRUCTOR' = 'LOCK_CONSTRUCTOR';
export const UNLOCK_CONSTRUCTOR: 'UNLOCK_CONSTRUCTOR' = 'UNLOCK_CONSTRUCTOR';

export interface IShowLoaderAction {
  readonly type: typeof SHOW_LOADER;
}

export interface IHideLoaderAction {
  readonly type: typeof HIDE_LOADER;
}

export interface ILockConstructorAction {
  readonly type: typeof LOCK_CONSTRUCTOR;
}

export interface IUnlockConstructorAction {
  readonly type: typeof UNLOCK_CONSTRUCTOR;
}

export interface ISetErrorAction {
  readonly type: typeof SET_ERROR;
}

export interface ISetMessageAction {
  readonly type: typeof SET_MESSAGE;
  readonly payload: string;
}

export type TAppActions =
  | IShowLoaderAction
  | IHideLoaderAction
  | ISetErrorAction
  | ISetMessageAction
  | ILockConstructorAction
  |IUnlockConstructorAction;

export const showNotification: AppThunk = (message: string, duration: number = 3000) => (dispatch: AppDispatch) => {
  dispatch(setMessage(message));
  setTimeout(() => {
    dispatch(setMessage(''));
  }, duration);
};
