import {
  SET_ERROR, 
  SET_MESSAGE, 
  SHOW_LOADER, 
  HIDE_LOADER
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

import {
  SIGN_IN,
  SIGN_OUT,
  REQUEST_RECOVERY,
  RECOVERY_SUCCESS,
  REGISTRATION_SUCCESS,
} from './user';

export const showLoader = () => {
  return {
    type: SHOW_LOADER
  }
}

export const hideLoader = () => {
  return {
    type: HIDE_LOADER
  }
}

export const setError = () => {
  return {
    type: SET_ERROR,
  }
}

export const setMessage = (data) => {
  return {
    type: SET_MESSAGE,
    payload: data,
  }
}

export const getIngredientsRequest = () => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  }
}

export const getIngredientsSuccess = (data) => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload: data,
  }
}

export const getIngredientsFailed = () => {
  return {
    type: GET_INGREDIENTS_FAILED,
  }
}

export const setCart = (data) => {
  return {
    type: SET_CART,
    payload: data,
  }
}

export const resetCart = () => {
  return {
    type: RESET_CART,
  }
}

export const setIngredient = (data) => {
  return {
    type: SET_INGREDIENT,
    payload: data,
  }
}

export const removeIngredient = () => {
  return {
    type: REMOVE_INGREDIENT,
  }
}

export const addToCart = (data) => {
  return {
    type: ADD_TO_CART,
    payload: data,
  }
}

export const removeFromCart = (data) => {
  return {
    type: REMOVE_FROM_CART,
    payload: data,
  }
}

export const orderRequest = () => {
  return {
    type: ORDER_REQUEST,
  }
}

export const orderSuccess = (data) => {
  return {
    type: ORDER_SUCCESS,
    payload: data,
  }
}

export const orderFailed = () => {
  return {
    type: ORDER_FAILED,
  }
}

export const orderReset = () => {
  return {
    type: ORDER_RESET,
  }
}

export const signIn = (data) => {
  return {
    type: SIGN_IN,
    payload: data,
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT,
  }
}

export const requestRecovery = () => {
  return {
    type: REQUEST_RECOVERY,
  }
}

export const recoverySuccess = () => {
  return {
    type: RECOVERY_SUCCESS,
  }
}

export const registrationSuccess = () => {
  return {
    type: REGISTRATION_SUCCESS,
  }
}

