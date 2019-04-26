import { Action } from '@ngrx/store';

export namespace RecipeActions {
  export enum Types {
    GET = '[recipe] Get',
    GET_COMPLETE = '[recipe] GetComplete',
    GET_ERROR = '[recipe] GetError',
    SELECT = '[recipe] Select',
    TOGGLE_STEP = '[recipe] ToggleStep',
    POST_RECIPE = '[recipe] Post',
    POST_RECIPE_COMPLETE = '[recipe] PostComplete',
    POST_RECIPE_ERROR = '[recipe] PostError',
    POST_PHOTOS = '[recipe] PostPhotos',
    POST_PHOTOS_COMPLETE = '[recipe] PostPhotosComplete',
    POST_PHOTOS_ERROR = '[recipe] PostPhotosError',
  }

  export class Get implements Action {
    readonly type: string = Types.GET;
    constructor(public payload: any) {}
  }

  export class GetComplete implements Action {
    readonly type: string = Types.GET_COMPLETE;
    constructor(public payload: any) {}
  }

  export class GetError implements Action {
    readonly type: string = Types.GET_ERROR;
    constructor(public payload: any) {}
  }

  export class Select implements Action {
    readonly type: string = Types.SELECT;
    constructor(public payload: any) {}
  }

  export class ToggleStep implements Action {
    readonly type: string = Types.TOGGLE_STEP;
    constructor(public payload: any) {}
  }

  export class PostRecipe implements Action {
    readonly type: string = Types.POST_RECIPE;
    constructor(public payload: any) {}
  }

  export class PostRecipeComplete implements Action {
    readonly type: string = Types.POST_RECIPE_COMPLETE;
    constructor(public payload: any) {}
  }

  export class PostRecipeError implements Action {
    readonly type: string = Types.POST_RECIPE_ERROR;
    constructor(public payload: any) {}
  }

  export class PostPhotos implements Action {
    readonly type: string = Types.POST_PHOTOS;
    constructor(public payload: any) {}
  }

  export class PostPhotosComplete implements Action {
    readonly type: string = Types.POST_PHOTOS_COMPLETE;
    constructor(public payload: any) {}
  }

  export class PostPhotosError implements Action {
    readonly type: string = Types.POST_PHOTOS_ERROR;
    constructor(public payload: any) {}
  }

  export type Actions
  = Get
  | GetComplete
  | GetError
  | Select
  | ToggleStep
  | PostRecipe
  | PostRecipeComplete
  | PostRecipeError
  | PostPhotos
  | PostPhotosComplete
  | PostPhotosError
  ;
}
