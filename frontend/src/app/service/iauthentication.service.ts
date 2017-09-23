import {User} from "../model/user";
import {Observable} from "rxjs";

/**
 * Interface specifies basic authentication methods
 */
export interface IAuthenticationService {

    /**
     * Whatever logic is provided, in essence, should log a user into a system
     * and return a value denoting provided operation
     */
    login(username: string, password: string): Observable<boolean>;

    /**
     * Logs a user out from a program
     */
    logout(): void;

    /**
     * Determines whether or not a User is authenticated
     * @returns {Observable<boolean>} - boolean value wrapper in Observable
     */
    isLoggedIn(): boolean;

    /**
     * @param {User} user - an instance of a User class which will be created
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    register(user: User): Observable<User>;
}
