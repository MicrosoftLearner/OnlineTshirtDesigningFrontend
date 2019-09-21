import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({

    selector: "store",
    templateUrl: "store.component.html"
})

export class StoreComponent {

    constructor() { console.log("In store component"); }
}