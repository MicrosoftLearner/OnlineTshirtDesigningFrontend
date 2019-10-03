import { Component, AfterViewInit, OnInit } from "@angular/core";
import { Form } from "@angular/forms";
import { AuthRepository } from "../model/auth.repository";
import { LocalStorageRepository } from "../model/localStorage.repository";
import { Router } from "@angular/router";

import { Admin } from "../model/admin.model";

@Component({
    templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit {
   
    public orderDetails; 

    //Set it to -1 to hide the info section by default
    public activeIndex:number = -1 ;

    constructor(private authRepository: AuthRepository, private storageRepository: LocalStorageRepository, private route: Router) {}

    ngOnInit(){

        this.showOrderedProducts();
    };

    showOrderedProducts(){
        {
            //Call API to get customers ordered products
              this.authRepository.customerOrderedProduct().subscribe(response => {
                this.orderDetails  = response;
            },
            
            error => {
                console.log("Token error", error);

                //Clear the Token stored in Web storage if the token has expired
                //It will come to know from server, is token expired or not ?
                this.storageRepository.clearAdminToken();
                this.route.navigateByUrl("/main");
            });
            console.log("orderDetails", this.orderDetails);
        }
    }   
    
    showPanel(index: number){
        //settting to a particular activeIndex to the current index
        //will display the tabs based on click button
        this.activeIndex = index;
    }

    testCall(){
        let data;
      
        this.authRepository.testAsync().subscribe(res=> {
            alert("data received");
        
            console.log("data", res);
        });
        
    }

}