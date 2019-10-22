import { Component, OnInit } from "@angular/core";
import { Form } from "@angular/forms";
import { CartRepository } from "../model/cart.repository";
import { LocalStorageRepository } from "../model/localStorage.repository";
import { AuthCustomerRepository } from "../model/authCustomer.repository";

@Component({
    selector: "cart-summery",
    templateUrl: "cartSummery.component.html"
})

export class CartSummeryComponent implements OnInit {

    public cartProducts: any = {};

    public length: number = 0;

    constructor(private repositoryCart: CartRepository, private storageRepository: LocalStorageRepository, private repositoryAuthCust: AuthCustomerRepository) {

    }

    ngOnInit() {

        this.showCart();

        this.showUpdatedCart();

    }

    showUpdatedCart() {
      
        this.repositoryCart.getUpdatedEmitCart().
        subscribe( emitValue => {

            this.cartProducts = emitValue;

          //  this.length = this.cartProducts.m_Item1.length;
        });

        this.repositoryCart.getRemovedEmitCart().
        subscribe( emitValue => {

           this.showCart();
          //  this.length = this.cartProducts.m_Item1.length;
        });

       this.repositoryAuthCust.getSuccessEmitLogin()
           .subscribe(emitValue => {

            this.showCart();
           });
       
    }

    showCart() {
      
        if (this.repositoryAuthCust.authenticated) {

            this.cartProducts = this.repositoryCart.getCart(this.storageRepository.storageCustomerTokenInfo.token)
                .subscribe(res => {

                    this.cartProducts = res;

                    this.length = this.cartProducts.m_Item1.length;

                }, err => { }
                );
        }
    }
}