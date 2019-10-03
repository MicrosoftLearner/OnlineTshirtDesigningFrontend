import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { Admin } from "./admin.model";
import { LocalStorageRepository } from "./localStorage.repository";
import { error } from "util";
import { Options } from "selenium-webdriver/edge";
import { Router } from "@angular/router";
import { RestDataRepository } from "./restDataRepository";
import { resolve, reject } from "q";


@Injectable()

export class AuthRepository {
    private baseUrl: string;

    public auth_token: string;

    errorMessage: string;

    constructor(private http: HttpClient, private storageRepository: LocalStorageRepository, private restRepository: RestDataRepository, private route: Router) {
        this.baseUrl = "http://localhost:58206/api/admin/";
    }

    authenticate(theEmailId: string, thePwd: string): Observable<any> {

        var adminData = "username=" + theEmailId + "&password=" + thePwd + "&grant_type=password";
        // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','No-Auth':'True' });

        return this.http.post<any>("http://localhost:58206/token", adminData, {

            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'No-Auth': 'True'
            })
        }).pipe(
            map(response => {

                //Stores the response object
                let data = response;

                //set the returned Token obj into localStorage
                this.storageRepository.storageAdminTokenInfo = data;

                return data;
            })
        );
    }

    public get authenticated(): boolean {

        if (this.storageRepository.storageAdminTokenInfo.token != null) return true;
        // if (this.auth_token == null) return false;
        return false;
    }

    public  customerOrderedProduct(): Observable<any> {

        let orderDetails; //stores response Object;
        return  this.http.get<any>(this.baseUrl + "customerOrderedProduct", this.getOptions);

    }

    /**
     * name
     */
    public testAsync():any {
        let orderDetails;
        return this.restRepository.adminCustomerOrderedProducts().subscribe(res => {
                        console.log("new promise", res);
                        orderDetails = res;
                      
                    },
                    err => {
                        console.log("Token error", error);
    
                        //Clear the Token stored in Web storage if the token has expired
                        //It will come to know from server, is token expired or not ?
                        //  this.storageRepository.clearAdminToken();
            
                        this.route.navigateByUrl("/main");
    
                    });
        // let  a = new Admin();
        // let promise = new Promise((resolve, reject) => {
        //     this.restRepository.adminCustomerOrderedProducts().toPromise().then(
        //         res => {
        //             console.log("new promise", res);
        //             orderDetails = res;
        //             a.name = res;
        //             resolve();
        //         },
        //         err => {
        //             console.log("Token error", error);

        //             //Clear the Token stored in Web storage if the token has expired
        //             //It will come to know from server, is token expired or not ?
        //             //  this.storageRepository.clearAdminToken();
        //             reject();
        //             this.route.navigateByUrl("/main");

        //         }
        //     );

        // });
        // console.log("Promise", promise);
        // return promise;
    }

    private get getOptions(): any {
        return {
            headers: new HttpHeaders({
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'No-Auth': 'True',
                "Authorization": `Bearer ${this.storageRepository.storageAdminTokenInfo.token}`
            })
        }
    }
}