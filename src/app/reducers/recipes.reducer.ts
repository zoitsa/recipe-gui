import { Action } from '@ngrx/store';
import { RecipeActions } from '../actions/recipes.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SubCategoryActions } from '../actions/subCategories.actions';

export namespace RecipeReducer {
  export interface State extends EntityState<any> {
    loading: boolean;
    selectedSubCategoryId: number | string;
    selectedRecipeId: number | string;
    completedStepId: number | string;
    // selectedRecipeSteps: Array<any>;
  }

  export const adapter: EntityAdapter<any> = createEntityAdapter<any>({

  });

  export const initialState: State = adapter.getInitialState({
    loading: false,
    selectedSubCategoryId: null,
    selectedRecipeId: null,
    completedStepId: null,
    // selectedRecipeSteps: [],
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

      case RecipeActions.Types.SELECT:
      console.log('recipes reducer - select');
      console.log(action.payload);

      console.log('entities');
      console.log(state.entities);
      const recipes = state.entities;
      const recipeId = action.payload;
      const recipe = recipes[recipeId];
      const recipeSteps = recipe.steps;
      console.log('steps');
      console.log(recipeSteps);
        return {
          ...state,
          selectedRecipeId: action.payload,
          // selectedRecipeSteps: recipeSteps,
      };

      case RecipeActions.Types.GET:
        return {
          ...state,
          loading: true,
        };

      case RecipeActions.Types.GET_COMPLETE:
      console.log('recipe reducer');
      console.log(action.payload);

        return adapter.addMany(action.payload, {
          ...state,
          loading: false,
        });

      case RecipeActions.Types.TOGGLE_STEP:
      const selectedRecipeId = state.selectedRecipeId;
      const completedStepId = action.payload.id;
      const recipeToUpdate = state.entities[selectedRecipeId];
      const steps = recipeToUpdate.steps;
      const stepToUpdateIndex = steps.findIndex(step => step.id === completedStepId);
      // the selected step object inside the steps array
      const stepToUpdate = steps[stepToUpdateIndex];

      // the step to update object with an updated completion status (true/false)
      const newStep = {
        ...stepToUpdate,
        completed: !stepToUpdate.completed
      };

      recipeToUpdate.steps = [...steps.slice(0, stepToUpdateIndex), newStep, ...steps.slice(stepToUpdateIndex + 1)];

      return {
        ...state,
      };

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
  export const selectedSubCategoryId = (state: State) => state.selectedSubCategoryId;
  export const selectedRecipeId = (state: State) => state.selectedRecipeId;
  export const completedStepId = (state: State) => state.completedStepId;
  // export const selectedRecipeSteps = (state: State) => state.selectedRecipeSteps;
}
