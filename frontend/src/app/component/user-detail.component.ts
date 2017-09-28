import {Component, Inject, OnInit} from "@angular/core";
import "rxjs/add/operator/switchMap";
import {User} from "../model/user";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {IUserService} from "../service/iuser.service";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {Authority} from "../model/authority";

/**
 * @type {RegExp} - is used to validate provided email address
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/**
 * Component which controls currentUser extra information which might be rendered
 */
@Component({
    selector: 'user-detail',
    templateUrl: '../../assets/html/user-detail.component.html',
    styleUrls: ['../../assets/style/user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    currentUser: User;
    private personalFormControl: FormGroup;

    /**
     * Error message which will be displayed in case of erroneous login/password input
     */
    private errorMessage: string;

    /**
     * Is used to display/hide login form
     */
    private submitted: boolean = false;


    /**
     * Defines possible user roles
     */
    private roles = {
        isAdmin: false,
        isEditor: false,
        isReviewer: false,
        isUser: false
    };

    private selectedAuthority: string;

    constructor(@Inject("userService") private userService: IUserService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    /**
     * A method which is called right after the initialization of an object. Eventually it assigns a retrieved instance
     * of a User class to a private field, which will be later used for template rendering
     */
    ngOnInit(): void {
        this.currentUser = new User();
        this.getOne();
        this.personalFormControl = new FormGroup({
            'validName': new FormControl(this.currentUser.username, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
            'validPassword': new FormControl(this.currentUser.password, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
            'validFirstName': new FormControl(this.currentUser.firstName, [Validators.minLength(3), Validators.maxLength(16)]),
            'validLastName': new FormControl(this.currentUser.lastName, [Validators.minLength(3), Validators.maxLength(16)]),
            'validEmail': new FormControl(this.currentUser.email, [Validators.pattern(EMAIL_REGEX)]),
            'validStatus': new FormControl(this.currentUser.enabled, [Validators.required]),
            'validAuthority': new FormControl(this.currentUser.authorities, [Validators.required])
        });
    }

    /**
     * Retrieves a requested instance of a User class specifying its identifier. This is possible due to the
     * underlying interface ActivatedRoute implementation of which contain information about a route associated with a
     * component loaded in an <router-outlet> html tag.
     */
    private getOne(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.userService.getOne(+params.get('id')))
            .subscribe((user: User) => {
                this.currentUser = user;
                this.syncRolesArray();
            });
    }

    /**
     * Deletes instance of a User class for whom detailed view was rendered
     */
    private deleteUser(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.userService.deleteUser(+params.get('id')))
            .subscribe((result: boolean) => {
                    this.goBack();
                },
                error => {
                    this.errorMessage = "Error! User has not been deleted!";
                });
    }

    /**
     *  Simply displays previously rendered page. This is possible due to the Location service which is navigates one
     *  step backwards in the browser's history stack
     */
    private goBack(): void {
        this.router.navigateByUrl('/admin');
    }

    /**
     * Persists an instance of a User class into underlying data storage
     */
    private saveUser(): void {
        this.currentUser.authorities = this.createAuthorityArray();
        this.userService.saveAdmin(this.currentUser)
            .subscribe(result => {
                this.goBack();
            });
    }

    /**
     * Changes boolean roles array to correctly display them on UI
     */
    private syncRolesArray(): void {
        for (let role of this.currentUser.authorities) {
            if (role.authority === 'ROLE_ADMIN') {
                this.roles.isAdmin = true;
            }
            if (role.authority === 'ROLE_EDITOR') {
                this.roles.isEditor = true;
            }
            if (role.authority === 'ROLE_REVIEWER') {
                this.roles.isReviewer = true;
            }
            if (role.authority === 'ROLE_USER') {
                this.roles.isUser = true;
            }
        }
    }

    /**
     * Creates new Authority array which is appended to user instance
     */
    private createAuthorityArray(): Authority[] {
        let authorityArray: Authority[] = [];
        if (this.roles.isAdmin) {
            authorityArray.push(new Authority(7, 'ROLE_ADMIN'))
        }
        if (this.roles.isEditor) {
            authorityArray.push(new Authority(8, 'ROLE_EDITOR'))
        }
        if (this.roles.isReviewer) {
            authorityArray.push(new Authority(9, 'ROLE_REVIEWER'))
        }
        if (this.roles.isUser) {
            authorityArray.push(new Authority(10, 'ROLE_USER'))
        }
        return authorityArray;
    }
}
