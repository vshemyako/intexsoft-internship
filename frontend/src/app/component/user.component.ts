import {Component, Inject, OnInit} from '@angular/core';

import {User} from "../model/user";
import {Router} from "@angular/router";
import {IUserService} from "../service/iuser.service";

/**
 * Controller which using provided services displays college users
 */
@Component({
    selector: 'users-root',
    templateUrl: '../../assets/html/user.component.html',
    styleUrls: ['../../assets/style/user.component.css']
})
export class UserComponent implements OnInit {

    selectedUser: User;
    users: User[];

    constructor(@Inject('userService') private userService: IUserService,
                private router: Router) {
    }

    /**
     * A method which is called right after the initialization of an object. In particular it invokes findAll() method,
     * results of which are used to render component's view
     */
    ngOnInit(): void {
        this.findAll();
    }

    /**
     * Assigns a list of users retrieved from an underlying service
     */
    findAll(): void {
        this.userService.findAll()
            .subscribe((users: User[]) => this.users = users),
            (error => alert(error.message));
    }

    /**
     * @param {User} user - which will be rendered with extra details
     */
    onSelect(user: User): void {
        this.selectedUser = user;
    }

    /**
     * Method is showing extra detail of a chosen currentUser with the help of router method navigate. This method receives
     * an array consisting of a path and a route parameter. Both of them specify what controllers template will be
     * generated
     */
    showDetails(): void {
        this.router.navigate(['/user', this.selectedUser.id])
            .catch((e: Error) => alert(e.message));
    }
}
