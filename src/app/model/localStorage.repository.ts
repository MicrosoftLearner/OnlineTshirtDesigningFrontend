import { Injectable, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "./product";

@Injectable()

export class LocalStorageRepository {

    @Output() fireSuccessLogout:EventEmitter<any> = new EventEmitter();

    constructor(private route: Router) { }

    private _adminToken = { token: null, tokenExpiry: null };

    public get storageAdminTokenInfo(): any {
        //Reterive localstorage data
        let storedStorageData = JSON.parse(localStorage.getItem("adminTokenInfo"));

        if (storedStorageData != null) {
            //Store it in _adminToken Obj
            this._adminToken.token = storedStorageData.token;
            this._adminToken.tokenExpiry = storedStorageData.tokenExpiry;

        }

        return this._adminToken;
    }

    public set storageAdminTokenInfo(value: any) {

        //store the object fields in adminToken obj
        this._adminToken.token = value.access_token;
        this._adminToken.tokenExpiry = value.expires_in;

        //Stores the Obj in Web's local storage 
        //to access the values throughout the entire web app
        localStorage.setItem("adminTokenInfo", JSON.stringify(this._adminToken));

    }

    //clear the localStorage
    clearAdminToken() {

        localStorage.removeItem("adminTokenInfo");

        this.route.navigateByUrl("/admin/adminLogin")
    }


    private _customerToken = { token: "", tokenExpiry: "" };

    public get storageCustomerTokenInfo(): any {
        var hours = 24;
        //Reterives localstorage data
        let storedStorageData = JSON.parse(localStorage.getItem("customerTokenInfo"));

        if (storedStorageData != null && storedStorageData.tokenExpiry > (hours * 60 * 60 * 1000) ) {
           // console.log("storage exipiry not gone" , storedStorageData);
            //Stores it in _adminToken Obj

            this._customerToken.token = storedStorageData.token;
            this._customerToken.tokenExpiry = storedStorageData.tokenExpiry;

        }

        return this._customerToken;
    }

    public set storageCustomerTokenInfo(value: any) {

        //store the object fields in adminToken obj
        this._customerToken.token = value.access_token;
        this._customerToken.tokenExpiry = value.expires_in;

        //Stores the Obj in Web's local storage 
        //to access the values throughout the entire web app
        localStorage.setItem("customerTokenInfo", JSON.stringify(this._customerToken));

    }

    //clear the localStorage
    clearCustomerToken() {

        localStorage.removeItem("customerTokenInfo");
         
        this.fireSuccessLogout.emit();

        this.route.navigateByUrl("/store");
    }

    getSuccessEmitLogout(){
        return this.fireSuccessLogout;
    }
    
    // private _product : Product = {};

    // private  products: Array<Product> = [{}];

    // public get storageProductsInfo() : Array<Product> {
       
    //    return this.products;
    // }
    // public set storageProductsInfo(value : Product) {
       
    //        //Stores the product Obj in Web's local storage 
    //     //to access the values throughout the entire web app
    //     this._product = value;
    //     this.products = new Product {}
    // }
    
    
    // private _value : string;
    // public get value() : string {
    //     return this._value;
    // }
    // public set value(v : string) {
    //     this._value = v;
    // }
    

}