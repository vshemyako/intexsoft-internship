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
}
