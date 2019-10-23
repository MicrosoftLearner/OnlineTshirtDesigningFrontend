import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer, Customer1 } from "./customer.model";
import { LocalStorageRepository } from "./localStorage.repository";
import { Options } from "selenium-webdriver/safari";

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

    getCustomerAddresses(id: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + "getAddresses/" + id);
    }

    saveCustomerInfo(custData: Customer): Observable<any> {

        let data:Customer1 = {};
        data.CustId = custData.id;
        data.CustFirstName = custData.firstName;
        data.CustLastName = custData.lastName;
        data.CustMobNo = custData.mobileNo;
        data.CustEmailAddr = custData.email;
        data.CustImg = custData.img;

        return this.http.post<any>(this.baseUrl + "saveRewrittenInfo", data )
    }

    saveCustomerAddressInfo(custData: Customer): Observable<any> {

        let data:Customer1 = {};
        data.CustId = custData.id;
        data.CustAddrId = custData.addressId;
        data.CustShipAddr = custData.address;
        data.CustShipCity = custData.city;
        data.CustShipCountry = custData.country;
        data.CustShipPinCode = custData.pinCode;
        data.CustShipState = custData.state;

        return this.http.post<any>(this.baseUrl + "saveRewrittenAddressInfo", data )
    }

    deleteCustomerAddress(custId: string, addrId: string): Observable<any> {

        let data = new HttpParams().set("addrId", addrId);

        let options = { params: data }

        return this.http.delete<any>(this.baseUrl + "deleteAddr/" + addrId);
    }

    increaseQuantity(productId: number, productQuantity: number): Observable<any> {

        let data = { ProductId: productId, ProductQuantity: productQuantity }

        return this.http.put<any>(this.baseUrl + "escalateQuantity", data);
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