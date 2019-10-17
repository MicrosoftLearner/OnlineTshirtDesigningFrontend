import { Component } from "@angular/core";
import { Form, NgForm } from "@angular/forms";

import { ToastrService } from "ngx-toastr";

import { AuthCustomerRepository } from "../model/authCustomer.repository";
import { Router } from "@angular/router";
import { Customer } from "../model/customer.model";

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent {

    //Sets the customer email & password  
    public customer: Customer = {};

    //Sets true and false for ng-valid and ng-invalid operations
    public submitted: boolean = false;

    //Shows the loader 
    public isLoading: boolean = false;

    //shows error message if login crediential is wrong 
    public errorMessage: string;

    //Sets the view of sign up and login 
    public view: number = 1;

    constructor(private repositoryAuthCust: AuthCustomerRepository, private route: Router, private toastr: ToastrService) { }

    checkCustomerLogin(form: NgForm, customer:Customer) {

        this.submitted = true;

        if (form.valid) {

            this.isLoading = true;

            this.repositoryAuthCust.login(customer.email, customer.pwd)
                .subscribe(res => {

                    this.isLoading = false;
                    this.route.navigateByUrl("/store");
                },
                    err => {

                        this.isLoading = false;
                        this.toastr.error("Incorrect credentials");
                        
                       // this.toastr.error(err.error.error_description);
                    });

        }

    }


    customerSignup(form: NgForm, cust: Customer) {

        this.submitted = true;

        if (form.valid) {

            this.repositoryAuthCust.signUp(cust)
                .subscribe(res => {

                },
                    err => {
                        this.toastr.error("Email already exist");

                    });

        }
    }

    changeView(view) {
        this.view = view;
    }

}