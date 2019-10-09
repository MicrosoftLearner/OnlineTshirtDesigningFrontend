import { Component } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { AuthCustomerRepository } from "../model/authCustomer.repository";
import { Router } from "@angular/router";
import { Customer } from "../model/customer.model";

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent {
  
    //Sets the customer email & password  
    public customer: Customer =  {};

    //Sets true and false for ng-valid and ng-invalid operations
    public submitted: boolean = false;

    //Shows the loader 
    public isLoading : boolean = false;

    //shows error message if login crediential is wrong 
    public errorMessage:string;

    //Sets the view of sign up and login 
    public view : number = 1;

    constructor(private repositoryAuthCust:AuthCustomerRepository, private route: Router){}

    checkCustomerLogin(form: NgForm, customer){

        this.submitted = true;

        if (form.valid) {

            this.isLoading = true;

            this.repositoryAuthCust.authenticate(customer.emailId, customer.pwd)
            .subscribe( res => {

               this.isLoading = false;
               this.route.navigateByUrl("/store");
            },
             err => {
                 
               this.isLoading= false;
             
             //  console.log("err", err.error.error_description);
               this.errorMessage = err.error.error_description;
             });
            
        }
 
    }


    customerSignup(form: NgForm, cust: Customer){

       this.submitted = true;
        if(form.valid){
           
        }
    }

    changeView(view){
        this.view = view;
    }

}