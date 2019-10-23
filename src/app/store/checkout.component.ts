import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Product } from "../model/product";
import { ProductRepository } from "../model/product.repository";
import { ToastrService } from "ngx-toastr";
import { LocalStorageRepository } from "../model/localStorage.repository";
import { AuthCustomerRepository } from "../model/authCustomer.repository";


@Component({

    templateUrl:"checkout.component.html"
})

export class CheckoutComponent implements OnInit{
    
    public checkoutItem:Product = {};
    
    constructor(private repoistoryProduct: ProductRepository, private storageRepository: LocalStorageRepository, private route: ActivatedRoute, private repositoryAuthCust: AuthCustomerRepository, private toastr: ToastrService){

        //Converts the params string to int
        let productId = parseInt(route.snapshot.paramMap.get("productId"));
        
        //It sets the returned products 
        this.repoistoryProduct.getProductById(productId).then(() => {

            this.checkoutItem = this.repoistoryProduct.individualProuct;

            this.checkoutItem.ProductQuantity = 1;

            this.checkoutItem.ProductQuantityPrice = this.checkoutItem.ProductPrice;
        });
    }

    ngOnInit(){}

    decreaseQuantity(productId: number, productQuantity:number){
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

    increaseQuantity(productId: number, productQuantity:number){
        
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

        }else{
            this.toastr.warning("not more than 3 quantity");
        }
    }
}