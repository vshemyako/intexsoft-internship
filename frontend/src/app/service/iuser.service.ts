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
     * Similar method, but is designed especially for administrator to change users' information
     * @param {User} user - an instance of a User class which will be updated/saved
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    saveAdmin(user: User): Observable<User>;

    /**
     * @param  user instance to obtain
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    obtainUser(user: User): Observable<User>;

    /**
     * Retrieves specified subset of data in manageable form
     * @param page - the page of data to retrieve
     * @param size - the size of the page
     */
    findSubset(page: string, size: string): Observable<User[]>;

    /**
     * Retrieves specified subset of data in manageable form
     * @param page - the page of data to retrieve
     * @param size - the size of the page
     *   @param enabled - boolean value which determines what type of users to retrieve
     */
    findAllEnabled(page: string, size: string, enabled: boolean): Observable<User[]>;

    /**
     * @param id - id of an instance of a User class which will be deleted
     * @returns Observable after the completion of the underlying functionality. Generic type is a boolean
     */
    deleteUser(id: number): Observable<boolean>;
}