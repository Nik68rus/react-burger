import {
  SIGN_IN,
  SIGN_OUT,
  REQUEST_RECOVERY,
  RECOVERY_SUCCESS,
  REGISTRATION_SUCCESS,
} from '../actions/user';

import type {
  TUserActions
} from '../actions/user';

type TUserState = {
  isAuthorized: boolean;
  recoveryRequested: boolean;
  recoveryDone: boolean;
  justRegistered: boolean;
  name: string;
  email: string;
  password: string;
};

const initialState: TUserState = {
  isAuthorized: false,
  recoveryRequested: false,
  recoveryDone: false,
  justRegistered: false,
  name: '',
  email: '',
  password: ''
};

const userReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        isAuthorized: true,
        ...action.payload
      };
    }
    case SIGN_OUT: {
      return {
        ...initialState,
      };
    }
    case REQUEST_RECOVERY: {
      return {
        ...state,
        recoveryRequested: true,
      }
    }
    case RECOVERY_SUCCESS: {
      return {
        ...state,
        recoveryRequested: false,
        recoveryDone: true,
      }
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        justRegistered: true,
      }
    }
    default: {
      return state;
    }
  }
};

export { userReducer };
