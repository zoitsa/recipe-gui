import { Action } from '@ngrx/store';

export namespace StepsActions {
  export enum Types {
    COMPLETED = '[steps] COMPLETED',
    // UNFINISHED = '[steps] UNFINISHED',
  }

  export class Completed implements Action {
    readonly type: string = Types.COMPLETED;
    constructor(public payload: boolean) {}
  }

//   export class Unfinished implements Action {
//     readonly type: string = Types.UNFINISHED;
//     constructor(public payload: any) {}
//   }


  export type Actions
  = Completed
  ;
}
