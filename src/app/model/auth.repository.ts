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
import { HomeBannerModel } from "./homeBannerModel";


@Injectable()

export class AuthRepository {
    private baseUrl: string;

    public auth_token: string;

    errorMessage: string;

    public orderDetailsResponse;

    public homeBannerDetailsResponse;

    constructor(private http: HttpClient, private storageRepository: LocalStorageRepository, private restRepository: RestDataRepository, private route: Router) {
        this.baseUrl = "http://localhost:58206/api/admin/";

    }

    homeBannerData(){
        let promise = new Promise((resolve, reject) => {
            this.restRepository.homeBannerData().toPromise().then(
                res => {
                    this.homeBannerDetailsResponse = res;
                    resolve();
                },
                err => {
                    alert("no data");
                    reject();
                }
            );

        });

        return promise;
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

    /**
     * customerOrderedProduct
     */
    public customerOrderedProduct() {

        let promise = new Promise((resolve, reject) => {
            this.restRepository.adminCustomerOrderedProducts().toPromise().then(
                res => {
                    this.orderDetailsResponse = res;
                    resolve();
                },
                err => {
                    console.log("Token error", error);

                    //Clear the Token stored in Web storage if the token has expired
                    //It will come to know from server, is token expired or not ?
                    this.storageRepository.clearAdminToken();
                    this.route.navigateByUrl("/main");
                    reject();
                    
                }
            );

        });

        return promise;
    }

    /**
     * uploadHomeBannerFileToActivity calls the API to send the uploaded file
     * at server
     */
    public uploadHomeBannerFileToActivity(theFilesToUpload:Array<File>, theUploadedFilesNames: string[]) {

        let promise = new Promise((resolve, reject) => {
            this.restRepository.uploadHomeBannerFileToActivity(theFilesToUpload, theUploadedFilesNames).toPromise().then(
                res => {
                    this.homeBannerDetailsResponse = res;
                    console.log(" this.homeBannerDetailsResponse",  this.homeBannerDetailsResponse);
                    resolve();
                },
                err => {
                    alert("no data");
                    reject();
                }
            );

        });

        return promise;
    }


}