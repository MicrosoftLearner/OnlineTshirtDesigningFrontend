import { Component, OnInit } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { AuthCustomerRepository } from "../model/authCustomer.repository";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer, Customer1 } from "../model/customer.model";
import { LocalStorageRepository } from "../model/localStorage.repository";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "account",
    templateUrl: "account.component.html"
})

export class AccountComponent implements OnInit {

    public view: number = 1;

    public innerView: number = -1;

    public submitted: boolean = false;

    public customer: Customer = {};

    public customerEntireInfo: Array<Customer> = [];

    public order: any = [{}];

    public isLoading: boolean = false;

    public customerShipping;

    constructor(private repositoryAuthCust: AuthCustomerRepository, private route: ActivatedRoute, private storageRepository: LocalStorageRepository, private toastr: ToastrService, private routerLink: Router) {

        //Sets the country wise state and its cities
        this.customerShipping = [
            {
                country: { id: 1, name: "India" },

                states: [
                    { id: 1, stateCode: 100, name: "Andhra Pradesh" },
                    { id: 1, stateCode: 101, name: "Goa" },
                    { id: 1, stateCode: 102, name: "Kerala" },
                    { id: 1, stateCode: 103, name: "Maharashtra" }
                ],

                cities: [
                    { stateCode: 100, name: "Hyderabad" },
                    { stateCode: 101, name: "Panaji" },
                    { stateCode: 102, name: "Hyderabad" },
                    { stateCode: 103, name: "Mumbai" },

                ]
            }

        ];

    }

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

        this.showCustomerAddresses();

        this.showOrder();
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

    showCustomerAddresses() {

        this.isLoading = true;

        this.repositoryAuthCust.getCustomerAddresses(this.storageRepository.storageCustomerTokenInfo.token)
            .subscribe(res => {

                this.customerEntireInfo = res;

                this.isLoading = false;
            },
                err => {
                    this.isLoading = false;

                    //Shows the  adddress entry
                    this.innerView = 2;
                }
            );
    }

    changeView(index: number) {
        this.view = index;
    }

    changeInnerView(index: number, addrId?: string) {
        this.innerView = index;

        if (addrId != null) this.customer.addressId = addrId;
    }

    saveInfo(form:NgForm, cust: Customer) {

        this.submitted = true;

        if (form.valid) {
            console.log("form", cust);
            cust.id = this.storageRepository.storageCustomerTokenInfo.token;

            if (cust.id != null)
                this.repositoryAuthCust.saveCustomerInfo(cust)
                    .subscribe(res => {

                        //Makes the fields blank
                        cust.firstName = "";
                        cust.lastName = "";
                        cust.mobileNo = null
                        cust.email = "";

                        this.customer = res;

                        this.innerView = -1;

                        this.toastr.success("Your info has been updated successfully");

                    }, err => {
                        this.toastr.error("OOps something is wrong");
                    });

        } else this.toastr.error("form not validated");
    }


    saveAddressInfo(form: NgForm, cust: Customer) {

        this.submitted = true;

        if (form.valid) {
            console.log("form", cust);
            cust.id = this.storageRepository.storageCustomerTokenInfo.token;

            if (cust.id != null){

                this.repositoryAuthCust.saveCustomerAddressInfo(cust)
                    .subscribe(res => {

                        //Makes the fields blank
                        cust.address = "";
                        cust.city = "";
                        cust.country = "";
                        cust.state = "";
                        cust.pinCode = null;

                        this.customerEntireInfo = res;

                        this.innerView = -1;

                        this.toastr.success("Your address has been updated successfully");

                    }, err => {
                        this.toastr.error("OOps something is wrong");
                    });
            }

        } else   this.toastr.error("form not validated");
    }

    deleteAddress(custId: string, addrId: string) {

        if (custId != null && addrId != null) {

            this.isLoading = true;

            this.repositoryAuthCust.deleteCustomerAddress(custId, addrId)
                .subscribe(res => {

                    this.isLoading = false;
                    //Gets the updated addresses
                   this.showCustomerAddresses();
                },
                    err => {
                        this.isLoading = false;

                        this.toastr.error("Couldn't remove");
                    });
        }
    }

    selectedCountry(event) {
        console.log("ngModelChange", event.target.value);
    }

    selectedCity(e) {
        this.customer.city = e.target.innerText;
    }

    selectedState(event: any) {

        this.customer.state = event.target.innerText;

    }

    showOrder() {
     
        this.repositoryAuthCust.getCustomerOrder( this.storageRepository.storageCustomerTokenInfo.token)
            .subscribe(res => {
               
               this.order = res;
            });
    }

}