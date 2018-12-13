import { Action } from '@ngrx/store';

export namespace CategoryActions {
  export enum Types {
    GET = '[category] Get',
    GET_COMPLETE = '[category] GetComplete',
    GET_ERROR = '[category] GetError'
  }

  export class Get implements Action {
    readonly type: string = Types.GET;
  }

  export class GetComplete implements Action {
    readonly type: string = Types.GET_COMPLETE;
    constructor(public payload: any) {}
  }

  export class GetError implements Action {
    readonly type: string = Types.GET_ERROR;
    constructor(public payload: any) {}
  }

  export type Actions
  = Get
  | GetComplete
  | GetError;
}
