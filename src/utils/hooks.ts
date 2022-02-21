import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from 'react-redux';
import { RootState, AppDispatch } from '../types';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();