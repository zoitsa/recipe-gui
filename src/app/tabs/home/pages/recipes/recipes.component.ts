import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import { CMSActions } from '../../../../services/dispatcher.service';
import { RecipeActions } from '../../../../actions/recipes.actions';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes$: Observable<any>;

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: CMSActions,
  ) {
    this.recipes$ = this.store.select(fromRoot.selectAllRecipes);
  }

  selectSingleRecipe(recipeId) {
    console.log(recipeId);
    this.store.dispatch(new RecipeActions.Select(recipeId));
  }

  ngOnInit() {
  }

}
