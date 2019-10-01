import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";


import { ProductRepository } from "./product.repository";
import { AuthRepository } from "./auth.repository";
import { LocalStorageRepository } from "./localStorage.repository";

@NgModule({
  imports:[HttpClientModule],
  providers:[ProductRepository, AuthRepository, LocalStorageRepository]
})

export class ModelModule{}