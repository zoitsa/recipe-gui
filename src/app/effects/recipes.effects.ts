import { Injectable } from '@angular/core';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { Action, Store, } from '@ngrx/store';
import { State } from '../reducers';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../services/api.service';

import {RecipeActions} from '../actions/recipes.actions';


@Injectable()
export class RecipeEffects {
    constructor(
        private action$: Actions,
        private api: ApiService,
        private store$: Store<State>
        ) { }

    @Effect()
    get$: Observable<Action> = this.action$.pipe(
        ofType(RecipeActions.Types.GET),
        switchMap((action: RecipeActions.Get) => {
            return this.api.getRecipesFromSubCategory(action.payload)
            .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                map((action: RecipeActions.GetComplete) => new RecipeActions.GetComplete((action))),
                tap((res) => console.log(res))
                // catchError(errorHandler(RecipeActions.GetError));
            );
        })
    );
}
