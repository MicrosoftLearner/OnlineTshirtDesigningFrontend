import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SwiperModule} from "ngx-swiper-wrapper";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";



import { StoreComponent } from "./store.component";
import { StoreHeaderComponent } from "./storeHeader.component";
import { StoreFooterComponent } from "./storeFooter.component";

import { IndividualProductComponent } from "./individualProduct.Component";

import { InnerBlogsComponent } from "./innerBlogs.component";
import { AccountComponent } from "./account.component";
import {  OrderDetailsComponent } from "./orderDetails";
import { CartComponent } from "./cart.component";
import { CartSummeryComponent } from "./cartSummery.component";
import { RestDataProductRepository } from "../model/restDataProductRepository";
import { AuthCustomerRepository } from "../model/authCustomer.repository";
import { RestDataCustomerRepository } from "../model/restDataCustomer.repository";
import { LoginComponent } from "./login.component";


@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule, SwiperModule, BrowserAnimationsModule,ToastrModule.forRoot()],
 
    providers: [RestDataProductRepository, AuthCustomerRepository, RestDataCustomerRepository],
    
    declarations: [StoreComponent, StoreHeaderComponent, StoreFooterComponent, IndividualProductComponent, LoginComponent, InnerBlogsComponent,AccountComponent, OrderDetailsComponent, CartComponent, CartSummeryComponent],

    exports: [StoreComponent, StoreHeaderComponent, StoreFooterComponent, IndividualProductComponent,LoginComponent, InnerBlogsComponent, AccountComponent, OrderDetailsComponent, CartComponent]
})

export class StoreModule { }
