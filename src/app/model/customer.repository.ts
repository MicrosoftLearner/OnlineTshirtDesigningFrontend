import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestDataCustomerRepository } from "./restDataCustomer.repository";

@Injectable()

export class CustomerRepository {

    constructor(private restDataProdRepository: RestDataCustomerRepository){}
}