import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: './tabs/tabs.module#TabsModule'
  },
    // { path: '', redirectTo: '/(homeTab:home//browseTab:browse//searchTab:search)', pathMatch: 'full' },

    // { path: 'home', component: HomeComponent, outlet: 'homeTab' },
    // { path: 'browse', component: BrowseComponent, outlet: 'browseTab' },
    // { path: 'search', component: SearchComponent, outlet: 'searchTab' },

    // { path: 'item/:id', component: ItemDetailComponent, outlet: 'homeTab' }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
