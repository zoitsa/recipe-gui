import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { AppRoutingModule, } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule, ActionsSubject } from '@ngrx/store';
import { CMSActionsSubject } from './services/dispatcher.service';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './effects/category.effects';
import { RecipeEffects } from './effects/recipes.effects';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([CategoryEffects, RecipeEffects]),
  ],
  providers: [
    { provide: ActionsSubject, useClass: CMSActionsSubject },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
