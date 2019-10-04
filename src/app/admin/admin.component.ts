import { Component, AfterViewInit, OnInit } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { AuthRepository } from "../model/auth.repository";
import { LocalStorageRepository } from "../model/localStorage.repository";
import { Router } from "@angular/router";

import { Admin } from "../model/admin.model";

@Component({
    templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit {

    public orderDetails;

    public homeBannerDetailsResponse;

    public homeBannerInput = { bannerFile: null, bannerName: "", bannerDesc: "" };

    // sets for ng-valid & ng-invalid operations
    public submitted: boolean = false;

    //Set it to -1 to hide the info section by default
    public activeIndex: number = -1;

    private fileToUpload: File;

    constructor(private authRepository: AuthRepository, private storageRepository: LocalStorageRepository, private route: Router) { }

    ngOnInit() {

        this.showOrderedProducts();
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
        });

    }

    changeBannerFile(files: FileList) {

        this.fileToUpload = files.item(0);

        this.homeBannerInput.bannerFile = this.fileToUpload;
        console.log("File", this.homeBannerInput.bannerFile);
        // this.authRepository.uploadHomeBannerFileToActivity(this.fileToUpload).then(() => {
        //     this.homeBannerDetailsResponse = this.authRepository.homeBannerDetailsResponse;
        // });
    }

    uploadBannerInfo(form: NgForm) {
        //Tests the conditions in the form of Truth tables(AND) 
        //for ng-valid and ng-invalid
        this.submitted = true;

        if (form.valid) {
            console.log("bannerObj", this.homeBannerInput);
        }
    }

}