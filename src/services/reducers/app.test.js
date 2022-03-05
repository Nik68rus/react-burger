import { appReducer as reducer } from './app';
import * as types from '../actions/app';

const initialState = {
  error: false,
  loader: false,
  message: '',
  locked: false,
};

describe('app reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_ERROR', () => {
    expect(reducer(initialState, { type: types.SET_ERROR })).toEqual({
      ...initialState,
      error: true,
    });
  });

  it('should handle SHOW_LOADER', () => {
    expect(reducer(initialState, { type: types.SHOW_LOADER })).toEqual({
      ...initialState,
      loader: true,
    });
  });

  it('should handle HIDE_LOADER', () => {
    expect(
      reducer(
        {
          error: false,
          loader: true,
          message: '',
          locked: false,
        },
        { type: types.HIDE_LOADER }
      )
    ).toEqual({ error: false, loader: false, message: '', locked: false });
  });

  it('should handle SET_MESSAGE', () => {
    expect(
      reducer(initialState, {
        type: types.SET_MESSAGE,
        payload: 'Test message',
      })
    ).toEqual({
      ...initialState,
      message: 'Test message',
    });
  });

  it('should handle LOCK_CONSTRUCTOR', () => {
    expect(reducer(initialState, { type: types.LOCK_CONSTRUCTOR })).toEqual({
      ...initialState,
      locked: true,
    });
  });

  it('should handle UNLOCK_CONSTRUCTOR', () => {
    expect(
      reducer(
        {
          error: false,
          loader: true,
          message: '',
          locked: true,
        },
        { type: types.UNLOCK_CONSTRUCTOR }
      )
    ).toEqual({
      error: false,
      loader: true,
      message: '',
      locked: false,
    });
  });
});
