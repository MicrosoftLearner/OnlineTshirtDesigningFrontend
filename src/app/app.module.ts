import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlideshowModule } from "ng-simple-slideshow";
import { RouterModule } from '@angular/router';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from "ngx-swiper-wrapper";


import { StoreModule } from './store/store.module';

/*All components */
import { AppComponent } from './app.component';
import { StoreComponent } from "./store/store.component";



import { from } from 'rxjs';
import { IndividualProductComponent } from './store/individualProduct.Component';
import { CustomerLoginComponent } from './store/customerLogin.component';
import { InnerBlogsComponent } from './store/innerBlogs.component';
//import { angular } from "angular-flexslider";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, SlideshowModule, RouterModule, StoreModule,
    RouterModule.forRoot([
      { path: "store", component: StoreComponent },
      {path: "individualProduct", component: IndividualProductComponent},
      {path: "login", component: CustomerLoginComponent},
      {path: "blogs", component: InnerBlogsComponent},
      
      { path: "**", redirectTo: "/store" }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
