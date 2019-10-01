import {Component  } from "@angular/core";
import { Form } from "@angular/forms";
import { AuthRepository } from "../model/auth.repository";

@Component({
 templateUrl: 'admin.component.html'
})
export class AdminComponent{

    constructor(private repository: AuthRepository){}

    checkTokenResponse(){
        console.log("Clicked to check token response");

        this.repository.customerOrderedProduct().subscribe(response => {
           console.log("after setting header", response);
        });
    }
}