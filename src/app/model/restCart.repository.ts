import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer, Customer1 } from "./customer.model";
import { LocalStorageRepository } from "./localStorage.repository";


@Injectable()

export class RestCartRepository {

    private baseUrl: string;

    constructor(private http: HttpClient, private storageRepository: LocalStorageRepository) {
        this.baseUrl = "http://localhost:58206/api/cart/";
    }

    addToCart(productId: number, customerId: string,  productPrice: number): Observable<any> {

        let data = { ProductId: productId, CustId: customerId, productQuantityPrice: productPrice}

        return this.http.put<any>(this.baseUrl + "addToCart"  ,  data);
    }

    getCart(customerId: string): Observable<any>{
        return this.http.get<any>(this.baseUrl + "getCart/" + customerId); 
    }

    increaseQuantity(productId: number, customerId: string,  productQuantity:number): Observable<any>{

        let data  = {ProductId: productId, CustId: customerId, ProductQuantity: productQuantity}

        return this.http.put<any>(this.baseUrl + "escalateQuantity" , data); 

    }

    deleteCart(cartId: number, customerId: string):Observable<any>{

        return this.http.delete<any>(this.baseUrl + "deleteCart/" + cartId + "/" + customerId); 

    }
}