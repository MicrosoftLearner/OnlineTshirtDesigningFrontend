import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
    SwiperComponent, SwiperDirective, SwiperConfigInterface,
    SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';

import { ProductRepository } from "../model/product.repository";
import { Product } from "../model/product";


@Component({

    selector: "store",
    templateUrl: "store.component.html"
})


export class StoreComponent implements OnInit {


    //Sets the getProducts response 
    public products: Array<Product> = [];

    //Sets the homeBannerProducts
    public homeBannerProducts;

    //Sets the newArrival products
    public newArrivalProducts: Array<Product> = [];

    //Sets the loader
    public isLoading: boolean = false;

    constructor(private repoistoryProduct: ProductRepository) { console.log("In store component"); }

    public config: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: 1,
        keyboard: true,
        navigation: true,
        pagination: false
    };


    public blogs;

    public allCatConfig: SwiperConfigInterface = {
        width: 340,
        spaceBetween: 15
    }

    public newCatConfig: SwiperConfigInterface = {
        width: 250,
        spaceBetween: 15
    }


    ngOnInit() {

        this.getHomeBannerProducts();

        this.getProducts();

        this.getBlogs();

    }


    getHomeBannerProducts() {

        this.isLoading = true;

        this.repoistoryProduct.getHomeBannerProducts().then(() => {
            this.homeBannerProducts = this.repoistoryProduct.homeBannerProducts;
            this.isLoading = false;
        });
    }

    getProducts() {
        //It sets the returned products 
        // this.repoistoryProduct.getProducts().then(() => {
        //     this.products = this.repoistoryProduct.productObjArray;
        // console.log("new arrival",  this.products.filter( x => x.ProductNewArrival.trim() == "yes"));

        // });
        this.isLoading = true;
        this.repoistoryProduct.getProducts()
            .subscribe(items => {
                this.products = items;

                this.newArrivalProducts = items.filter((c, index, array) => c.ProductNewArrival.toLowerCase() == "yes");

                this.isLoading = false;
            });
    }

    getBlogs() {

        this.repoistoryProduct.getBlogs()
            .subscribe(res => {
                this.blogs = res
            });

    }

}