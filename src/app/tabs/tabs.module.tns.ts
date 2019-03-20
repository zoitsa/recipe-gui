import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { TabsRoutingModule } from './tabs-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { ProfileComponent } from './profile/profile.component';
import { TabsComponent } from './tabs.component';
import { SubcategoriesComponent } from './home/pages/subcategories/subcategories.component';
import { SingleRecipeComponent } from './home/pages/single-recipe/single-recipe.component';
import { RecipesComponent } from './home/pages/recipes/recipes.component';

import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

@NgModule({
  declarations: [
    HomeComponent,
    CreateComponent,
    ProfileComponent,
    TabsComponent,
    SubcategoriesComponent,
    SingleRecipeComponent,
    RecipesComponent
  ],
  imports: [
    TabsRoutingModule,
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptUIListViewModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TabsModule { }
