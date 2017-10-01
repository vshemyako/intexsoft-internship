import {Component, Inject} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {IAuthenticationService} from "../service/iauthentication.service";
import {Router} from "@angular/router";

/**
 * Main controller of a college application which will be first
 * rendered at the beginning of a bootstrap process
 */
@Component({
    selector: 'body',
    templateUrl: '../../assets/html/app.component.html',
    styleUrls: ['../../assets/style/app.component.css']
})
export class AppComponent {

    /**
     * The only purpose of this constructor - inject a service which is
     * responsible for translation
     * @param {TranslateService} translate
     */
    constructor(@Inject('authenticationService') private authenticationService: IAuthenticationService,
                private router: Router,
                private translate: TranslateService) {
        translate.setDefaultLang('en');
    }

    /**
     * Switches i18n files to specified language
     * @param {string} language to switch to
     */
    switchLanguage(language: string): void {
        this.translate.use(language);
    }

    //TODO: remove inline comments
    haveAccess(): boolean {
        /*
         let condition: boolean = false;
         let authorities: string[] = JSON.parse(localStorage.getItem('authorities'));
         // let array: string[] = JSON.parse('["ROLE_ADMIN", "ROLE_EDITOR", "ROLE_REVIEWER", "ROLE_USER"]');
         // console.log(authorities);

         if(authorities == null) {
         // console.log(false);
         return false;
         }

         for(let role in authorities) {
         if(role === 'ROLE_USER') {
         // console.log(role);
         condition = true;
         }
         }
         return condition;*/
        return !!localStorage.getItem('authorities');
    }

    /**
     * Is used to determine which components of UI should be displayed to a User
     * @returns {boolean} - value which determines set of visualized components
     */
    isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
    }

    /**
     * Logs a User out of the application. Service functionality which is invoked by this method
     * will also discard all currentUser related information which is stored in the 'LocalStorage'
     */
    logout(): void {
        this.authenticationService.logout();
    }

    /**
     * Scrolls viewport to the top
     */
    private scrollToTop(): void {
        window.scrollTo(0,0);
    }
}
