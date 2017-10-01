import {User} from "../model/user";
import {Observable} from "rxjs";
import {Authority} from "../model/authority";

/**
 * Interface specifies method to retrieve and save Authority
 * instances on the back-end side of the application
 */
export interface IAuthenticationService {

    /**
     * @param {number} id - unique identifier of an instance
     * @returns Observable after the completion of the underlying functionality. Generic type is
     * an instance of a Authority class
     */
    getOne(id: number): Observable<Authority>;

    /**
     * @param {User} user - an instance of a User class which will be updated/saved
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    save(user: User): Observable<User>;
}