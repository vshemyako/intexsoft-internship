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
