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
    private username: string;
    private password: string;
    private loginFormControl: FormGroup;

    /**
     * Error message which will be displayed in case of erroneous login/password input
     */
    private errorMessage: string;

    /**
     * Is used to display/hide login form
     */
    private submitted: boolean = false;

    constructor(@Inject('authenticationService') private authenticationService: IAuthenticationService,
                private router: Router) {}

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
     * Passes currentUser-provided information to an authentication service
     */
    login(): void {
        this.submitted = true;
        this.errorMessage = null;
        this.authenticationService.login(this.username, this.password)
            .subscribe(result => {
                    this.router.navigate(['/'])
                },
                error => {
                    this.submitted = false;
                    this.errorMessage = 'Incorrect username or password';
                });
    }
}
