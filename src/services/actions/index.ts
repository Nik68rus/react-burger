import type { TItem, TUserData } from './../../types/index';

import {
  SET_ERROR,
  SET_MESSAGE,
  SHOW_LOADER,
  HIDE_LOADER,
  LOCK_CONSTRUCTOR,
  UNLOCK_CONSTRUCTOR,
} from './app';

import type {
  IShowLoaderAction,
  IHideLoaderAction,
  IUnlockConstructorAction,
  ILockConstructorAction,
  ISetErrorAction,
  ISetMessageAction,
} from './app';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CART,
  RESET_CART,
  SET_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILED,
  ORDER_RESET,
} from './ingredient';

import type {
  IGetIngredientsRequestAction,
  IGetIngredientsSuccessAction,
  IGetIngredientsFailedAction,
  ISetCartAction,
  IResetCartAction,
  ISetIngredientAction,
  IRemoveIngredientAction,
  IAddToCartAction,
  IRemoveFromCartAction,
  IOrderRequestAction,
  IOrderSuccessAction,
  IOrderFailedAction,
  IOrderResetAction,
} from './ingredient';

import {
  SIGN_IN,
  SIGN_OUT,
  REQUEST_RECOVERY,
  RECOVERY_SUCCESS,
  REGISTRATION_SUCCESS,
} from './user';

import type {
  ISignInAction,
  ISignOutAction,
  IRequestRecoveryAction,
  IRecoverySuccessAction,
  IRegistrationSuccessAction,
} from './user';

export const showLoader = (): IShowLoaderAction => {
  return {
    type: SHOW_LOADER,
  };
};

export const hideLoader = (): IHideLoaderAction => {
  return {
    type: HIDE_LOADER,
  };
};

export const lockConstructor = (): ILockConstructorAction => {
  return {
    type: LOCK_CONSTRUCTOR,
  };
};

export const unlockConstructor = (): IUnlockConstructorAction => {
  return {
    type: UNLOCK_CONSTRUCTOR,
  };
};

export const setError = (): ISetErrorAction => {
  return {
    type: SET_ERROR,
  };
};

export const setMessage = (data: string): ISetMessageAction => {
  return {
    type: SET_MESSAGE,
    payload: data,
  };
};

export const getIngredientsRequest = (): IGetIngredientsRequestAction => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
};

export const getIngredientsSuccess = (
  data: ReadonlyArray<TItem>
): IGetIngredientsSuccessAction => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload: data,
  };
};

export const getIngredientsFailed = (): IGetIngredientsFailedAction => {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
};

export const setCart = (data: ReadonlyArray<TItem>): ISetCartAction => {
  return {
    type: SET_CART,
    payload: data,
  };
};

export const resetCart = (): IResetCartAction => {
  return {
    type: RESET_CART,
  };
};

export const setIngredient = (data: TItem): ISetIngredientAction => {
  return {
    type: SET_INGREDIENT,
    payload: data,
  };
};

export const removeIngredient = (): IRemoveIngredientAction => {
  return {
    type: REMOVE_INGREDIENT,
  };
};

export const addToCart = (data: TItem): IAddToCartAction => {
  return {
    type: ADD_TO_CART,
    payload: data,
  };
};

export const removeFromCart = (data: number): IRemoveFromCartAction => {
  return {
    type: REMOVE_FROM_CART,
    payload: data,
  };
};

export const orderRequest = (): IOrderRequestAction => {
  return {
    type: ORDER_REQUEST,
  };
};

export const orderSuccess = (data: string): IOrderSuccessAction => {
  return {
    type: ORDER_SUCCESS,
    payload: data,
  };
};

export const orderFailed = (): IOrderFailedAction => {
  return {
    type: ORDER_FAILED,
  };
};

export const orderReset = (): IOrderResetAction => {
  return {
    type: ORDER_RESET,
  };
};

export const signIn = (data: TUserData): ISignInAction => {
  return {
    type: SIGN_IN,
    payload: data,
  };
};

export const signOut = (): ISignOutAction => {
  return {
    type: SIGN_OUT,
  };
};

export const requestRecovery = (): IRequestRecoveryAction => {
  return {
    type: REQUEST_RECOVERY,
  };
};

export const recoverySuccess = (): IRecoverySuccessAction => {
  return {
    type: RECOVERY_SUCCESS,
  };
};

export const registrationSuccess = (): IRegistrationSuccessAction => {
  return {
    type: REGISTRATION_SUCCESS,
  };
};
