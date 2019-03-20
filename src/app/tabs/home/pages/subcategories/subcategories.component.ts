import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import { CMSActions } from '../../../../services/dispatcher.service';
import { CategoryActions } from '../../../../actions/categories.actions';
import { Observable } from 'rxjs/Observable';

import { RecipeActions } from '../../../../actions/recipes.actions';
import { SubCategoryActions } from '../../../../actions/subCategories.actions';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent implements OnInit {
  subCategories$: Observable<any>;
  // recipes$: Observable<any>;

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: CMSActions,
  ) {
    this.subCategories$ = this.store.select(fromRoot.selectSelectedCategory);
    // this.recipes$ = this.store.select(fromRoot.selectAllRecipes);
   }

   selectSubCategory(subCategoryId) {
    this.store.dispatch(new SubCategoryActions.Select(subCategoryId));
    this.store.dispatch(new RecipeActions.Get(subCategoryId));
  }

  ngOnInit() {

  }

}
