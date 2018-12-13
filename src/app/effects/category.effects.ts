import { Injectable } from '@angular/core';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { Action, Store, } from '@ngrx/store';
import { State } from '../reducers';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../services/api.service';

import {CategoryActions} from '../actions/categories.actions';


@Injectable()
export class CategoryEffects {
    constructor(
        private action$: Actions,
        private api: ApiService,
        private store$: Store<State>
        ) { }

    // @Effect()
    // getAll$: Observable<Action> = this.action$.pipe(
    //     ofType(CategoryActions.Types.GET),
    //     switchMap(() => {
    //         return this.api.getAll()
    //         .pipe(
    //             // tslint:disable-next-line:no-shadowed-variable
    //             map((action: CategoryActions.GetComplete) => new CategoryActions.GetComplete((action))),
    //             // tap((res) => console.log(res))
    //             // catchError(errorHandler(RecipeActions.GetError));
    //         );
    //     })
    // );
}
