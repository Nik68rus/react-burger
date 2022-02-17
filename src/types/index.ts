import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import {store} from '../index';
import type { TAppActions } from '../services/actions/app';
import type { TUserActions } from '../services/actions/user';
import type { TIngredientActions } from '../services/actions/ingredient';

export type TItem = {
  _id: string,
  name: string,
  type: TItemType,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
};

export type TItemType = 'bun' | 'sauce' | 'main';

export type TTab = {
  id: TItemType,
  title: string,
}

export type TOrder = {
  ingredients: string[];
};

export type TUserData = {
  email: string;
  password: string;
}

export type TResetData = {
  password: string;
  code: string;
}

export type TRegistrationData = {
  name: string;
  email: string;
  password: string;
};

export type TFeedItem = {
  _id: string;
  ingredients: string[];
  status: "created" | "pending" | "done";
  name: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
};

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TAppActions | TUserActions | TIngredientActions;


export type AppThunk<ReturnType = void> = ActionCreator<
ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch | AppThunk;