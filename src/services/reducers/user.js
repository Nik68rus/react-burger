import {
  SIGN_IN,
  SIGN_OUT,
  REQUEST_RECOVERY,
  RECOVERY_SUCCESS,
  REGISTRATION_SUCCESS
} from '../actions/user';

const initialState = {
  isAuthorized: false,
  recoveryRequested: false,
  recoveryDone: false,
  justRegistered: false,
  name: '',
  email: '',
  password: ''
};

const userReducer = (state = initialState, action) => {
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
