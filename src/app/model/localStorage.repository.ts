import { Injectable, OnInit } from "@angular/core";

@Injectable()

export class LocalStorageRepository {

    constructor() { }

    private _adminToken = { token: "", tokenExpiry: "" };

    public get storageAdminTokenInfo(): any {
        //Reterive localstorage data
     //   let storedStorageData =  JSON.parse(localStorage.getItem("adminTokenInfo"));
        
        //Store it in _adminToken Obj
        //  this._adminToken.token = storedStorageData.token;
        //  this._adminToken.tokenExpiry = storedStorageData.tokenExpiry;

        return JSON.parse(localStorage.getItem("adminTokenInfo"));
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
    clearAdminToken():boolean {
        
        let storageClearStatus:boolean =  false;
        try {
            localStorage.removeItem("adminTokenInfo");
            storageClearStatus = true;
       
       
        } catch (error) {
           console.error("Could not remove the item", error);
           storageClearStatus = false;
     
        }

       return storageClearStatus;
    }


}