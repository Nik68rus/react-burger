import { getCookie } from '../../utils/cookies';
import {URL} from '../../utils/data';

import { HIDE_LOADER, SET_ERROR, SET_MESSAGE, showNotification, SHOW_LOADER } from './app';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDENTS_FAILED';

export const SET_CART = 'SET_CART';
export const RESET_CART = 'RESET_CART';

export const SET_INGREDIENT = 'SET_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';

export const ORDER_RESET = 'ORDER_RESET';

export const getInredients = () => {
  return (dispatch) => {
    dispatch({type: GET_INGREDIENTS_REQUEST});
    fetch(`${URL}/ingredients`)
    .then((response) => {
      if (!response.ok) {
        dispatch({type: SET_ERROR});
        dispatch({type: SET_MESSAGE, payload: `Что-то пошло не так, попробуйте позже! (${response.status})`})
        throw new Error(
          `Что-то пошло не так, попробуйте позже! (${response.status})`
        );
      }
      return response.json();
    })
    .then((data) => {
      dispatch({type: GET_INGREDIENTS_SUCCESS, payload: data.data});
    })
    .catch((err) => {
      dispatch({type: GET_INGREDIENTS_FAILED})
      dispatch({type: SET_ERROR});
      dispatch({type: SET_MESSAGE, payload: `Что-то пошло не так, попробуйте позже!`})
    });

  }
}

export const makeOrder = (data) => {
  return (dispatch) => {
    dispatch({type: ORDER_REQUEST});
    dispatch(showNotification('Мы обрабатываем ваш заказ. Пожалуйста подождите!'));
    dispatch({type: SHOW_LOADER});
    fetch(`${URL}/orders`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        dispatch({type: ORDER_FAILED});
        dispatch({type: SET_MESSAGE, payload: `Что-то пошло не так, попробуйте позже! (${response.status})`});
        throw new Error(
          `Что-то пошло не так, попробуйте позже! (${response.status})`
          );
        }
        return response.json();
      })
    .then((data) => {
      dispatch({type: ORDER_SUCCESS, payload: data});
      dispatch({type: RESET_CART});
    })
    .catch((err) => {
      dispatch({type: ORDER_FAILED});
    }).finally(() => {
      dispatch({type: HIDE_LOADER});
    });
  }
}