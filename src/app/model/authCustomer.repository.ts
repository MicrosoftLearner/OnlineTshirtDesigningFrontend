import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { LocalStorageRepository } from "./localStorage.repository";

import { Router } from "@angular/router";
import { RestDataCustomerRepository } from "./restDataCustomer.repository";

@Injectable()

export class AuthCustomerRepository {
    private baseUrl: string;

    constructor(private http: HttpClient, private storageRepository: LocalStorageRepository, private restRepository: RestDataCustomerRepository, private route: Router) {
        this.baseUrl = "http://localhost:58206/api/customer/";
    }

    authenticate(theEmailId: string, thePwd: string): Observable<any> {

        let customerData = "username=" + theEmailId + "&password=" + thePwd + "&grant_type=password";

        return this.restRepository.getCustometDetails(customerData)
            .pipe(
                map(response => {

                    //Stores the response object
                    let data = response;

                    //set the returned Token obj into localStorage
                    this.storageRepository.storageCustomerTokenInfo = data;

                    return data;
                },
                    err => {

                        console.log("Login info is incorrect");
                        return err;
                    })
            );
    }

}