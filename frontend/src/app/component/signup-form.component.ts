import {Component, OnInit, Inject} from "@angular/core";
import {Router} from "@angular/router";
import {IUserService} from "../service/iuser.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'signup-component',
    templateUrl: '../../assets/html/signup-form.component.html',
    styleUrls: ['../../assets/style/signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

    private username: string;
    private password: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private signupFormControl: FormGroup;

    /**
     * Error message which will be displayed in case of erroneous login/password input
     */
    private errorMessage: string;

    /**
     * Is used to display/hide login form
     */
    private submitted: boolean = false;

    constructor(@Inject('userService') private userService: IUserService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.signupFormControl = new FormGroup({
            'validName': new FormControl(this.username, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
            'validPassword': new FormControl(this.password, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
            'validFirstName': new FormControl(this.firstName, [Validators.minLength(3), Validators.maxLength(16)]),
            'validLastName': new FormControl(this.lastName, [Validators.minLength(3), Validators.maxLength(16)]),
            'validEmail': new FormControl(this.email, [Validators.pattern(EMAIL_REGEX)])
        });
    }
}
