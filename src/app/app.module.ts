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
import { LoginComponent } from './store/Login.component';
import { InnerBlogsComponent } from './store/innerBlogs.component';
import { AccountComponent } from './store/account.component';
import { OrderDetailsComponent } from './store/orderDetails';
import { CartComponent } from './store/cart.component';
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
      {path: "login", component: LoginComponent},
      {path: "blogs", component: InnerBlogsComponent},
      {path: "account", component: AccountComponent}, 
      {path: "orderDetails", component: OrderDetailsComponent},      
      {path: "cart", component: CartComponent}, 
      { path: "**", redirectTo: "/store" }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
