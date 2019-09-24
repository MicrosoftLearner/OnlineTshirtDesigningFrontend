import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders  } from "@angular/common/http";
import { Observable } from "rxjs";

//Declare the port and protocol

// const  PROTOCOL = "http";
// const   PORT = "";

@Injectable()
export class RestDataSource{

    baseUrl: string;

    private productObjArray;

    constructor(private http: HttpClient){
        this.baseUrl = "http://localhost:58206/api/";
    }

    getProducts(){
       return this.http.get(this.baseUrl + "product").subscribe(data => {
           this.productObjArray = data
        });
    }

    getProductById(id: number){
        this.http.post(this.baseUrl + "product/" , id);
    }

}