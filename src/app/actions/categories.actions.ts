import { Action } from '@ngrx/store';

export namespace CategoryActions {
  export enum Types {
    GET = '[recipe] Get',
    GET_COMPLETE = '[recipe] GetComplete',
    GET_ERROR = '[recipe] GetError',
    SELECT = '[recipe] Select'
  }

  export class Get implements Action {
    readonly type: string = Types.GET;
    // constructor(public payload: any) {}
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

  export type Actions
  = Get
  | GetComplete
  | GetError
  | Select
  ;
}
