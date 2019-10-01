import { Injectable, OnInit } from "@angular/core";

@Injectable()

export class LocalStorageRepository {

    constructor() { }

    private _adminToken = { token: "", tokenExpiry: "" };

    public get storageAdminTokenInfo(): any {

        return JSON.parse(localStorage.getItem("adminTokenInfo"));
    }

    public set storageAdminTokenInfo(value: any) {

        //store the object fields in adminToken obj
        this._adminToken.token = value.access_token;
        this._adminToken.tokenExpiry = value.expires_in;

        //Store the values in Web's local storage 
        //to access the values throughout the entire web app
        localStorage.setItem("adminTokenInfo", JSON.stringify(this._adminToken));

    }

    //clear the localStorage
    clearAdminToken() {
        localStorage.removeItem("adminTokenInfo");
    }


}