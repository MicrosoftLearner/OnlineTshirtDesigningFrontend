import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";


import { LocalStorageRepository } from "./localStorage.repository";

import { Router } from "@angular/router";
import { RestDataCustomerRepository } from "./restDataCustomer.repository";
import { Customer } from "./customer.model";
import { Product } from "./product";

@Injectable()

export class AuthCustomerRepository {

    //Fires when customer is logged in successfully
    @Output() fireSuccessLogin: EventEmitter<any> = new EventEmitter();

    private baseUrl: string;

    private checkOutProduct: Product = {};

    constructor(private http: HttpClient, private storageRepository: LocalStorageRepository, private restRepository: RestDataCustomerRepository, private route: Router, private toastr: ToastrService) {
        this.baseUrl = "http://localhost:58206/api/customer/";
    }

    login(theEmailId: string, thePwd: string): Observable<any> {

        // let customerData = "username=" + theEmailId + "&password=" + thePwd + "&grant_type=password";

        return this.restRepository.loginCustomer(theEmailId, thePwd)
            .pipe(
                map(response => {

                    //Stores the response object
                    let data: any = new Object();
                    //Sets the customerId
                    data.access_token = response;

                    //Sets the expiry time 
                    data.expires_in = new Date().getTime();

                    //set the  data obj into localStorage
                    this.storageRepository.storageCustomerTokenInfo = data;

                    this.fireSuccessLogin.emit();

                    return data;

                }), catchError(this.handleError)
            );
    }
    handleError(err) {
        // console.log("in error blog", err.error.error);
        let errorMessage: string = '';

        errorMessage = err.error.error;

        return throwError(err);
    }


    public get authenticated(): boolean {

        //Checks if token has stored in the localstorage (ie logged in)
        if (this.storageRepository.storageCustomerTokenInfo.token != "") return true;
        // if (this.auth_token == null) return false;

        //If the token hasn't stored in the localstorage(ie not logged in)
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

    getCustomerDetails(id: string) {

        return this.restRepository.getCustomerDetails(id)
            .pipe(
                map(response => {

                    //Stores the response object
                    let data = response;
                    return data;

                }), catchError(this.handleError)
            );
    }

    getCustomerAddresses(id: string) {

        return this.restRepository.getCustomerAddresses(id)
            .pipe(
                map(response => {

                    //Stores the response object
                    let data = response;
                    return data;

                }), catchError(this.handleError)
            );
    }

    saveCustomerInfo(custData: Customer) {
        return this.restRepository.saveCustomerInfo(custData)
            .pipe(
                map(response => {
                    return response;

                }), catchError(this.handleError)
            );
    }

    saveCustomerAddressInfo(custData: Customer) {
        return this.restRepository.saveCustomerAddressInfo(custData)
            .pipe(
                map(response => {
                    return response;

                }), catchError(this.handleError)
            );
    }

    deleteCustomerAddress(custId: string, addrId: string) {
        return this.restRepository.deleteCustomerAddress(custId, addrId)
            .pipe(
                map(response => {

                    return response;

                }), catchError(this.handleError)
            );
    }

    getSuccessEmitLogin() {
        return this.fireSuccessLogin;
    }

    increaseQuantity(productId: number, productQuantity: number) {
        return this.restRepository.increaseQuantity(productId, productQuantity)
            .pipe(
                map(response => {

                    return response;

                })
            );
    }

    saveCustomerOrder(product: any, custId: string) {
        return this.restRepository.saveCustomerOrder(product, custId)
            .pipe(
                map(response => {

                    return response;

                }), catchError(this.handleError)
            );
    }

    getCustomerOrder(custId: string){

        return this.restRepository.getCustomerOrder(custId)
        .pipe(
            map(response => {

                return response;

            }), catchError(this.handleError)
        );
    }
}