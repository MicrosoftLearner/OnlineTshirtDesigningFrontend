import { Component, OnInit } from "@angular/core";
import { NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, RouterStateSnapshot, Router } from "@angular/router";

import { ProductRepository } from "../model/product.repository";
import { Product } from "../model/product";
import { AuthCustomerRepository } from "../model/authCustomer.repository";
import { LocalStorageRepository } from "../model/localStorage.repository";
import { CartRepository } from "../model/cart.repository";
import { ToastrService } from "ngx-toastr";

@Component({

    selector: "individual-product",
    templateUrl: "individualProduct.component.html"
})

export class IndividualProductComponent {

    id: number;

    public indvProduct: Product = {};

    public quantityStatus: string;

    constructor(private repoistoryProduct: ProductRepository, private repositoryAuthCust: AuthCustomerRepository, private storageRepository: LocalStorageRepository, private repositoryCart: CartRepository, private route: ActivatedRoute, private toastr: ToastrService, private routeLink: Router) {
        console.log("Individual prod constructor");

        //Converts the params string to int
        this.id = parseInt(route.snapshot.paramMap.get("productId"));

        //Sets the quantity status before selecting size options
        this.quantityStatus = "Select the size";
    }

    ngOnInit() {

        this.showIndividualProduct();
    }
    showIndividualProduct() {
        //It sets the returned products 
        this.repoistoryProduct.getProductById(this.id).then(() => {
            this.indvProduct = this.repoistoryProduct.individualProuct;
        });
    }

    selectProductSize(event: any) {

        this.indvProduct.ProductSize = event;

        //Set the product size quantity when size selection happens 
        switch (event) {
            case "M":
                this.quantityStatus = this.indvProduct.ProductSizeQuantM.toString();
                break;

            case "XL":
                this.quantityStatus = this.indvProduct.ProductSizeQuantXL.toString();
                break;

            case "XXL":
                this.quantityStatus = this.indvProduct.ProductSizeQuantXXL.toString();
                break;

            default:
                break;
        }
    }

    addToCart(productId: number, productPrice: number, productSize: string) {

        if (this.repositoryAuthCust.authenticated) {

            this.repositoryCart.addToCart(productId, this.storageRepository.storageCustomerTokenInfo.token, productPrice, productSize)
                .subscribe(res => {

                    this.toastr.success("Product added in the cart");

                }, err => {
                    this.toastr.warning("already added in the cart with same size");
                });

        } else {
            this.toastr.warning("needs to be logged in 1st");

        }
    }

    checkout(productId: number, productSize: string) {

        if (this.repositoryAuthCust.authenticated){

            //Sends the entire product obj to repo to get back the 
            //data on chekout component
            let url  = `/checkout/${productId}/${productSize}`;
            this.routeLink.navigateByUrl(url);
        }
        else{
            this.toastr.error("Please login first");
            this.routeLink.navigateByUrl("/login");
        }
    }
}