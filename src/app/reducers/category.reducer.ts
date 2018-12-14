import { Action } from '@ngrx/store';
import { CategoryActions } from '../actions/categories.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export namespace CategoryReducer {
  export interface State extends EntityState<any> {
    loading: boolean;
    selectedCategoryId: number | string;
  }

  export const adapter: EntityAdapter<any> = createEntityAdapter<any>({

  });

  export const initialState: State = adapter.getInitialState({
    loading: false,
    selectedCategoryId: null,
  });

  export function reducer(state = initialState, action: CategoryActions.Actions): State {
    switch (action.type) {
      case CategoryActions.Types.GET:
        return {
          ...state,
          loading: true,
        };

        case CategoryActions.Types.GET_COMPLETE:
        return adapter.addMany(action.payload, {
          ...state,
          loading: false,
        });

      case CategoryActions.Types.SELECT:
        return {
          ...state,
          selectedCategoryId: action.payload,
        };

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
  export const selectedId = (state: State) => state.selectedCategoryId;
}
