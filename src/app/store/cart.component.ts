import { Component, OnInit } from "@angular/core";
import { NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";
import { CartRepository } from "../model/cart.repository";
import { ToastrService } from "ngx-toastr";
import { LocalStorageRepository } from "../model/localStorage.repository";

@Component({

    selector: "cart",
    templateUrl:"cart.component.html"
})

export class CartComponent implements OnInit{

    public products = {};

    constructor(private repositoryCart: CartRepository,  private storageRepository: LocalStorageRepository, private toastr: ToastrService){}

        ngOnInit() {
           
           this.getCustomerCart(); 
        }

    getCustomerCart() {
       
        this.repositoryCart.getCart(this.storageRepository.storageCustomerTokenInfo.token)
        .subscribe(res => {
            
            this.products = res;

            console.log("Products", this.products);

        }, err => {
          this.toastr.warning("already added in the cart");
        });
    }
}