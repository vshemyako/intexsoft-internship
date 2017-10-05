import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

/**
 * Guard which grants access to article revision section to users with appropriate roles
 */
@Injectable()
export class ArticleRevisionSectionGuard implements CanActivate {

    /**
     * @param route - requested route by a random currentUser
     * @param state - a tree of activated route snapshots
     * @returns {boolean} - true - allows users to pass; false - do not
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let authorities: string[] = JSON.parse(localStorage.getItem('authorities'));
        for (let authority of authorities) {
            switch (authority) {
                case 'ROLE_REVIEWER':
                    return true;
                case 'ROLE_ADMIN':
                    return true;
            }
        }
        return false;
    }
}