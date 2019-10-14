import { Component, OnInit } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { AuthCustomerRepository } from "../model/authCustomer.repository";
import { ActivatedRoute } from "@angular/router";
import { Customer } from "../model/customer.model";
import { LocalStorageRepository } from "../model/localStorage.repository";

@Component({
    selector: "account",
    templateUrl: "account.component.html"
})

export class AccountComponent implements OnInit {

    public view: number = 1;

    public innerView: number = -1;

    public submitted: boolean = false;

    public customer: Customer = {};

    public isLoading: boolean =false;

    constructor(private repositoryAuthCust: AuthCustomerRepository, private route: ActivatedRoute, private storageRepository: LocalStorageRepository) { }

    ngOnInit() {
        let tabSelection: string;

        this.route.queryParams.subscribe(params => {

            tabSelection = params["tab"];
        });

        switch (tabSelection.toLowerCase()) {

            case "profile":
                this.view = 1;
                break;

            case "address":
                this.view = 2;

                break;
            case "order":
                this.view = 3;

                break;

            default:
                break;
        }

        this.showCustomerInfo();

    }
    showCustomerInfo() {

        this.isLoading = true;

        this.repositoryAuthCust.getCustomerDetails(this.storageRepository.storageCustomerTokenInfo.token)
            .subscribe(res => {

                this.customer = res;

                this.isLoading = false;
            },
                err => {
                    this.isLoading = false;
                }
            );

    }

    changeView(index: number) {
        this.view = index;
    }

    changeInnerView(index: number) {
        this.innerView = index;
    }

    saveInfo(form: NgForm, customer: Customer) {

        this.submitted = true;

        if (form.valid) {

            this.innerView = -1;

            customer.id = this.storageRepository.storageCustomerTokenInfo.token;

            if (customer.id != null)
                this.repositoryAuthCust.saveCustomerInfo(customer)
                    .subscribe(arg => {

                    });

        }
    }

}