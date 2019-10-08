import { Component, OnInit } from "@angular/core";
import { NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, RouterStateSnapshot } from "@angular/router";

import { ProductRepository } from "../model/product.repository";
import { Product } from "../model/product";

@Component({

    selector: "individual-product",
    templateUrl: "individualProduct.component.html"
})

export class IndividualProductComponent {

    id: number;

    public indvProduct: Product;

    constructor(private repoistoryProduct: ProductRepository, private route: ActivatedRoute) {
        console.log("Individual prod constructor");

        //Converts the params string to int
        this.id = parseInt(route.snapshot.paramMap.get("productId"));
    }

    ngOnInit() {

        this.showIndividualProduct();
    }
    showIndividualProduct() {
        //It sets the returned products 
        this.repoistoryProduct.getProductById(this.id).then(() => {
            this.indvProduct = this.repoistoryProduct.individualProuct;
        });
    }

}