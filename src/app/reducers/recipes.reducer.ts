import { Action } from '@ngrx/store';
import { RecipeActions } from '../actions/recipes.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SubCategoryActions } from '../actions/subCategories.actions';

export namespace RecipeReducer {
  export interface State extends EntityState<any> {
    loading: boolean;
    selectedSubCategoryId: number | string;
    selectedRecipeId: number | string;
  }

  export const adapter: EntityAdapter<any> = createEntityAdapter<any>({

  });

  export const initialState: State = adapter.getInitialState({
    loading: false,
    selectedSubCategoryId: null,
    selectedRecipeId: null,
  });

  export function reducer(
    state = initialState,
    action: RecipeActions.Actions | SubCategoryActions.Actions
  ): State {
    switch (action.type) {
      case SubCategoryActions.Types.SELECT:
        return {
          ...initialState,
          selectedSubCategoryId: action.payload
        };

      case RecipeActions.Types.GET:
        return {
          ...state,
          loading: true,
        };

      case RecipeActions.Types.GET_COMPLETE:
        return adapter.upsertMany(action.payload.recipes, {
          ...state,
          loading: false,
        });

      default:
        return state;
    }
  }

  export const {
    selectEntities: selectRecipeEntities,
    selectAll: selectAllRecipes,
    selectIds: selectRecipeIds
  } = adapter.getSelectors();

  export const loading = (state: State) => state.loading;
}
