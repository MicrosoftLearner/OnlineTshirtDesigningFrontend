import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders  } from "@angular/common/http";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class ProductRepository{

    private products;

    constructor(private dataSource: RestDataSource){
      dataSource.getProducts();
    }

    getProducts(){
        return this.products;
    }

    getProductById(id: number){
       this.dataSource.getProductById(id);
    }
}
