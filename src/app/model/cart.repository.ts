import { Injectable, OnInit, Output ,EventEmitter } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";


import { LocalStorageRepository } from "./localStorage.repository";

import { Router } from "@angular/router";

import { RestCartRepository } from "./restCart.repository";


@Injectable()

export class CartRepository implements OnInit{

 @Output() fireUpdatedCart: EventEmitter<any> = new EventEmitter();

 @Output() fireRemovedCart: EventEmitter<any> = new EventEmitter();

 @Output() fireAddCart: EventEmitter<any> = new EventEmitter();


   
    constructor( private restRepository: RestCartRepository, private route: Router, private toastr: ToastrService ){ }

    ngOnInit(){}

    addToCart(productId: number, customerId: string,  productPrice: number, productSize: string){
        return this.restRepository.addToCart(productId, customerId, productPrice, productSize)
        .pipe(
            map(response => {

               this.fireRemovedCart.emit();

                return response;

            }), catchError(this.handleError)
        );
    }

    getCart(customerId: string){
        return this.restRepository.getCart(customerId)
        .pipe(
            map(response => {

                return response;

            }), catchError(this.handleError)
        );
    }

    getUpdatedEmitCart(){
        return this.fireUpdatedCart;
    }

    getRemovedEmitCart(){
        return this.fireRemovedCart;
       
    }

    getAddedEmitCart(){
        return this.fireAddCart;
       
    }

    increaseQuantity(cartId: number, customerId: string,  productQuantity:number){
        return this.restRepository.increaseQuantity(cartId, customerId, productQuantity)
        .pipe(
            map(response => {
            
                this.fireUpdatedCart.emit(response);
                return response;

            }), catchError(this.handleError)
        );
    }

    deleteCart(cartId: number, customerId: string){

        return this.restRepository.deleteCart(cartId, customerId)
        .pipe(
            map(response => {

                this.fireRemovedCart.emit();
                return response;

            }), catchError(this.handleError)
        );
    }

    handleError(err) {
        // console.log("in error blog", err.error.error);
        let errorMessage: string = '';

        errorMessage = err.error.error;

        return throwError(err);
    }

}