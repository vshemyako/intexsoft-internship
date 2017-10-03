import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Injectable, Inject} from "@angular/core";
import {IAuthenticationService} from "../service/iauthentication.service";

/**
 * Guard which grants access to admin section to users with 'ROLE_ADMIN'
 */
@Injectable()
export class AdminSectionGuard implements CanActivate {

    /**
     * @param route - requested route by a random currentUser
     * @param state - a tree of activated route snapshots
     * @returns {boolean} - true - allows users to pass; false - do not
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let authorities: string[] = JSON.parse(localStorage.getItem('authorities'));
        for (let authority of authorities) {
            switch (authority) {
                case 'ROLE_ADMIN' :
                    return true;
            }
        }
        return false;
    }
}