import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";


import { ProductRepository } from "./product.repository";
import { AuthRepository } from "./auth.repository";
import { LocalStorageRepository } from "./localStorage.repository";
import { AuthGuardRepository } from "./auth.guard";

@NgModule({
  imports:[HttpClientModule],
  providers:[ProductRepository, AuthRepository, LocalStorageRepository, AuthGuardRepository]
})

export class ModelModule{}