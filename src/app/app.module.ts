import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {SlideshowModule  } from "ng-simple-slideshow";
import { RouterModule } from '@angular/router';

import { StoreModule } from './store/store.module';

/*All components */
import { AppComponent } from './app.component';
import {StoreHeaderComponent} from './store/storeHeader.component'
import { StoreComponent } from "./store/store.component";
import { from } from 'rxjs';
//import { angular } from "angular-flexslider";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,SlideshowModule,RouterModule, StoreModule,
    RouterModule.forRoot([
     {path: "store", component: StoreComponent},
     {path: "**", redirectTo: "/store"}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
