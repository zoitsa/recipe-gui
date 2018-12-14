import { Action } from '@ngrx/store';
import { RecipeActions } from '../actions/recipes.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export namespace RecipeReducer {
  export interface State extends EntityState<any> {
    loading: boolean;
  }

  export const adapter: EntityAdapter<any> = createEntityAdapter<any>({

  });

  export const initialState: State = adapter.getInitialState({
    loading: false,
  });

  export function reducer(
    state = initialState,
    action: RecipeActions.Actions
  ): State {
    switch (action.type) {
      case RecipeActions.Types.GET:
        return {
          ...state,
          loading: true,
        };

      case RecipeActions.Types.GET_COMPLETE:
        return adapter.updateMany(action.payload.recipes, {
          ...state,
          loading: false,
        });

      default:
        return state;
    }
  }

  export const {
    selectEntities: selectCategoryEntities,
    selectAll: selectAllCategories,
    selectIds: selectCategoryIds
  } = adapter.getSelectors();

  export const loading = (state: State) => state.loading;
}
