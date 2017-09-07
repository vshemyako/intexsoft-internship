import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {IAuthenticationService} from "../service/iauthentication.service";

/**
 * Login page controller
 */
@Component({
    selector: 'student-form',
    templateUrl: '../../assets/html/admin-form.component.html',
    styleUrls: ['../../assets/style/student-form.component.css']
})
export class AdminFormComponent implements OnInit {
    username: string;
    password: string;

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
