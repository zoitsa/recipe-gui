import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import { CMSActions } from '../../../../services/dispatcher.service';
import { CategoryActions } from '../../../../actions/categories.actions';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent implements OnInit {
  subCategories$: Observable<any>;

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: CMSActions,
  ) {
    this.subCategories$ = this.store.select(fromRoot.selectSelectedCategory);
   }

  ngOnInit() {
    this.subCategories$.subscribe(data => {
      console.log(data);
    });
  }

}
