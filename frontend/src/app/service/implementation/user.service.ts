import {Injectable, Inject} from '@angular/core';
import {Headers, Http, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise'

import {User} from "../../model/user";
import {IUserService} from "../iuser.service";
import {IAuthenticationService} from "../iauthentication.service";

const FIND_ALL_URL = 'api/users';
const GET_ONE_URL = 'api/user';

/**
 * Service which provides method to perform basic CRUD operations
 */
@Injectable()
export class UserService implements IUserService {

    private options: RequestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token
            })
        }
    );

    constructor(@Inject('authenticationService') private authenticationService: IAuthenticationService,
                private http: Http) {
    }

    /**
     * @returns Promise after the completion of the underlying functionality. Generic type is array of User instances
     */
    findAll(): Promise<User[]> {
        return this.http.get(FIND_ALL_URL, this.options)
            .toPromise()
            .then(response => response.json());
    }

    /**
     * @param {number} id - unique identifier of an instance
     * @returns Promise after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    getOne(id: number): Promise<User> {
        const url = `${GET_ONE_URL}/${id}`;
        return this.http.get(url, this.options)
            .toPromise()
            .then(response => response.json());
    }

    /**
     * @param {User} user - an instance of a User class which will be updated/saved
     * @returns Promise after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    save(user: User): Promise<User> {
        return this.http.post(GET_ONE_URL, JSON.stringify(user), this.options)
            .toPromise()
            .then(response => response.json());
    }
}
