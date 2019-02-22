import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import { CMSActions } from '../../../../services/dispatcher.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {
  singleRecipe$: Observable<any>;
  recipeId$;

  singleRecipe;

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: CMSActions,
  ) {
    this.recipeId$ = this.store.select(fromRoot.selectRecipeSelectedId);
    this.singleRecipe$ = this.store.select(fromRoot.selectSelectedRecipe);
  }

  ngOnInit() {
    this.recipeId$.subscribe(data => {
      console.log('single-recipe');
      console.log(data);
    });
    this.singleRecipe$.subscribe(data => {
      this.singleRecipe = data;
      console.log('single-recipe');
      console.log(data);
    });
  }

}
