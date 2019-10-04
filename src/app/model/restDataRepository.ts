import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthRepository } from "./auth.repository";
import { LocalStorageRepository } from "./localStorage.repository";

@Injectable()

export class RestDataRepository {

    private baseUrl: string;

    constructor(private http: HttpClient, private storageRepository: LocalStorageRepository) {
        this.baseUrl = "http://localhost:58206/api/";
    }

    adminCustomerOrderedProducts(): Observable<any> {
        
        return this.http.get<any>(this.baseUrl + "admin/" + "customerOrderedProduct", this.getOptions);
    }

    uploadHomeBannerFileToActivity(files:File):Observable<any>{
      return this.http.get<any>(this.baseUrl + "admin/" + "UploadHomeBannerFile", this.getOptions)
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