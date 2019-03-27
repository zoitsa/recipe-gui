import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../../reducers';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { CategoryActions } from '~/app/actions/categories.actions';
// import { SubcategoriesComponent } from '~/app/tabs/home/pages/subcategories/subcategories.component';
// import { CategoryActions } from '~/app/actions/categories.actions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  title = 'create';
  categories$: Observable<any>;
  subCategories$: Observable<any>;
  categoryNames$: Observable<any>;
  types$: Observable<any>;

  constructor(private store: Store<any>) { 
    this.categories$ = this.store.select(fromRoot.selectAllCategories);
    this.subCategories$ = this.store.select(fromRoot.selectSelectedCategory);
  }

  ngOnInit() {   

  this.categoryNames$ = this.categories$
      .pipe(map(data => {
        const categoryArray: string[] = [' '];
        data.forEach(category => {
          categoryArray.push(category.name);
        });  
        return categoryArray;
      }));   

  }

  onCategoryUpdated(data) {
    this.store.dispatch(new CategoryActions.Select(data));
    this.types$ = this.subCategories$
      .pipe(map(data => {
        const typeArray: string[] = [' '];

        data.subCategories.forEach(subCategory => {
          typeArray.push(subCategory.name)       
        })
        return typeArray;
    }));
    
   }

 
}