import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {User} from "../../model/user";
import {IUserService} from "../iuser.service";
import {Observable} from "rxjs";

const ALL_USERS_PATH = 'api/users';
const USER_PATH = 'api/user';

/**
 * Service which provides method to perform basic CRUD operations
 */
@Injectable()
export class UserService implements IUserService {

    constructor(private http: Http) {
    }

    /**
     * Provides means to obtain headers with embedded authentication information
     * @returns {RequestOptions} - object with JWT authentication information
     */
    private getAuthRequestOptions(): RequestOptions {
        return new RequestOptions({
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                })
            }
        );
    }

    /**
     * @returns Observable after the completion of the underlying functionality. Generic type is array of User instances
     */
    findAll(): Observable<User[]> {
        return this.http.get(ALL_USERS_PATH, this.getAuthRequestOptions())
            .map((response: Response) => {
            response.json()
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * @param {number} id - unique identifier of an instance
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    getOne(id: number): Observable<User> {
        const url = `${USER_PATH}/${id}`;
        return this.http.get(url, this.getAuthRequestOptions())
            .map((response: Response) => {
                response.json();
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * @param {User} user - an instance of a User class which will be updated/saved
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    save(user: User): Observable<User> {
        return this.http.post(USER_PATH, JSON.stringify(user), this.getAuthRequestOptions())
            .map((response: Response) => {
                response.json();
            })
            .catch((error: any) => Observable.throw(error));
    }
}
