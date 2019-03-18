import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import { CMSActions } from '../../../../services/dispatcher.service';
import { Observable } from 'rxjs/Observable';
import { SegmentedBar, SegmentedBarItem, SelectedIndexChangedEventData } from 'tns-core-modules/ui/segmented-bar';
import { GestureTypes, SwipeGestureEventData, SwipeDirection } from 'tns-core-modules/ui/gestures';
import { RecipeActions } from '../../../../actions/recipes.actions';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {
  singleRecipe$: Observable<any>;
  recipeId$;
  recipeSteps$;
  singleRecipe;
  selectedIndex = 0;
  items: Array<any>;
  segmentedBar;

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: CMSActions,
  ) {
    this.recipeId$ = this.store.select(fromRoot.selectRecipeSelectedId);
    this.singleRecipe$ = this.store.select(fromRoot.selectSelectedRecipe);
    // this.recipeSteps$ = this.store.select(fromRoot.selectSelectedRecipeSteps);
  }

  // create custom segmented bar titles
  private createSegmentedBarItems() {
    const segmentedBarItems = [];
    const tab1 = <SegmentedBarItem>new SegmentedBarItem();
    tab1.title = 'Recipe';

    const tab2 = <SegmentedBarItem>new SegmentedBarItem();
    tab2.title = 'Instructions';

    segmentedBarItems.push(tab1);
    segmentedBarItems.push(tab2);

    return segmentedBarItems;
}

// handle the selectedIndexChange
  public onSelectedIndexChange(args) {
    this.segmentedBar = <SegmentedBar>args.object;
    this.selectedIndex = this.segmentedBar.selectedIndex;
  }

   onSwipe(event: SwipeGestureEventData) {
    if (this.selectedIndex === 0 && event.direction === SwipeDirection.left) {
      this.selectedIndex = 1;
      this.segmentedBar.selectedIndex = this.selectedIndex;
    } else if (this.selectedIndex === 1 && event.direction === SwipeDirection.right) {
      this.selectedIndex = 0;
      this.segmentedBar.selectedIndex = this.selectedIndex;
    }
  }

  checkedChange(stepsCheck, i) {
    console.log('stepsCheck');
    console.log(stepsCheck);
    console.log(i);
    console.log(this.singleRecipe.steps[i]);
    this.store.dispatch(new RecipeActions.ToggleStep(this.singleRecipe.steps[i]));
  }

  ngOnInit() {
    this.items = this.createSegmentedBarItems();

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
