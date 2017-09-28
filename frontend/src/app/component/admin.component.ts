import {Component, OnInit, Inject} from '@angular/core';
import {IUserService} from "../service/iuser.service";
import {User} from "../model/user";

/**
 * Info message which will be displayed to admin until he performs an action
 */
const INFO_MESSAGE: string = 'None users are selected yet. Awaiting for your action';

/**
 * Info message which will be displayed to admin until he performs an action
 */
const ERROR_MESSAGE: string = 'Sorry! No more users to display!';

/**
 * @type {number} - number of users per page request
 */
const SIZE_OF_A_PAGE = 5;

/**
 * @type {number} - defines how big increment will be
 */
const PAGE_STEP = 1;

@Component({
    selector: 'app-admin',
    templateUrl: '../../assets/html/admin.component.html',
    styleUrls: ['../../assets/style/admin.component.css']
})
export class AdminComponent {

    /**
     * Error message which will be displayed in case of erroneous login/password input
     */
    private errorMessage: string;

    /**
     * Info message which urge to make an action
     */
    private infoMessage: string;

    /**
     * Show/hide info message depending on value
     */
    private showInfo: boolean;

    /**
     * Is used to display/hide login form
     */
    private submitted: boolean;

    /**
     * Tracks number of pages already displayed
     */
    private pageNumber: number;

    /**
     * Number of displayed currentUser instance
     */
    private currentUserNumber: number;

    /**
     * Determines which method to invoke
     */
    private methodNumber: number;

    private users: User[];

    constructor(@Inject('userService') private userService: IUserService) {
        this.currentUserNumber = 1;
        this.submitted = false;
        this.showInfo = true;
        this.infoMessage = INFO_MESSAGE;
        this.pageNumber = 0;
        this.users = [];
    }

    /**
     * Makes use of userService to request more users to display from db
     */
    private findSubset(): void {
        this.submitted = false;
        this.userService.findSubset(this.pageNumber.toString(), SIZE_OF_A_PAGE.toString())
            .subscribe((users: User[]) => {
                    this.users = users;
                    this.submitted = true;
                },
                error => {
                    this.errorMessage = ERROR_MESSAGE;
                    this.submitted = true;
                });
        this.showInfo = false;
    }

    /**
     * Display/refreshes admin currentUser table
     */
    private findAll(): void {
        this.methodNumber = 0;
        this.pageNumber = 0;
        this.findSubset();
    }

    /**
     * Displays previously retrieved users
     */
    private previous(): void {
        this.pageNumber -= PAGE_STEP;
        this.appropriateFindAll();
    }


    /**
     * Displays previously retrieved users
     */
    private next(): void {
        this.pageNumber += PAGE_STEP;
        this.appropriateFindAll();
    }

    /**
     * Invokes method which is determined by method number.
     * The only purpose of this hussle - to bind next/previous buttons
     * to appropriated methods which were invoked first
     */
    private appropriateFindAll() {
        switch (this.methodNumber) {
            case 0:
                this.findSubset();
                break;
            case 1:
                this.getAllEnabled(true);
                break;
            case 2:
                this.getAllEnabled(false);
                break;
        }
    }

    /**
     * Disables/enables previous UI button
     * @returns {boolean} false - if not users to display
     */
    private hasPreviousUsers(): boolean {
        if (this.pageNumber !== 0) {
            return true;
        }
        return false;
    }

    /**
     * Disables/enables next UI button
     * @returns {boolean} false - if not users to display
     */
    private hasNextUsers(): boolean {
        if (this.users.length) {
            return true;
        }
        return false;
    }

    /**
     * Helper method to request only enabled users
     */
    private getEnabled(): void {
        this.pageNumber = 0;
        this.methodNumber = 1;
        this.getAllEnabled(true);
    }


    /**
     * Helper method to request only disabled users
     */
    private getDisabled(): void {
        this.pageNumber = 0;
        this.methodNumber = 2;
        this.getAllEnabled(false);
    }

    /**
     * Makes use of userService to request enabled/disabled users to display from db
     */
    private getAllEnabled(enabled: boolean): void {
        this.submitted = false;
        this.userService.findAllEnabled(this.pageNumber.toString(), SIZE_OF_A_PAGE.toString(), enabled)
            .subscribe((users: User[]) => {
                    this.users = users;
                    this.submitted = true;
                },
                error => {
                    this.errorMessage = ERROR_MESSAGE;
                    this.submitted = true;
                });
        this.showInfo = false;
    }
}