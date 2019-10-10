import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";


import { LocalStorageRepository } from "./localStorage.repository";

import { Router } from "@angular/router";
import { RestDataCustomerRepository } from "./restDataCustomer.repository";
import { Customer } from "./customer.model";

@Injectable()

export class AuthCustomerRepository {
    private baseUrl: string;

   
    constructor(private http: HttpClient, private storageRepository: LocalStorageRepository, private restRepository: RestDataCustomerRepository, private route: Router, private toastr: ToastrService) {
        this.baseUrl = "http://localhost:58206/api/customer/";
    }

    authenticate(theEmailId: string, thePwd: string): Observable<any> {

        let customerData = "username=" + theEmailId + "&password=" + thePwd + "&grant_type=password";

        return this.restRepository.getCustomerDetails(customerData)
            .pipe(
                map(response => {

                    //Stores the response object
                    let data = response;

                    //set the returned Token obj into localStorage
                    this.storageRepository.storageCustomerTokenInfo = data;

                    return data;

                }),catchError(this.handleError) 
            );
    }
    handleError(err){
       // console.log("in error blog", err.error.error);
        let errorMessage: string = '';

        errorMessage=  err.error.error;

       return throwError(err);
    }

  
    public get authenticated(): boolean {

        //Checks if token has stored in the localstorage
        if (this.storageRepository.storageCustomerTokenInfo.token != null) return true;
        // if (this.auth_token == null) return false;

        //If the token hasn't stored in the localstorage
        return false;
    }

    signUp(customerData: Customer) {

        return this.restRepository.signUpCustomer(customerData)
            .pipe(
                map(response => {

                    //Stores the response object
                    let data = response;
                    this.toastr.success("Successfully signUp, click on login");
                    return data;
                })
            );
    }

}