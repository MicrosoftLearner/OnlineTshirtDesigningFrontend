import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Product } from "../model/product";
import { RestDataProductRepository } from "./restDataProductRepository";
import { map } from "rxjs/operators";

@Injectable()
export class ProductRepository {

    baseUrl: string;

    public productObjArray;

    public homeBannerProducts;

    public individualProuct;

    constructor(private restDataProdRepository: RestDataProductRepository) { }

    getHomeBannerProducts() {

        let promise = new Promise((resolve, reject) => {
            this.restDataProdRepository.getHomeBannerProducts().toPromise().then(
                res => {
                    this.homeBannerProducts = res;
                    resolve();
                },
                err => {
                    console.log("getProducts API fetching problem");
                    reject();
                }
            );

        });

        return promise;

    }

    // getProducts(){

    //     let promise = new Promise((resolve, reject) => {
    //         this.restDataProdRepository.getProducts().toPromise().then(
    //             res => {
    //                 this.productObjArray = res;
    //                 resolve();
    //             },
    //             err => {
    //                 console.log("getProducts API fetching problem");
    //                 reject();
    //             }
    //         );

    //     });

    //     return promise;
    // };

    getProducts(): Observable<any> {

        return this.restDataProdRepository.getProducts().pipe(map(res => {
            return res;
        },
            err => {
                console.log("getProducts API fetching problem");

            })

        );
    };
    getProductById(id: number) {

        let promise = new Promise((resolve, reject) => {
            this.restDataProdRepository.getProductById(id).toPromise().then(
                res => {
                    this.individualProuct = res;
                    resolve();
                },
                err => {
                    console.log("getProductById API fetching problem");
                    reject();
                }
            );

        });

        return promise;

    }

    getBlogs(): Observable<any> {

        return this.restDataProdRepository.getBlogs().pipe(map(res => {
            return res;
        },
            err => {
                console.log("getProducts API fetching problem");

            })

        );
    };

}
