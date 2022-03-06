import { ingredientReducer as reducer } from './ingredient';
import * as types from '../actions/ingredient';
import { ingredientMock, ingredientMockNotBun } from '../../utils/mock';

const initialState = {
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

describe('ingredient reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(
      reducer(initialState, { type: types.GET_INGREDIENTS_REQUEST })
    ).toEqual({
      ...initialState,
      ingredientsRequest: true,
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(
      reducer(
        {
          list: [],
          ingredientsRequest: true,
          ingredientsFailed: false,
          ingredientsLoaded: false,

          cart: [],
          currentIngredient: {},

          order: {},
          orderRequest: false,
          orderFailed: false,
        },
        { type: types.GET_INGREDIENTS_SUCCESS, payload: [ingredientMock] }
      )
    ).toEqual({
      list: [ingredientMock],
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsLoaded: true,

      cart: [],
      currentIngredient: {},

      order: {},
      orderRequest: false,
      orderFailed: false,
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(
      reducer(
        {
          list: [],
          ingredientsRequest: true,
          ingredientsFailed: false,
          ingredientsLoaded: false,

          cart: [],
          currentIngredient: {},

          order: {},
          orderRequest: false,
          orderFailed: false,
        },
        { type: types.GET_INGREDIENTS_FAILED }
      )
    ).toEqual({
      list: [],
      ingredientsRequest: false,
      ingredientsFailed: true,
      ingredientsLoaded: false,

      cart: [],
      currentIngredient: {},

      order: {},
      orderRequest: false,
      orderFailed: false,
    });
  });

  it('should handle  SET_CART', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CART,
        payload: [ingredientMock, ingredientMock],
      })
    ).toEqual({
      ...initialState,
      cart: [ingredientMock, ingredientMock],
    });
  });

  it('should handle  RESET_CART', () => {
    expect(
      reducer(
        {
          list: [],
          ingredientsRequest: false,
          ingredientsFailed: false,
          ingredientsLoaded: false,

          cart: [ingredientMock, ingredientMock],
          currentIngredient: {},

          order: {},
          orderRequest: false,
          orderFailed: false,
        },
        { type: types.RESET_CART }
      )
    ).toEqual({
      list: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsLoaded: false,

      cart: [],
      currentIngredient: {},

      order: {},
      orderRequest: false,
      orderFailed: false,
    });
  });

  it('should handle ADD_TO_CART', () => {
    expect(
      reducer(
        {
          list: [],
          ingredientsRequest: false,
          ingredientsFailed: false,
          ingredientsLoaded: false,

          cart: [ingredientMock, ingredientMockNotBun],
          currentIngredient: {},

          order: {},
          orderRequest: false,
          orderFailed: false,
        },
        { type: types.ADD_TO_CART, payload: ingredientMock }
      )
    ).toEqual({
      list: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsLoaded: false,

      cart: [ingredientMock, ingredientMockNotBun],
      currentIngredient: {},

      order: {},
      orderRequest: false,
      orderFailed: false,
    });

    expect(
      reducer(
        {
          list: [],
          ingredientsRequest: false,
          ingredientsFailed: false,
          ingredientsLoaded: false,

          cart: [ingredientMock, ingredientMockNotBun],
          currentIngredient: {},

          order: {},
          orderRequest: false,
          orderFailed: false,
        },
        { type: types.ADD_TO_CART, payload: ingredientMockNotBun }
      )
    ).toEqual({
      list: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsLoaded: false,

      cart: [ingredientMock, ingredientMockNotBun, ingredientMockNotBun],
      currentIngredient: {},

      order: {},
      orderRequest: false,
      orderFailed: false,
    });
  });

  it('should handle REMOVE_FROM_CART', () => {
    expect(
      reducer(
        {
          list: [],
          ingredientsRequest: false,
          ingredientsFailed: false,
          ingredientsLoaded: false,

          cart: [ingredientMock, ingredientMockNotBun, ingredientMock],
          currentIngredient: {},

          order: {},
          orderRequest: false,
          orderFailed: false,
        },
        { type: types.REMOVE_FROM_CART, payload: 1 }
      )
    ).toEqual({
      list: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsLoaded: false,

      cart: [ingredientMock, ingredientMock],
      currentIngredient: {},

      order: {},
      orderRequest: false,
      orderFailed: false,
    });
  });

  it('should handle  SET_INGREDIENT', () => {
    expect(
      reducer(initialState, {
        type: types.SET_INGREDIENT,
        payload: ingredientMock,
      })
    ).toEqual({
      ...initialState,
      currentIngredient: ingredientMock,
    });
  });

  it('should handle  REMOVE_INGREDIENT', () => {
    expect(
      reducer(
        {
          list: [],
          ingredientsRequest: false,
          ingredientsFailed: false,
          ingredientsLoaded: false,

          cart: [],
          currentIngredient: ingredientMock,

          order: {},
          orderRequest: false,
          orderFailed: false,
        },
        {
          type: types.REMOVE_INGREDIENT,
        }
      )
    ).toEqual({
      list: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsLoaded: false,

      cart: [],
      currentIngredient: {},

      order: {},
      orderRequest: false,
      orderFailed: false,
    });
  });

  it('should handle ORDER_REQUEST', () => {
    expect(reducer(initialState, { type: types.ORDER_REQUEST })).toEqual({
      ...initialState,
      orderRequest: true,
    });
  });

  it('should handle ORDER_SUCCESS', () => {
    expect(
      reducer(
        {
          list: [],
          ingredientsRequest: false,
          ingredientsFailed: false,
          ingredientsLoaded: false,

          cart: [],
          currentIngredient: {},

          order: {},
          orderRequest: true,
          orderFailed: false,
        },
        { type: types.ORDER_SUCCESS, payload: { ingredients: ['id1', 'id2'] } }
      )
    ).toEqual({
      list: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsLoaded: false,

      cart: [],
      currentIngredient: {},

      order: { ingredients: ['id1', 'id2'] },
      orderRequest: false,
      orderFailed: false,
    });
  });

  it('should handle ORDER_FAILED', () => {
    expect(
      reducer(
        {
          list: [],
          ingredientsRequest: false,
          ingredientsFailed: false,
          ingredientsLoaded: false,

          cart: [],
          currentIngredient: {},

          order: {},
          orderRequest: true,
          orderFailed: false,
        },
        { type: types.ORDER_FAILED }
      )
    ).toEqual({
      list: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsLoaded: false,

      cart: [],
      currentIngredient: {},

      order: {},
      orderRequest: false,
      orderFailed: true,
    });
  });

  it('should handle ORDER_RESET', () => {
    expect(
      reducer(
        {
          list: [],
          ingredientsRequest: false,
          ingredientsFailed: false,
          ingredientsLoaded: false,

          cart: [],
          currentIngredient: {},

          order: { ingredients: ['id1', 'id2'] },
          orderRequest: true,
          orderFailed: false,
        },
        { type: types.ORDER_RESET }
      )
    ).toEqual({
      list: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsLoaded: false,

      cart: [],
      currentIngredient: {},

      order: {},
      orderRequest: false,
      orderFailed: false,
    });
  });
});
