import { getCookie } from '../../utils/cookies';
import { URL } from '../../utils/data';
import {
  getIngredientsFailed,
  getIngredientsRequest,
  getIngredientsSuccess,
  hideLoader,
  orderFailed,
  orderRequest,
  orderSuccess,
  resetCart,
  setError,
  setMessage,
  showLoader,
} from '.';

import { showNotification } from './app';
import type { AppDispatch, AppThunk, TItem, TOrder } from '../../types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDENTS_REQUEST' =
  'GET_INGREDENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDENTS_SUCCESS' =
  'GET_INGREDENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDENTS_FAILED' =
  'GET_INGREDENTS_FAILED';

export const SET_CART: 'SET_CART' = 'SET_CART';
export const RESET_CART: 'RESET_CART' = 'RESET_CART';

export const SET_INGREDIENT: 'SET_INGREDIENT' = 'SET_INGREDIENT';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';

export const ADD_TO_CART: 'ADD_TO_CART' = 'ADD_TO_CART';
export const REMOVE_FROM_CART: 'REMOVE_FROM_CART' = 'REMOVE_FROM_CART';

export const ORDER_REQUEST: 'ORDER_REQUEST' = 'ORDER_REQUEST';
export const ORDER_SUCCESS: 'ORDER_SUCCESS' = 'ORDER_SUCCESS';
export const ORDER_FAILED: 'ORDER_FAILED' = 'ORDER_FAILED';

export const ORDER_RESET: 'ORDER_RESET' = 'ORDER_RESET';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: ReadonlyArray<TItem>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface ISetCartAction {
  readonly type: typeof SET_CART;
  readonly payload: ReadonlyArray<TItem>;
}

export interface IResetCartAction {
  readonly type: typeof RESET_CART;
}

export interface ISetIngredientAction {
  readonly type: typeof SET_INGREDIENT;
  readonly payload: TItem;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
}

export interface IAddToCartAction {
  readonly type: typeof ADD_TO_CART;
  readonly payload: TItem;
}

export interface IRemoveFromCartAction {
  readonly type: typeof REMOVE_FROM_CART;
  readonly payload: number;
}

export interface IOrderRequestAction {
  readonly type: typeof ORDER_REQUEST;
}

export interface IOrderResetAction {
  readonly type: typeof ORDER_RESET;
}

export interface IOrderSuccessAction {
  readonly type: typeof ORDER_SUCCESS;
  readonly payload: string;
}

export interface IOrderFailedAction {
  readonly type: typeof ORDER_FAILED;
}

export type TIngredientActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | ISetCartAction
  | IResetCartAction
  | ISetIngredientAction
  | IRemoveIngredientAction
  | IAddToCartAction
  | IRemoveFromCartAction
  | IOrderRequestAction
  | IOrderResetAction
  | IOrderSuccessAction
  | IOrderFailedAction;

export const getInredients: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequest());
    fetch(`${URL}/ingredients`)
      .then((response) => {
        if (!response.ok) {
          dispatch(setError());
          dispatch(
            setMessage(
              `Что-то пошло не так, попробуйте позже! (${response.status})`
            )
          );
          throw new Error(
            `Что-то пошло не так, попробуйте позже! (${response.status})`
          );
        }
        return response.json();
      })
      .then((data) => {
        dispatch(getIngredientsSuccess(data.data));
      })
      .catch((err) => {
        dispatch(getIngredientsFailed());
        dispatch(setError());
        dispatch(setMessage(`Что-то пошло не так, попробуйте позже!`));
      });
  };
};

export const makeOrder: AppThunk = (data: TOrder) => {
  return (dispatch: AppDispatch) => {
    dispatch(orderRequest());
    dispatch(
      showNotification('Мы обрабатываем ваш заказ. Пожалуйста подождите!')
    );
    dispatch(showLoader());
    fetch(`${URL}/orders`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token'),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(orderFailed());
          dispatch(
            setMessage(
              `Что-то пошло не так, попробуйте позже! (${response.status})`
            )
          );
          throw new Error(
            `Что-то пошло не так, попробуйте позже! (${response.status})`
          );
        }
        return response.json();
      })
      .then((data) => {
        dispatch(orderSuccess(data));
        dispatch(resetCart());
      })
      .catch((err) => {
        dispatch(orderFailed());
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  };
};
