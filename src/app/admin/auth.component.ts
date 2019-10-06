import { Component } from "@angular/core";
import { NgForm, Form } from "@angular/forms";
import { Router } from "@angular/router";

import { Admin } from "../model/admin.model";
import { AuthRepository } from "../model/auth.repository";
import { AuthGuardRepository } from "../model/auth.guard";
import { catchError } from "rxjs/operators";


@Component({
  templateUrl: 'auth.component.html'
})
export class AuthComponent {

  public adminInfo: Admin = {};

  public submitted: boolean = false; // use for ng-valid validations

  public errorMessageStatus: boolean = false; // to hide and show the message box

  public errorMessage: string;

  constructor(private repository: AuthRepository, private guardRepository: AuthGuardRepository,
    private router: Router) { }

  checkAdminLogin(form: NgForm) {

    this.submitted = true;

    if (form.valid) {

      this.repository.authenticate(this.adminInfo.emailId, this.adminInfo.pwd).subscribe(response => {

        this.router.navigateByUrl("/main");

      }, err => {
        this.errorMessage = "Admin name & password dont match";

        this.errorMessageStatus = true;
      });

    } else {
      this.errorMessage = "Form Data is invalid";
    }
  }

  navigateUrl(){
    this.router.navigateByUrl("/main");
  }
}