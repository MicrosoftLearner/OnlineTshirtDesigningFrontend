import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SwiperModule} from "ngx-swiper-wrapper";



import { StoreComponent } from "./store.component";
import { StoreHeaderComponent } from "./storeHeader.component";
import { StoreFooterComponent } from "./storeFooter.component";

import { IndividualProductComponent } from "./individualProduct.Component";
import { CustomerLoginComponent } from "./customerLogin.component";
import { InnerBlogsComponent } from "./innerBlogs.component";


@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule, SwiperModule],
    declarations: [StoreComponent, StoreHeaderComponent, StoreFooterComponent, IndividualProductComponent,CustomerLoginComponent, InnerBlogsComponent],
    exports: [StoreComponent, StoreHeaderComponent, StoreFooterComponent, IndividualProductComponent,CustomerLoginComponent, InnerBlogsComponent]
})

export class StoreModule { }
