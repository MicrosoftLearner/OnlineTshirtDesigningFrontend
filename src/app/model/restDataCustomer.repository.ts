import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()

export class RestDataCustomerRepository {

    private baseUrl: string;

    constructor(private http: HttpClient, ) {
        this.baseUrl = "http://localhost:58206/api/customer/";
    }

    getCustometDetails(customerData): Observable<any> {

        return this.http.post<any>("http://localhost:58206/token", customerData, {

            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'No-Auth': 'True'
            })
        })
    }
}