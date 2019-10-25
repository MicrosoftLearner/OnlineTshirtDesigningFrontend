import { Component, OnInit } from "@angular/core";
import { Form } from "@angular/forms";
import { LocalStorageRepository } from "../model/localStorage.repository";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthCustomerRepository } from "../model/authCustomer.repository";

@Component({

    templateUrl: "orderDetails.component.html"
})

export class OrderDetailsComponent implements OnInit{


    public order = [{}];

    constructor(private storageRepository: LocalStorageRepository, private route: ActivatedRoute, private routerLink: Router,private repositoryAuthCust: AuthCustomerRepository){}

    ngOnInit(){

        this.getOrder();
    }

    getOrder() {
     
        this.repositoryAuthCust.getCustomerOrder( this.storageRepository.storageCustomerTokenInfo.token)
            .subscribe(res => {
               
               this.order = res;
            });
    }
}