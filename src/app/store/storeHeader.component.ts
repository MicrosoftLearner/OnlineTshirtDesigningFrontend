import { Component, OnInit } from "@angular/core";
import { AuthCustomerRepository } from "../model/authCustomer.repository";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "store-header",
 templateUrl: "storeHeader.component.html"
})

export class StoreHeaderComponent implements OnInit{

  public showLoginButton: boolean = true;

  public showOptions: boolean = false;

    constructor( private repositoryAuthCust: AuthCustomerRepository, private route: Router, private toastr: ToastrService){}

    ngOnInit(){

     this.getCustomerDetails();
    }
  getCustomerDetails() {
   
  }
}