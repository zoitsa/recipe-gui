import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { TabsComponent } from './tabs.component';
import { SubcategoriesComponent } from './home/pages/subcategories/subcategories.component';


const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'subcategories',
        component: SubcategoriesComponent,
      }
    ]
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class TabsRoutingModule { }
