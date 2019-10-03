import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";


import { ProductRepository } from "./product.repository";
import { AuthRepository } from "./auth.repository";
import { LocalStorageRepository } from "./localStorage.repository";
import { AuthGuardRepository } from "./auth.guard";
import { RestDataRepository } from "./restDataRepository";

@NgModule({
  imports:[HttpClientModule],
  providers:[ProductRepository, AuthRepository, LocalStorageRepository, AuthGuardRepository, RestDataRepository]
})

export class ModelModule{}