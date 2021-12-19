import {combineReducers} from 'redux';
import {ingredientReducer} from './ingredient';
import {appReducer} from './app';

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  app: appReducer,
})