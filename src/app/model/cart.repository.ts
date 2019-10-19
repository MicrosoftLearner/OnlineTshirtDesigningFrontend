import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";


import { LocalStorageRepository } from "./localStorage.repository";

import { Router } from "@angular/router";
import { RestDataCustomerRepository } from "./restDataCustomer.repository";
import { Customer } from "./customer.model";
import { RestCartRepository } from "./restCart.repository";

@Injectable()

export class CartRepository implements OnInit{

   
    constructor( private restRepository: RestCartRepository, private route: Router, private toastr: ToastrService ){

      
    }

    ngOnInit(){}

    addToCart(productId: number, customerId: string,  productPrice: number){
        return this.restRepository.addToCart(productId, customerId, productPrice)
        .pipe(
            map(response => {

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


    handleError(err) {
        // console.log("in error blog", err.error.error);
        let errorMessage: string = '';

        errorMessage = err.error.error;

        return throwError(err);
    }
}