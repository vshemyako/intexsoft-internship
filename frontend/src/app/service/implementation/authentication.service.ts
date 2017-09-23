import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs/Observable";
import {IAuthenticationService} from "../iauthentication.service";
import {Authority} from "../../model/authority";
import {User} from "../../model/user";
import {BehaviorSubject} from "rxjs";

const AUTH_USER_PATH: string = 'api/auth';
const REGISTER_USER_PATH = 'api/register';

/**
 * Implementation of {@link IAuthenticationService} with the help of JSON Web Token
 */
@Injectable()
export class AuthenticationService implements IAuthenticationService {

    constructor(private http: Http) {
    }

    /**
     * Makes authentication request body of which holds passed username and password
     * information
     * @param username of a User which wants to authenticate
     * @param password corresponding User's password
     * @returns {Observable<boolean>} encapsulated boolean value which represents
     *          loginFormControl success
     */
    login(username: string, password: string): Observable<boolean> {
        return this.http.post(AUTH_USER_PATH, JSON.stringify({username: username, password: password}),
            this.getPlainRequestOptions())
            .map((response: Response) => {
                let token: string = response.headers.get('Authorization').slice(7);
                let authorities: string[] = JSON.parse(response.text());
                console.log(authorities);
                if (token) {
                    localStorage.setItem('token', JSON.stringify(token));
                    localStorage.setItem('authorities', response.text());
                    return true;
                } else {
                    return false;
                }
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * Removes user and token related information from the localStorage
     */
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('authorities');
    }

    /**
     * @param {User} user - an instance of a User class which will be created
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    register(user: User): Observable<User> {
        return this.http.post(REGISTER_USER_PATH, JSON.stringify(user), this.getPlainRequestOptions())
            .map((response: Response) => {
                response.json();
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * Determines whether or not a User is authenticated
     * @returns {Observable<boolean>} - boolean value wrapper in Observable
     */
    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
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
}