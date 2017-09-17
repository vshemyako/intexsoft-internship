import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs/Observable";
import {IAuthenticationService} from "../iauthentication.service";

const AUTH_URL: string = 'api/auth';
const HEADERS: Headers = new Headers({'Content-Type': 'application/json'});

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
        return this.http.post(AUTH_URL, JSON.stringify({username: username, password: password}),
            {headers: HEADERS})
            .map((response: Response) => {
                let token = response.headers.get('Authorization').slice(7);

                if (token) {
                    localStorage.setItem('currentUser', JSON.stringify({
                        username: username, token: token
                    }));
                    return true;
                } else {
                    return false;
                }
            });
    }

    /**
     * Removes user and token related information from the localStorage
     */
    logout(): void {
        localStorage.removeItem('currentUser');
    }
}