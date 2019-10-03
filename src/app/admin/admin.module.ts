import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";


import {  AuthComponent } from "./auth.component";
import { AdminComponent } from "./admin.component";

import { AuthRepository } from "../model/auth.repository";
import { AuthGuardRepository } from "../model/auth.guard";
import { LocalStorageRepository } from "../model/localStorage.repository";
import { RestDataRepository } from "../model/restDataRepository";

let routing = RouterModule.forChild([
    {path: "adminLogin", component: AuthComponent},
    {path : "main", component: AdminComponent, canActivate:[AuthGuardRepository]},
    {path: "**", redirectTo: "adminLogin"}
]);

@NgModule({

    imports: [BrowserModule, FormsModule, routing],
    providers:[AuthRepository, AuthGuardRepository, LocalStorageRepository, RestDataRepository],
    declarations:[AuthComponent,AdminComponent],
    exports: [AuthComponent,AdminComponent]
})

export class AdminModule{}