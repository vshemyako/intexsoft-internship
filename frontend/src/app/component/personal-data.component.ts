import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";
import {IUserService} from "../service/iuser.service";
import {IAuthenticationService} from "../service/iauthentication.service";
import {delay} from "rxjs/operator/delay";

/**
 * @type {RegExp} - is used to validate provided email address
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-personal-data',
    templateUrl: '../../assets/html/personal-data.component.html',
    styleUrls: ['../../assets/style/personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

    private currentUser: User;
    private personalFormControl: FormGroup;

    /**
     * Error message which will be displayed in case of erroneous login/password input
     */
    private errorMessage: string;

    /**
     * Is used to display/hide login form
     */
    private submitted: boolean = false;

    constructor(@Inject('userService') private userService: IUserService,
                @Inject('authenticationService') private authenticationService: IAuthenticationService) {
    }

    /**
     * Creates empty user which later on is filled in with information which is provided in sign-up form
     */
    ngOnInit(): void {
        this.currentUser = new User();
        this.personalFormControl = new FormGroup({
            'validName': new FormControl(this.currentUser.username, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
            'validPassword': new FormControl(this.currentUser.password, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
            'validFirstName': new FormControl(this.currentUser.firstName, [Validators.minLength(3), Validators.maxLength(16)]),
            'validLastName': new FormControl(this.currentUser.lastName, [Validators.minLength(3), Validators.maxLength(16)]),
            'validEmail': new FormControl(this.currentUser.email, [Validators.pattern(EMAIL_REGEX)])
        });
    }

    /**
     * Trying to retrieve personal information of a currently logged in User withour provided any extra information
     * that may accidentally expose some security information
     */
    private obtainUser(): void {
        this.submitted = true;
        this.errorMessage = null;

        this.userService.obtainUser(this.currentUser)
            .subscribe((user: User) => {
                    this.currentUser = user;
                    this.currentUser.password = '';
                },
                error => {
                    this.errorMessage = "Sorry! Credentials you've provided are incorrect";
                });
        this.submitted = false;
    }

    /**
     * Intention to use - save changed state of a User instance. Information from personal form is retrieved
     * and send to the back end part of the application
     */
    private save(): void {
        this.submitted = true;
        this.errorMessage = null;

        this.userService.save(this.currentUser)
            .subscribe((user: User) => {
                    this.currentUser = user;
                    this.currentUser.password = '';
                },
                error => {
                    this.errorMessage = "Sorry! Credentials you've provided are incorrect";
                });
        this.submitted = false;
    }
}
