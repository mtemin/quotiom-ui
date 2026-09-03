import { createReducer, on } from '@ngrx/store';
import { setCurrentCategory } from './currentCategory.actions';
import { Category } from '../../models/Category';

export const initialState = "";

export const currentCategoryReducer = createReducer(
  initialState,
  on(setCurrentCategory, (state:string, { category }) => category)
);
