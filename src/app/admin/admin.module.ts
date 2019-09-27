import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";


import {  AuthComponent } from "./auth.component";
import { AdminComponent } from "./admin.component";

let routing = RouterModule.forChild([
    {path: "adminLogin", component: AuthComponent},
    {path : "main", component: AdminComponent},
    {path: "**", redirectTo: "adminLogin"}
]);

@NgModule({

    imports: [BrowserModule, FormsModule, routing],
    declarations:[AuthComponent,AdminComponent],
    exports: [AuthComponent,AdminComponent]
})

export class AdminModule{}