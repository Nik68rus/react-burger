import type { TAppActions } from '../actions/app';
import { SET_ERROR, SET_MESSAGE, SHOW_LOADER, HIDE_LOADER, LOCK_CONSTRUCTOR, UNLOCK_CONSTRUCTOR } from "../actions/app"

type TAppState = {
  error: boolean;
  loader: boolean;
  message: string;
  locked: boolean;
};

const initialState: TAppState = {
  error: false,
  loader: false,
  message: '',
  locked: false,
}

const appReducer = (state = initialState, action: TAppActions) => {
  switch (action.type) {
    case SET_ERROR: {
      return {
        ...state,
        error: true,
      }
    }
    case SET_MESSAGE: {
      return {
        ...state,
        message: action.payload,
      }
    }
    case SHOW_LOADER: {
      return {
        ...state,
        loader: true,
      }
    }
    case HIDE_LOADER: {
      return {
        ...state,
        loader: false,
      }
    }
    case LOCK_CONSTRUCTOR: {
      return {
        ...state,
        locked: true,
      }
    }
    case UNLOCK_CONSTRUCTOR: {
      return {
        ...state,
        locked: false,
      }
    }
    default: {
      return state;
    }
  }
}

export {appReducer};