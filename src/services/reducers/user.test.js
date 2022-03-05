import { userReducer as reducer } from './user';
import * as types from '../actions/user';
import { userMock } from '../../utils/mock';

const initialState = {
  isAuthorized: false,
  recoveryRequested: false,
  recoveryDone: false,
  justRegistered: false,
  name: '',
  email: '',
  password: '',
};

describe('user reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SIGN_IN', () => {
    expect(
      reducer(initialState, { type: types.SIGN_IN, payload: userMock })
    ).toEqual({
      ...initialState,
      isAuthorized: true,
      email: 'test@test.ru',
      password: 'test',
    });
  });

  it('should handle SIGN_OUT', () => {
    expect(
      reducer(
        {
          isAuthorized: false,
          recoveryRequested: false,
          recoveryDone: false,
          justRegistered: false,
          name: 'Test',
          email: 'test@test.test',
          password: '',
        },
        { type: types.SIGN_OUT }
      )
    ).toEqual(initialState);
  });

  it('should handle REQUEST_RECOVERY', () => {
    expect(reducer(initialState, { type: types.REQUEST_RECOVERY })).toEqual({
      ...initialState,
      recoveryRequested: true,
    });
  });

  it('should handle RECOVERY_SUCCESS', () => {
    expect(reducer(initialState, { type: types.RECOVERY_SUCCESS })).toEqual({
      ...initialState,
      recoveryRequested: false,
      recoveryDone: true,
    });
  });

  it('should handle REGISTRATION_SUCCESS', () => {
    expect(reducer(initialState, { type: types.REGISTRATION_SUCCESS })).toEqual(
      { ...initialState, justRegistered: true }
    );
  });
});
