import { Component } from "@angular/core";
import { Form } from "@angular/forms";
import { AuthRepository } from "../model/auth.repository";
import { LocalStorageRepository } from "../model/localStorage.repository";

@Component({
    templateUrl: 'admin.component.html'
})
export class AdminComponent {

    constructor(private repository: AuthRepository, private storageRepository: LocalStorageRepository) { }

    checkTokenResponse() {
        console.log("Clicked to check token response");

        this.repository.customerOrderedProduct().subscribe(response => {
            console.log("after setting header", response);
        },
            error => {
                console.log("error in fetching API", error);
            }
        );
    }
}