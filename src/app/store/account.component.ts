import { Component, OnInit } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { AuthCustomerRepository } from "../model/authCustomer.repository";
import { ActivatedRoute } from "@angular/router";
import { Customer } from "../model/customer.model";
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

    public customer: Customer = { };

    public customerEntireInfo: Array<Customer> = [];

    public isLoading: boolean = false;

    public customerShipping;

    constructor(private repositoryAuthCust: AuthCustomerRepository, private route: ActivatedRoute, private storageRepository: LocalStorageRepository, private toastr: ToastrService) {

        //Sets the country wise state and its cities
        this.customerShipping = [
            {
                country: { id: 1, name: "India" },

                states: [
                    { id: 1, stateCode: 100, name: "Andhra Pradesh"},
                    { id: 1, stateCode: 101, name: "Goa" },
                    { id: 1, stateCode: 102, name: "Kerala" },
                    { id: 1, stateCode: 103, name: "Maharashtra"}
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

    saveAddressInfo(form: NgForm, cust: Customer) {

        this.submitted = true;

        if (form.valid) {

            console.log("form is validatd", cust);
         //   this.innerView = -1;

          //  customer.id = this.storageRepository.storageCustomerTokenInfo.token;

            // if (customer.id != null)
            //     this.repositoryAuthCust.saveCustomerInfo(customer)
            //         .subscribe(arg => {

            //         });

        }else alert("form not validated");
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

    selectedCountry(event){
       console.log("ngModelChange", event.target.value);
    }

    selectedCity(e){
        console.log("event.target.value", e.target.innerText);
        this.customer.city = e.target.innerText;
    }

    selectedState(event:any){
        console.log("event.target.value", event.target.innerText);

        this.customer.state = event.target.innerText;
     
    }

}