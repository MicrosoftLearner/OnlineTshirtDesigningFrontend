import { Component, AfterViewInit, OnInit } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { AuthRepository } from "../model/auth.repository";
import { LocalStorageRepository } from "../model/localStorage.repository";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, tap, catchError } from "rxjs/operators";


import { HomeBannerModel } from "../model/homeBannerModel";

@Component({
    templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit {

    public orderDetails;

    public homeBannerDetailsResponse;

    public homeBannerInput: Array<HomeBannerModel> = [];
    //  { bannerFile: , bannerName: "", bannerDesc: "" };


    // sets for ng-valid & ng-invalid operations
    public submitted: boolean = false;

    //Shows the selected images names
    public imagesNames: boolean = false;

    //Shows the error message if no file or higher files
    //selected
    public errorMessage: string;

    //Set it to -1 to hide the info section by default
    public activeIndex: number = -1;

    private filesToUpload: Array<File> = [];

    private filesToUploadIndex: number = 0;

    public uploadedFilesNames: string[] = [];

    //Sets the loader
    public isLoading: boolean = false;

    constructor(private authRepository: AuthRepository, private storageRepository: LocalStorageRepository, private route: Router, private http: HttpClient) { }

    ngOnInit() {

        this.showOrderedProducts();

        this.showHomeBannerData();
    }

    showHomeBannerData() {


        this.authRepository.homeBannerData().
            then(() => {

                this.homeBannerDetailsResponse = this.authRepository.homeBannerDetailsResponse;
                console.log(" this.homeBannerDetailsResponse", this.homeBannerDetailsResponse);

                //Hides the loader as it gets response    
                this.isLoading = false;
            });
        //Shows the loader
        this.isLoading = true;
    };

    showPanel(index: number) {
        //settting to a particular activeIndex to the current index
        //will display the tabs based on click button
        this.activeIndex = index;
    }

    showOrderedProducts() {

        //Call API to get customers ordered products
        this.authRepository.customerOrderedProduct().then(() => {
            this.orderDetails = this.authRepository.orderDetailsResponse;

            this.isLoading = false;
        });
        this.isLoading = true;
    }

    changeBannerFile(filesToInput: FileList) {

        this.filesToUpload.push(filesToInput.item(0));

        this.uploadedFilesNames.push(this.filesToUpload[this.filesToUploadIndex].name);
        console.log("fileNames", this.filesToUpload);

        this.filesToUploadIndex++;

        this.imagesNames = true;

    }

    uploadBannerInfo(form: NgForm) {

        if (this.filesToUpload.length === 0) {
            this.errorMessage = "Select atleast 1 file";
        }
        else if (this.filesToUpload.length > 3) {
            this.errorMessage = "Not greater than 3 files";
        }
        else {

            if (this.filesToUpload.length > 0) {

                //Calls to the service
                this.authRepository.uploadHomeBannerFileToActivity(this.filesToUpload, this.uploadedFilesNames).then(() => {
                    this.homeBannerDetailsResponse = this.authRepository.homeBannerDetailsResponse;

                    //Makes the arrays empty
                    this.filesToUpload = [];
                    this.uploadedFilesNames = [];

                    //Disables the well
                    this.imagesNames = false;

                    this.isLoading = false;
                });

                this.isLoading = true;
            }
        }

    }

    changeBannerName(nameDesc: any) {

        // //Tests the conditions in the form of Truth tables(AND) 
        // //for ng-valid and ng-invalid
        this.submitted = true;
        console.log("nameDesc", nameDesc);
        this.authRepository.changeBannerName(nameDesc).then(() => {
            this.homeBannerDetailsResponse = this.authRepository.homeBannerDetailsResponse;

            this.isLoading = false;
        });
        this.isLoading = true;

    }

    logout() {

        this.storageRepository.clearAdminToken();

    }

}