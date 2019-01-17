import { Component, OnInit } from '@angular/core';
// import { RouterExtensions } from 'nativescript-angular/router';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { CMSActions } from '../../services/dispatcher.service';
import { CategoryActions } from '../../actions/categories.actions';
import { RecipeActions } from '../../actions/recipes.actions';
import { SubCategoryActions } from '../../actions/subCategories.actions';
// import { Observable } from 'tns-core-modules/ui/page/page';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'home';
  categories$: Observable<any>;
  subCategories$: Observable<any>;
  recipes$: Observable<any>;

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: CMSActions,
    // private routerExtensions: RouterExtensions
  ) {
      this.categories$ = this.store.select(fromRoot.selectAllCategories);
      this.subCategories$ = this.store.select(fromRoot.selectSelectedCategory);
      this.recipes$ = this.store.select(fromRoot.selectAllRecipes);
  }

  getCategoryTypes(categoryId) {
    console.log('category id');
    console.log(categoryId);
    this.store.dispatch(new CategoryActions.Select(categoryId));
  }

  selectSubCategory(subCategoryId) {
    this.store.dispatch(new SubCategoryActions.Select(subCategoryId));
    this.store.dispatch(new RecipeActions.Get(subCategoryId));
  }

  // onSelect(id) {
  //   console.log(id);
  //   // this.routerExtensions.navigate(['/tabs/subcategories']);
  // }

  ngOnInit() {
    this.store.dispatch(new CategoryActions.Get());

  }

}
