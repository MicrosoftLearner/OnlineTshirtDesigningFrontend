import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { StoreComponent } from "./store.component";
import { StoreHeaderComponent } from "./storeHeader.component";
import { StoreFooterComponent } from "./storeFooter.component";


@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule],
    declarations: [StoreComponent, StoreHeaderComponent, StoreFooterComponent],
    exports: [StoreComponent, StoreHeaderComponent, StoreFooterComponent]
})

export class StoreModule { }
