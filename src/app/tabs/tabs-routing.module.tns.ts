import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { TabsComponent } from './tabs.component';
import { SubcategoriesComponent } from './home/pages/subcategories/subcategories.component';
import { SingleRecipeComponent } from './home/pages/single-recipe/single-recipe.component';
import { RecipesComponent } from './home/pages/recipes/recipes.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
  },
  {
    path: 'subcategories',
    component: SubcategoriesComponent,
  },
  {
    path: 'recipes',
    component: RecipesComponent,
  },
  {
    path: 'single-recipe',
    component: SingleRecipeComponent,
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class TabsRoutingModule { }
