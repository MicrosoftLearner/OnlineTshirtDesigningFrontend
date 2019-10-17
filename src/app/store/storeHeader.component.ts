import { Component, OnInit } from "@angular/core";
import { AuthCustomerRepository } from "../model/authCustomer.repository";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LocalStorageRepository } from "../model/localStorage.repository";
import { Customer } from "../model/customer.model";

@Component({
  selector: "store-header",
  templateUrl: "storeHeader.component.html"
})

export class StoreHeaderComponent implements OnInit {

  public showLoginButton: boolean = true;

  public showOptions: boolean = false;

  public customerData: Customer;

  constructor(private repositoryAuthCust: AuthCustomerRepository, private ropositoryStorage: LocalStorageRepository, private route: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.getCustomerDetails();
  }

  getCustomerDetails() {
     
    if (this.ropositoryStorage.storageCustomerTokenInfo.token == "") {

      //Shows the login button
      this.showLoginButton = true;

      //Clears the localstorage
      this.ropositoryStorage.clearCustomerToken();

    }
    else {

      this.repositoryAuthCust.getCustomerDetails(this.ropositoryStorage.storageCustomerTokenInfo.token)
        .subscribe(res => {
          //Hides the login button
          this.showLoginButton = false;

          //Shows the options button to navigate 
          this.showOptions = true;
          
          //Sets the response
          this.customerData = res;
        }, err => {

          //Makes false to true
          !this.showLoginButton;
        });

    }
  }

  logOut() {
    this.ropositoryStorage.clearCustomerToken();
  }
}