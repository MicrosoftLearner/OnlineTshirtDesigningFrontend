import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";


import { ProductRepository } from "./product.repository";
import { AuthRepository } from "./auth.repository";
import { LocalStorageRepository } from "./localStorage.repository";
import { AuthGuardRepository } from "./auth.guard";
import { RestDataRepository } from "./restDataRepository";
import { RestDataCustomerRepository } from "./restDataCustomer.repository";
import { CustomerRepository } from "./customer.repository";
import { AuthCustomerRepository } from "./authCustomer.repository";
import { CartRepository } from "./cart.repository";
import { RestCartRepository } from "./restCart.repository";

@NgModule({
  imports:[HttpClientModule],
  providers:[ProductRepository, AuthRepository, LocalStorageRepository, AuthGuardRepository, RestDataRepository, RestDataCustomerRepository, CustomerRepository,AuthCustomerRepository, CartRepository, RestCartRepository]
})

export class ModelModule{}