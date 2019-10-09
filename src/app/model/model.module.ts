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

@NgModule({
  imports:[HttpClientModule],
  providers:[ProductRepository, AuthRepository, LocalStorageRepository, AuthGuardRepository, RestDataRepository, RestDataCustomerRepository, CustomerRepository,AuthCustomerRepository]
})

export class ModelModule{}