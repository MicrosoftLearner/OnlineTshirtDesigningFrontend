import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgForm, Form } from "@angular/forms";
import { Router } from "@angular/router";

import { Admin } from "../model/admin.model";
import { AuthRepository } from "../model/auth.repository";
import { AuthGuardRepository } from "../model/auth.guard";
import { catchError } from "rxjs/operators";


@Component({
  templateUrl: 'auth.component.html'
})
export class AuthComponent implements AfterViewInit {

  public adminInfo: Admin = {};

  public submitted: boolean = false; // use for ng-valid validations

  public errorMessageStatus: boolean = false; // to hide and show the message box

  public errorMessage: string;

  //Sets the loader
  public isLoading: boolean = false;

  constructor(private repository: AuthRepository, private guardRepository: AuthGuardRepository,
    private route: Router) { }

    ngAfterViewInit() {
   // this.checkToken();
  }
  checkToken() {
   if (this.guardRepository.canActivateAdmin()) this.route.navigateByUrl("/admin/adminLogin");
  }

  checkAdminLogin(form: NgForm) {

    this.submitted = true;

    if (form.valid) {

      //Shows the loader
      this.isLoading = true;

      this.repository.authenticate(this.adminInfo.emailId, this.adminInfo.pwd).subscribe(response => {
        //Hides the loader
        this.isLoading = false;
        this.route.navigateByUrl("/admin/main");

      }, err => {
        this.errorMessage = "Admin name & password dont match";

        this.errorMessageStatus = true;

        this.isLoading = false;
      });

    } else {
      this.errorMessage = "Form Data is invalid";
    }
  }

}