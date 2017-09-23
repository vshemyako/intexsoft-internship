import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable, Inject} from "@angular/core";
import {IAuthenticationService} from "../service/iauthentication.service";

@Injectable()
export class NavigationGuard implements CanActivate {

    constructor(@Inject('authenticationService') private authenticationService: IAuthenticationService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authenticationService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}