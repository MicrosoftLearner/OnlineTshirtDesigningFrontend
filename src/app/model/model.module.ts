import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ProductRepository } from "./product.repository";

@NgModule({
  imports:[HttpClientModule],
  providers:[ProductRepository]
})

export class ModelModule{}