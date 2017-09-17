import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {IAuthenticationService} from "../service/iauthentication.service";

/**
 * Login page controller
 */
@Component({
    selector: 'login-form',
    templateUrl: '../../assets/html/login-form.component.html',
    styleUrls: ['../../assets/style/login-form.component.css']
})
export class LoginFormComponent implements OnInit {
    username: string;
    password: string;

    private loginFormName: string = 'News Portal Login Form';

    constructor(@Inject('authenticationService') private authenticationService: IAuthenticationService,
                private router: Router) {
    }


    /**
     * Deletes any information which somehow remained in the localStorage
     */
    ngOnInit(): void {
        this.authenticationService.logout();
    }

    /**
     * Passes user-provided information to an authentication service
     */
    login() {
        this.authenticationService.login(this.username, this.password)
            .subscribe(result => {
                if (result) {
                    this.router.navigate(['/']);
                } else {
                    alert('Username or password is incorrect');
                }
            });
    }
}
