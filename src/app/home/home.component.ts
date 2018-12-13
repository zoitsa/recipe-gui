
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { CMSActions } from '../services/dispatcher.service';
import { CategoryActions } from '../actions/categories.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'Recipes';
  categories$;
  subCategories$;

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: CMSActions
  ) {
    this.categories$ = this.store.select(fromRoot.selectAllCategories);
    this.subCategories$ = this.store.select(fromRoot.selectSelectedCategory);
  }

  getCategoryTypes(categoryId) {
    this.store.dispatch(new CategoryActions.Select(categoryId));
  }

  ngOnInit() {
    this.store.dispatch(new CategoryActions.Get());
  }

}
