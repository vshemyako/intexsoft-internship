import {Component, OnInit, Inject} from "@angular/core";
import {Router} from "@angular/router";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";
import {IAuthenticationService} from "../service/iauthentication.service";

/**
 * @type {RegExp} - is used to validate provided email address
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/**
 * Controller for sign-up form. Determines whether or not a Guest provides enough information for
 * http request
 */
@Component({
    selector: 'signup-component',
    templateUrl: '../../assets/html/signup-form.component.html',
    styleUrls: ['../../assets/style/signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

    private newUser: User;
    private signupFormControl: FormGroup;

    /**
     * Error message which will be displayed in case of erroneous login/password input
     */
    private errorMessage: string;

    /**
     * Is used to display/hide signup form
     */
    private submitted: boolean = false;

    constructor(@Inject('authenticationService') private authenticationService: IAuthenticationService,
                private router: Router) {
    }

    /**
     * Creates empty user which later on is filled in with information which is provided in sign-up form
     */
    ngOnInit(): void {
        this.newUser = new User();
        this.signupFormControl = new FormGroup({
            'validName': new FormControl(this.newUser.username, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
            'validPassword': new FormControl(this.newUser.password, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
            'validFirstName': new FormControl(this.newUser.firstName, [Validators.minLength(3), Validators.maxLength(16)]),
            'validLastName': new FormControl(this.newUser.lastName, [Validators.minLength(3), Validators.maxLength(16)]),
            'validEmail': new FormControl(this.newUser.email, [Validators.pattern(EMAIL_REGEX)])
        });
    }

    /**
     * A method which is invoked when all needed information has been provided in the sign-up form.
     * A consequent http request is send to back-end part of the application
     */
    register(): void {
        this.submitted = true;
        this.errorMessage = null;

        let user: User = this.newUser;
        this.authenticationService.register(user)
            .subscribe(result => {
                    this.router.navigate(['/'])
                },
                error => {
                    this.submitted = false;
                    this.errorMessage = 'Registration failed. Try another username';
                });
    }
}
