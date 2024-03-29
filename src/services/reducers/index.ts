import {combineReducers} from 'redux';
import {ingredientReducer} from './ingredient';
import {appReducer} from './app';
import { userReducer } from './user';
import {wsReducer} from './web-socket';

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  app: appReducer,
  user: userReducer,
  ws: wsReducer,
})