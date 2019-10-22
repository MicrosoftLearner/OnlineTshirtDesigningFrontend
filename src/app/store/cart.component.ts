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


        }, err => {
          this.toastr.warning("already added in the cart");
        });
    }

    decreaseQuantity(cartID: number, productQuantity:number){
        productQuantity--;

        if (productQuantity >= 1) {
            
            this.repositoryCart.increaseQuantity(cartID, this.storageRepository.storageCustomerTokenInfo.token, productQuantity)
            .subscribe(res => {
                
                this.products = res;
    
    
            }, err => {
              this.toastr.warning("error");
            });

        }
        
    }

    increaseQuantity(cartID: number, productQuantity:number){
        
        //Increases the given quantity
        productQuantity++;
       
        if (productQuantity >= 1 && productQuantity <= 3) {
            
            this.repositoryCart.increaseQuantity(cartID, this.storageRepository.storageCustomerTokenInfo.token, productQuantity)
            .subscribe(res => {
                
                this.products = res;
    
                console.log("res", res);
    
            }, err => {
              this.toastr.warning("error");
            });

        }else{
            this.toastr.warning("not more than 3 quantity");

        }
    }

    removeCartItem(cartId: number){

        this.repositoryCart.deleteCart(cartId, this.storageRepository.storageCustomerTokenInfo.token)
        .subscribe(res => {

         this.toastr.success("Item deleted successfully");

         //Calls to get the updated cart
         this.getCustomerCart();
            
        }, err => {
          this.toastr.error("Couldn't remove the item");
        });
    }

}