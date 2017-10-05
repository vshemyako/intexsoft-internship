import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {User} from "../../model/user";
import {IUserService} from "../iuser.service";
import {Observable} from "rxjs";

const SUBSET_USERS_PATH = 'api/users';
const ALL_USERS_PATH = 'api/users/all';
const USER_PATH = 'api/user/';
const USER_PATH_FOR_ADMIN = 'api/user/admin';
const CURRENT_USER_PATH = 'api/user/current';

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
     * Provides means to obtain headers with content-type information
     * @returns {RequestOptions} - object with content-type information
     */
    private getPlainRequestOptions(): RequestOptions {
        return new RequestOptions({
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }
        );
    }

    /**
     * Provides means to obtain headers and request params
     * @returns {RequestOptions} - object with specified content-type and parameters information
     */
    private getRequestOptionsWithPage(page: string, size: string): RequestOptions {
        return new RequestOptions({
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                }),
                params: this.getUrlSearchParams(page, size)
            }
        );
    }

    /**
     * Search params to request just a chunk of data
     * @param page - the page of data to retrieve
     * @param size - the size of the page
     * @returns {URLSearchParams} - Map-like representation of the url search parameters
     */
    private getUrlSearchParams(page: string, size: string): URLSearchParams {
        let params = new URLSearchParams();
        params.set('page', page);
        params.set('size', size);
        return params;
    }

    /**
     * Retrieves specified subset of data in manageable form
     * @param page - the page of data to retrieve
     * @param size - the size of the page
     */
    findSubset(page: string, size: string): Observable<User[]> {
        return this.http.get(SUBSET_USERS_PATH, this.getRequestOptionsWithPage(page, size))
            .map((response: Response) => {
                return response.json().content;
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * Retrieves specified subset of data in manageable form
     * @param page - the page of data to retrieve
     * @param size - the size of the page
     * @param enabled - boolean value which determines what type of users to retrieve
     */
    findAllEnabled(page: string, size: string, enabled: boolean): Observable<User[]> {
        return this.http.get(SUBSET_USERS_PATH + '/' + enabled, this.getRequestOptionsWithPage(page, size))
            .map((response: Response) => {
                return response.json().content;
            })
            .catch((error: any) => Observable.throw(error));
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
        let url = `${USER_PATH}${id}`;
        return this.http.get(url, this.getAuthRequestOptions())
            .map((response: Response) => {
                return response.json();
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
                return response.json();
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * Similar method, but is designed especially for administrator to change users' information
     * @param {User} user - an instance of a User class which will be updated/saved
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    saveAdmin(user: User): Observable<User> {
        return this.http.post(USER_PATH_FOR_ADMIN, JSON.stringify(user), this.getAuthRequestOptions())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * @param username of a User instance to obtain
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    obtainUser(user: User): Observable<User> {
        return this.http.post(CURRENT_USER_PATH, JSON.stringify(user), this.getAuthRequestOptions())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * @param id - id of an instance of a User class which will be deleted
     * @returns Observable after the completion of the underlying functionality. Generic type is a boolean
     */
    deleteUser(id: number): Observable<boolean> {
        let url = `${USER_PATH}${id}`;
        return this.http.get(url, this.getAuthRequestOptions())
            .map((response: Response) => {
                return true;
            })
            .catch((error: any) => Observable.throw(error));
    }
}
