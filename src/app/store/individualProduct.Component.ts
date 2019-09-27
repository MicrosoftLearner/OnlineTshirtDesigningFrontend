import { Component, OnInit } from "@angular/core";
import { NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, RouterStateSnapshot } from "@angular/router";

import { ProductRepository } from "../model/product.repository";

@Component({

    selector: "individual-product",
    templateUrl: "individualProduct.component.html"
})

export class IndividualProductComponent {

    id: string;

    public indvProduct;

    constructor(private repoistory: ProductRepository, private route: ActivatedRoute) {
        console.log("Individual prod constructor");
        this.id = route.snapshot.paramMap.get("productId");

        this.indvProduct = repoistory.getProductById(parseInt(this.id)).subscribe(data => 
            { this.indvProduct= data});

        console.log("Indivi", this.indvProduct);
    }


    public get value() {
        return this.indvProduct;
    }


    ngOnInit() {
    }

}