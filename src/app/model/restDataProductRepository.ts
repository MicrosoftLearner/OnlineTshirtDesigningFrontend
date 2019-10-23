import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()

export class RestDataProductRepository {

    private baseUrl: string;

    constructor(private http: HttpClient, ) {
        this.baseUrl = "http://localhost:58206/api/product/";
    }

    getHomeBannerProducts(): Observable<any> {
        return this.http.get<any>(this.baseUrl + "getHomeBannerProducts");
    }

    getProducts(): Observable<any> {
        return this.http.get<any>(this.baseUrl + "getProducts");
    }

    getProductById(id: number): Observable<any> {
        return this.http.get<any>(this.baseUrl + "getIndividualProduct/" + id);
    }

    getBlogs(): Observable<any> {
        return this.http.get<any>(this.baseUrl + "getBlogs");

    }
   
}