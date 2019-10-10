import { Injectable, OnInit } from "@angular/core";
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { AuthCustomerRepository } from "./authCustomer.repository";

@Injectable()

export class AuthCustomerGuardRepository {

    constructor(private authRepository: AuthCustomerRepository, private route: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.authRepository.authenticated) {
            this.route.navigateByUrl("/login");
            return false;
        }

        return true;
    }
}