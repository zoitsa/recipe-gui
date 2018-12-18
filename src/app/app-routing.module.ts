import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { routes } from './app.routes';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/tabs/home',
      pathMatch: 'full',
  },
  {
      path: 'tabs',
      loadChildren: './tabs/tabs.module#TabsModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
