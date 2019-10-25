import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Product } from "../model/product";
import { ProductRepository } from "../model/product.repository";
import { ToastrService } from "ngx-toastr";
import { LocalStorageRepository } from "../model/localStorage.repository";
import { AuthCustomerRepository } from "../model/authCustomer.repository";
import { Customer } from "../model/customer.model";
import { NgForm } from "@angular/forms";


@Component({

    templateUrl: "checkout.component.html"
})

export class CheckoutComponent implements OnInit {

    public checkoutItem: Product = {};

    //Sets the customer email & password  
    public customer: Customer = {};

    public addressOld: any = {};

    //Sets true and false for ng-valid and ng-invalid operations
    public submitted: boolean = false;

    //Shows the loader 
    public isLoading: boolean = false;

    public view: number;

    public innerView: string = 'login';

    public loggedUser: boolean = false;

    constructor(private repoistoryProduct: ProductRepository, private storageRepository: LocalStorageRepository, private route: ActivatedRoute, private routerLink: Router, private repositoryAuthCust: AuthCustomerRepository, private toastr: ToastrService) {

        //Converts the params string to int
        let productId = parseInt(route.snapshot.paramMap.get("productId"));

        let productSize = (route.snapshot.paramMap.get("productSize"));

        //It sets the returned products 
        this.repoistoryProduct.getProductById(productId).then(() => {

            this.checkoutItem = this.repoistoryProduct.individualProuct;

            this.checkoutItem.ProductQuantity = 1;

            this.checkoutItem.ProductSize = productSize;

            this.checkoutItem.ProductQuantityPrice = this.checkoutItem.ProductPrice;
        });
    }

    ngOnInit() {

        this.checkRegistredCustomer();

        this.showAddressDetails();

    }
    showAddressDetails() {
        //Gets the customer details
        this.repositoryAuthCust.getCustomerAddresses(this.storageRepository.storageCustomerTokenInfo.token)
            .subscribe(res => {

                this.addressOld = res[0];

            },
                err => {

                }
            );
    }

    checkRegistredCustomer() {

        if (this.repositoryAuthCust.authenticated) {

            //Gets the customer details
            this.repositoryAuthCust.getCustomerDetails(this.storageRepository.storageCustomerTokenInfo.token)
                .subscribe(res => {

                    this.customer.firstName = res.CustFirstName;
                    this.customer.lastName = res.CustLastName;
                    this.customer.email = res.CustEmailAddr;
                    this.customer.mobileNo = res.CustMobNo;

                });

            this.loggedUser = true;

            this.view = 2;

            return;
        }

        this.loggedUser = false;
    }

    changeView(index: number) {
        this.view = index;
    }

    changeInnerView(tab: string) {
        this.innerView = tab;

    }

    checkCustomerLogin(form: NgForm, customer: Customer) {

        this.submitted = true;

        if (form.valid) {

            this.isLoading = true;

            this.repositoryAuthCust.login(customer.email, customer.pwd)
                .subscribe(res => {

                    this.isLoading = false;

                    this.view = 2;
                },
                    err => {

                        this.isLoading = false;

                        this.toastr.error("Incorrect credentials");

                        // this.toastr.error(err.error.error_description);
                    });

        }

    }

    customerSignup(form: NgForm, cust: Customer) {

        this.submitted = true;

        if (form.valid) {

            this.repositoryAuthCust.signUp(cust)
                .subscribe(res => {


                },
                    err => {
                        this.toastr.error("Email already exist");

                    });

        }
    }

    decreaseQuantity(productId: number, productQuantity: number) {
        productQuantity--;

        this.checkoutItem.ProductQuantity = productQuantity;

        if (productQuantity >= 1) {

            this.repositoryAuthCust.increaseQuantity(productId, productQuantity)
                .subscribe(res => {

                    this.checkoutItem.ProductQuantityPrice = res;

                }, err => {
                    this.toastr.warning("error");
                });

        }

    }

    increaseQuantity(productId: number, productQuantity: number) {

        //Increases the given quantity
        productQuantity++;

        if (productQuantity >= 1 && productQuantity <= 3) {

            this.repositoryAuthCust.increaseQuantity(productId, productQuantity)
                .subscribe(res => {

                    this.checkoutItem.ProductQuantity = productQuantity;
                    this.checkoutItem.ProductQuantityPrice = res;

                }, err => {
                    this.toastr.warning("error");
                });

        } else {
            this.toastr.warning("not more than 3 quantity");
        }
    }

    placeOrder() {
     
        this.repositoryAuthCust.saveCustomerOrder(this.checkoutItem, this.storageRepository.storageCustomerTokenInfo.token)
            .subscribe(arg => {

                this.toastr.success("Product has been successfully ordered");

                let routeUrl = `/orderDetails/${this.storageRepository.storageCustomerTokenInfo.token}`;

                this.routerLink.navigateByUrl(routeUrl);

            });
    }

}