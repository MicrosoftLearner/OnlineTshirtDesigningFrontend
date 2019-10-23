import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { AuthRepository } from "./auth.repository";
import { LocalStorageRepository } from "./localStorage.repository";
import { HomeBannerModel } from "./homeBannerModel";

@Injectable()

export class RestDataRepository {

    private baseUrl: string;

    constructor(private http: HttpClient, private storageRepository: LocalStorageRepository) {
        this.baseUrl = "http://localhost:58206/api/";
    }

    homeBannerData(){
        return this.http.get<any>(this.baseUrl + "admin/" + "homeBannerDetails", this.getOptions);
    }

    changeBannerName(nameDesc: any){
     
        return this.http.post<any>(this.baseUrl + "admin/" + "changeBannerName", nameDesc, this.getOptions);

    }

    adminCustomerOrderedProducts(): Observable<any> {
        
        return this.http.get<any>(this.baseUrl + "admin/" + "customerOrderedProduct", this.getOptions);
    }


    uploadHomeBannerFileToActivity(theFilesToUpload:Array<File>, theUploadedFilesNames: string[]):Observable<any>{

      let formData: FormData = new FormData();

      for (let index = 0; index < theFilesToUpload.length; index++) {
          
          formData.append("uploadedFiles", theFilesToUpload[index] , theUploadedFilesNames[index]);
      }
    
      return this.http.post<any>(this.baseUrl + "admin/" + "saveBannerDetails", formData);
    //   .pipe(
    //     map(response => {

    //         //Stores the response object
    //         let data = response;
    //         console.log("restRepo", data);
    //     }, err => {console.log("error", err)}
    //     )
    //   );
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