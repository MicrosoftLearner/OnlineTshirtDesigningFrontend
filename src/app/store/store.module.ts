import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SwiperModule} from "ngx-swiper-wrapper";



import { StoreComponent } from "./store.component";
import { StoreHeaderComponent } from "./storeHeader.component";
import { StoreFooterComponent } from "./storeFooter.component";

import { IndividualProductComponent } from "./individualProduct.Component";
import { LoginComponent } from "./Login.component";
import { InnerBlogsComponent } from "./innerBlogs.component";
import { AccountComponent } from "./account.component";
import {  OrderDetailsComponent } from "./orderDetails";
import { CartComponent } from "./cart.component";
import { CartSummeryComponent } from "./cartSummery.component";


@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule, SwiperModule],
    declarations: [StoreComponent, StoreHeaderComponent, StoreFooterComponent, IndividualProductComponent,LoginComponent, InnerBlogsComponent,AccountComponent, OrderDetailsComponent, CartComponent, CartSummeryComponent],
    exports: [StoreComponent, StoreHeaderComponent, StoreFooterComponent, IndividualProductComponent,LoginComponent, InnerBlogsComponent, AccountComponent, OrderDetailsComponent, CartComponent]
})

export class StoreModule { }
