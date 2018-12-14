import { Action } from '@ngrx/store';

export namespace SubCategoryActions {
  export enum Types {
    SELECT = '[subCategory] Select'
  }

  export class Select implements Action {
    readonly type: string = Types.SELECT;
    constructor(public payload: any) {}
  }

  export type Actions
  =
  | Select
  ;
}
