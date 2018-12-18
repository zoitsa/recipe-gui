import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { routes } from './app.routes';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/dashboard/home',
      pathMatch: 'full',
  },
  {
      path: 'dashboard',
      loadChildren: './tabs/tabs.module#TabsModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
