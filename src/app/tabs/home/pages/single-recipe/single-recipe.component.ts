import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import { CMSActions } from '../../../../services/dispatcher.service';
import { Observable } from 'rxjs/Observable';
import { RecipeActions } from '../../../../actions/recipes.actions';
import { ListViewEventData } from 'nativescript-ui-listview';
import { Subject } from 'rxjs/Subject';
import { takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit, OnDestroy {
  singleRecipe$: Observable<any>;
  recipeId$;
  recipeSteps$;
  singleRecipe;
  checkedOption = false;
  selectedIndex = 0;
  items: Array<any>;
  private unsubscribe: Subject<void> = new Subject();


  constructor(
    private store: Store<fromRoot.State>,
    private actions$: CMSActions,
  ) {
    this.recipeId$ = this.store.select(fromRoot.selectRecipeSelectedId);
    this.singleRecipe$ = this.store.select(fromRoot.selectSelectedRecipe);
  }

  // -- rework this to work for the ingredient list
  // checkedChange(stepsCheck, i) {
  //   console.log('stepsCheck');
  //   console.log(stepsCheck);
  //   console.log(i);
  //   // console.log(stepsCheck.checked);
  //   // console.log(stepsCheck.toggle);
  //   // console.log(this.singleRecipe.steps[i]);
  //   this.singleRecipe$.subscribe(data => {
  //     this.singleRecipe = data;
  //   });
  //   this.store.dispatch(new RecipeActions.ToggleStep(this.singleRecipe.steps[i]));
  // }

  public itemSelected(args: ListViewEventData) {
    this.singleRecipe$.pipe(
      takeUntil(this.unsubscribe)
    )
    .subscribe(data => {
      this.singleRecipe = data;
    });
    this.store.dispatch(new RecipeActions.ToggleStep(this.singleRecipe.steps[args.index]));
}


  ngOnInit() {

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
