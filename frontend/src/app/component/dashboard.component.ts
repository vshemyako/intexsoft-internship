import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../model/user";
import {IUserService} from "../service/iuser.service";

const NUMBER_OF_USERS: number = 4;

/**
 * Controller which delegates the best users to rendering mechanism to be displayed on the main page of an application
 */
@Component({
    selector: 'users-dashboard',
    templateUrl: '../../assets/html/dashboard.component.html',
    styleUrls: ['../../assets/style/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    users: User[];

    constructor(@Inject('userService') private userService: IUserService) {
    }

    /**
     * A method which is called right after the initialization of an object. In particular it invokes refresh() method,
     * results of which are used to render component's view
     */
    ngOnInit(): void {
        this.refresh();
    }

    /**
     * Assigns refreshed array of chosen users which will be later rendered on the main page
     */
    refresh() {
        this.userService.findAll()
            .then((users: User[]) => this.users = users.slice(0, NUMBER_OF_USERS))
            .catch((e: Error) => alert(e.message));
    }
}
