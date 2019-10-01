import { Injectable, OnInit } from "@angular/core";
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { AuthRepository } from "./auth.repository";

@Injectable()

export class AuthGuardRepository {

    constructor(private authRepository: AuthRepository, private route: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.authRepository.authenticated) {
            this.route.navigateByUrl("/admin/adminLogin");
            return false;
        }
        return true;
    }
}