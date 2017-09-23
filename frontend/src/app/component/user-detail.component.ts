import {Component, Inject, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';

import {User} from "../model/user";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {IUserService} from "../service/iuser.service";

/**
 * Component which controls user extra information which might be rendered
 */
@Component({
    selector: 'user-detail',
    templateUrl: '../../assets/html/user-detail.component.html',
    styleUrls: ['../../assets/style/user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    user: User;

    constructor(@Inject("userService") private userService: IUserService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    /**
     * A method which is called right after the initialization of an object. Eventually it assigns a retrieved instance
     * of a User class to a private field, which will be later used for template rendering
     */
    ngOnInit(): void {
        this.getOne();
    }

    /**
     * Retrieves a requested instance of a User class specifying its identifier. This is possible due to the
     * underlying interface ActivatedRoute implementation of which contain information about a route associated with a
     * component loaded in an <router-outlet> html tag.
     */
    getOne(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.userService.getOne(+params.get('id')))
            .subscribe((user: User) => this.user = user);
    }

    /**
     *  Simply displays previously rendered page. This is possible due to the Location service which is navigates one
     *  step backwards in the browser's history stack
     */
    goBack(): void {
        this.router.navigateByUrl('dashboard');
    }

    /**
     * Persists an instance of a User class into underlying data storage
     */
    save(): void {
        this.userService.save(this.user)
            .subscribe(result => {
                this.router.navigate(['/'])
            });
    }
}
