import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer, Customer1 } from "./customer.model";
import { LocalStorageRepository } from "./localStorage.repository";

@Injectable()

export class RestDataCustomerRepository {

    private baseUrl: string;

    constructor(private http: HttpClient, private storageRepository: LocalStorageRepository) {
        this.baseUrl = "http://localhost:58206/api/customer/";
    }

    loginCustomer(theEmailId: string, thePwd: string): Observable<any> {

        let data: Customer1 = new Object();
        data.CustEmailAddr = theEmailId;
        data.CustPwd = thePwd

        return this.http.post<any>(this.baseUrl + "login", data)
    }

    signUpCustomer(customerData: Customer): Observable<any> {
        let data: Customer1 = new Object();

        data.CustEmailAddr = customerData.email;
        data.CustFirstName = customerData.firstName;
        data.CustLastName = customerData.lastName;
        data.CustMobNo = customerData.mobileNo;
        data.CustPwd = customerData.pwd;

        return this.http.post<any>(this.baseUrl + "signUp", data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })

    }

    getCustomerName(): Observable<any> {

        return this.http.post<any>(this.baseUrl + "getName", this.getOptions)
    }

    getCustomerDetails(id: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + "getData/" + id);
    }

    private get getOptions(): any {
        return {
            headers: new HttpHeaders({
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'No-Auth': 'True',
                "Authorization": `Bearer ${this.storageRepository.storageCustomerTokenInfo.token}`
            })
        }
    }
}