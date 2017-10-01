import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable, Inject} from "@angular/core";
import {IAuthenticationService} from "../service/iauthentication.service";

/**
 * A class which adds some security to front-end of application. Checks whether or not a Guest is authenticated
 */
@Injectable()
export class NavigationGuard implements CanActivate {

    constructor(@Inject('authenticationService') private authenticationService: IAuthenticationService,
                private router: Router) {
    }

    /**
     * @param route - requested route by a random currentUser
     * @param state - a tree of activated route snapshots
     * @returns {boolean} - true - allows users to pass; false - do not
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authenticationService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}