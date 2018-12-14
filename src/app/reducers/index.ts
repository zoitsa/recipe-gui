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


// ---- Primary Category Selectors ----- //

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
  CategoryReducer.selectedCategoryId
);

export const selectSelectedCategory = createSelector(
  selectCategoryEntities,
  selectCategorySelectedId,
  (entities, id) => entities[id]
);

// ---- Recipe Selectors ----- //

export const selectRecipeState = (state: State) => state.recipes;

export const selectRecipeEntities = createSelector(
  selectRecipeState,
  RecipeReducer.selectRecipeEntities
);

export const selectAllRecipes = createSelector(
  selectRecipeState,
  RecipeReducer.selectAllRecipes
);

export const selectRecipeSelectedId = createSelector(
  selectRecipeState,
  RecipeReducer.selectedRecipeId
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
