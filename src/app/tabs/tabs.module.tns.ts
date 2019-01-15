import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { TabsRoutingModule } from './tabs-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { ProfileComponent } from './profile/profile.component';
import { TabsComponent } from './tabs.component';
import { SubcategoriesComponent } from './home/pages/subcategories/subcategories.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreateComponent,
    ProfileComponent,
    TabsComponent,
    SubcategoriesComponent
  ],
  imports: [
    TabsRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TabsModule { }
