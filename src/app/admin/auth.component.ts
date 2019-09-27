import {Component  } from "@angular/core";
import { NgForm, Form } from "@angular/forms";

@Component({
 selector: 'auth',
 templateUrl: 'auth.component.html'
})
export class AuthComponent{

    public obj = {email: "", pwd: ""};
    public submitted: boolean = false;

    checkAdminLogin(form:NgForm){

      this.submitted = true;
      alert("form submitted call");

    }

}