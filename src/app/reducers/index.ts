import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { CategoryReducer } from './category.reducer';
import { RecipeReducer } from './recipes.reducer';

export interface State {
  categories: CategoryReducer.State;
  recipes: RecipeReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  categories: CategoryReducer.reducer,
  recipes: RecipeReducer.reducer,
};

export const selectCategoryState = (state: State) => state.categories;

export const selectCategoryEntities = createSelector(
  selectCategoryState,
  CategoryReducer.selectCategoryEntities
);

export const selectAllCategories = createSelector(
  selectCategoryState,
  CategoryReducer.selectAllCategories
);

export const selectCategorySelectedId = createSelector(
  selectCategoryState,
  CategoryReducer.selectedId
);

export const selectSelectedCategory = createSelector(
  selectCategoryEntities,
  selectCategorySelectedId,
  (entities, id) => entities[id]
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
