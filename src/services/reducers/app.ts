import type { TAppActions } from '../actions/app';
import { SET_ERROR, SET_MESSAGE, SHOW_LOADER, HIDE_LOADER } from "../actions/app"

type TAppState = {
  error: boolean;
  loader: boolean;
  message: string;
};

const initialState: TAppState = {
  error: false,
  loader: false,
  message: '',
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
    default: {
      return state;
    }
  }
}

export {appReducer};