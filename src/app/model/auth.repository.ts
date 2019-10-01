import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { Admin } from "./admin.model";
import { LocalStorageRepository } from "./localStorage.repository";
import { error } from "util";


@Injectable()

export class AuthRepository {
    private baseUrl: string;

    public auth_token: string;

    errorMessage: string;

    constructor(private http: HttpClient, private storageRepository: LocalStorageRepository) {
        this.baseUrl = "http://localhost:58206/admin/";
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
                this.auth_token = response.error != "Invalid_grant" ? response.access_token : null;

                //if the the Email address & password are correct 
                //set the returned Token obj into localStorage
                if (this.auth_token != null)
                    this.storageRepository = response;

                return this.auth_token;
            }),catchError(e => throwError(e))
        );
    }
    handleError(error) {
        if (error.error instanceof HttpResponse) {
            //client side error
            this.errorMessage = `message ${error.error}`;
        }
        this.errorMessage = `message ${error.error}`;

        window.alert(this.errorMessage);

       // return throwError(this.errorMessage);

    }


    public get authenticated(): boolean {

        if (this.storageRepository.storageAdminTokenInfo.token == null) return false;
        // if (this.auth_token == null) return false;
        return true;
    }

    public customerOrderedProduct(): Observable<any> {
        return this.http.get<any>(this.baseUrl + "customerOrderedProduct", this.getOptions);
    }

    private get getOptions(): any {
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer<${this.storageRepository.storageAdminTokenInfo.token}>`
            })
        }
    }


}