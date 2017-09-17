import {Component, OnInit, Inject} from "@angular/core";
import {Router} from "@angular/router";
import {IAuthenticationService} from "../service/iauthentication.service";
import {FormGroup, Validators, FormControl} from "@angular/forms";

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
    loginFormControl: FormGroup;
    private submitted = false;

    constructor(@Inject('authenticationService') private authenticationService: IAuthenticationService,
                private router: Router) {
    }


    /**
     * Deletes any information which somehow remained in the localStorage and
     * applies validation to loginFormControl form
     */
    ngOnInit(): void {
        this.authenticationService.logout();
        this.loginFormControl = new FormGroup({
         'validName': new FormControl(this.username, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
         'validPassword': new FormControl(this.password, [Validators.required, Validators.minLength(3), Validators.maxLength(16)])
         });
    }

    /**
     * Passes user-provided information to an authentication service
     */
    login(): void {
        this.authenticationService.login(this.username, this.password)
            .subscribe(result => {
                if (result) {
                    this.router.navigate(['/']);
                } else {
                    this.submitted = false;
                    alert('Username or password is incorrect');
                }
            });
    }
}
