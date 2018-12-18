import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { ProfileComponent } from './profile/profile.component';
import { TabsComponent } from './tabs.component';

@NgModule({
  declarations: [HomeComponent, CreateComponent, ProfileComponent, TabsComponent],
  imports: [
    CommonModule,
    TabsRoutingModule
  ]
})
export class TabsModule { }
