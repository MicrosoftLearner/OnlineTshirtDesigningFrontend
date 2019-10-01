import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import {Product  } from "../model/product";

@Injectable()
export class ProductRepository {

    baseUrl: string;

    private productObjArray;

    public individualProuct;

    constructor(private http: HttpClient) {
      
        this.baseUrl = "http://localhost:58206/api/";

        this.http.get(this.baseUrl + "product").subscribe(data => {
            this.productObjArray = data
        });

    }

    getProducts(): Array<Object> {

        return this.productObjArray;
    };

    
    getProductById(id: number): Observable<object> {
       return this.http.get<object>(this.baseUrl + "product/GetIndividualProdcut/" + id);
                 
    }
}
