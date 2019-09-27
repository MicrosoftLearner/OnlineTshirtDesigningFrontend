import { Component, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import {
    SwiperComponent, SwiperDirective, SwiperConfigInterface,
    SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';

import { ProductRepository } from "../model/product.repository";


@Component({

    selector: "store",
    templateUrl: "store.component.html"
})


export class StoreComponent {

    public imgsUrlArray = [
        { imgUrl: "../../assets/images/Home/1.jpg", name: "sy", desc: "cool" },
        { imgUrl: "../../assets/images/Home/2.jpg", name: "sy", desc: "cool1" },
        { imgUrl: "../../assets/images/Home/1.jpg", name: "sy", desc: "cool2" }
    ];
    constructor(private repoistory: ProductRepository) { console.log("In store component"); }

    public config: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: 1,
        keyboard: true,
        navigation: true,
        pagination: false
    };

    public allCatArrayObj = [
        { imgUrl: "../../assets/images/Products/FullSleeves/FullSleeveBlack.jpg", cost: 1200, prodName: "Linen" },
        { imgUrl: "../../assets/images/Products/FullSleeves/FullSleeveBlack2.jpg", cost: 1200, prodName: "Linen" },
        { imgUrl: "../../assets/images/Products/FullSleeves/FullSleeveBlack3.jpg", cost: 1200, prodName: "Linen" }
    ];

    public blogs = [
        { imgUrl: "../../assets/images/Home/17.jpg", name: "vijay", desc: "dude" },
        { imgUrl: "../../assets/images/Home/18.jpg", name: "sidd", desc: "sexy" },
        { imgUrl: "../../assets/images/Home/19.jpg", name: "sahil", desc: "cool" }
    ];

    public allCatConfig: SwiperConfigInterface = {
        width: 340,
        spaceBetween: 15
    }

    public newCatConfig: SwiperConfigInterface = {
        width: 250,
        spaceBetween: 15
    }

//getter property    
    public get getProducts():Array<object> {
        return this.repoistory.getProducts();
    }
    
}