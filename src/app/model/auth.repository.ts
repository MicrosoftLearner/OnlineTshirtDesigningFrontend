import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { Admin } from "./admin.model";
import { LocalStorageRepository } from "./localStorage.repository";
import { error } from "util";
import { Options } from "selenium-webdriver/edge";


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

    public customerOrderedProduct(): Observable<any> {
        return this.http.get<any>(this.baseUrl + "customerOrderedProduct");
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