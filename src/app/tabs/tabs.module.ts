import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TabsRoutingModule } from './tabs-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create-recipe/pages/create/create.component';
import { ProfileComponent } from './profile/profile.component';
import { TabsComponent } from './tabs.component';
import { SubcategoriesComponent } from './home/pages/subcategories/subcategories.component';
import { SingleRecipeComponent } from './home/pages/single-recipe/single-recipe.component';
import { RecipesComponent } from './home/pages/recipes/recipes.component';
import { CreateFormComponent } from './create-recipe/components/create-form/create-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    CreateComponent,
    ProfileComponent,
    TabsComponent,
    SubcategoriesComponent,
    SingleRecipeComponent,
    RecipesComponent,
    CreateFormComponent
  ],
  imports: [
    CommonModule,
    TabsRoutingModule
  ]
})
export class TabsModule { }
