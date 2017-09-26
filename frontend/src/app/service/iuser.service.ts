import {User} from "../model/user";
import {Observable} from "rxjs";

/**
 * Interface specifies some of the CRUD operations which can be proceed upon {@see User} instances
 */
export interface IUserService {

    /**
     * @returns Observable after the completion of the underlying functionality. Generic type is array of User instances
     */
    findAll(): Observable<User[]>;

    /**
     * @param {number} id - unique identifier of an instance
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    getOne(id: number): Observable<User>;

    /**
     * @param {User} user - an instance of a User class which will be updated/saved
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    save(user: User): Observable<User>;

    /**
     * @param username of a User instance to obtain
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    obtainUser(user: User): Observable<User>;
}