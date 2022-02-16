import type { TItem, TOrder } from './../../types/index';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CART,
  RESET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_INGREDIENT,
  REMOVE_INGREDIENT,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILED,
  ORDER_RESET,
} from '../actions/ingredient';

import type {
  TIngredientActions
} from '../actions/ingredient';

type TIngridientState = {
  list: ReadonlyArray<TItem>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsLoaded: boolean;

  cart: ReadonlyArray<TItem>;
  currentIngredient: TItem | {};

  order: TOrder | {};
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: TIngridientState = {
  list: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsLoaded: false,

  cart: [],
  currentIngredient: {},

  order: {},
  orderRequest: false,
  orderFailed: false,
};

const ingredientReducer = (state = initialState, action: TIngredientActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredientsLoaded: true,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case SET_CART: {
      return {
        ...state,
        cart: action.payload,
      };
    }
    case RESET_CART: {
      return {
        ...state,
        cart: [],
      };
    }
    case ADD_TO_CART: {
      if (action.payload.type === 'bun' && state.cart.findIndex(item => item.type === 'bun') >= 0) {
        const newCart = state.cart.map(item => item.type === 'bun' ? action.payload : item);

        return {
          ...state,
          cart: newCart,
        }
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item, index) => index !== action.payload),
      }
    }
    case SET_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        currentIngredient: {},
      };
    }
    case ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        order: action.payload,
      };
    }
    case ORDER_RESET: {
      return {
        ...state,
        order: {},
        orderRequest: false,
        orderFailed: false,      
      }
    }
    default: {
      return state;
    }
  }
};

export { ingredientReducer };
