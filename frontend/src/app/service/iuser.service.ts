import {User} from "../model/user";

/**
 * Interface specifies some of the CRUD operations which can be proceed upon {@see User} instances
 */
export interface IUserService {

    /**
     * @returns Promise after the completion of the underlying functionality. Generic type is array of User instances
     */
    findAll(): Promise<User[]>;

    /**
     * @param {number} id - unique identifier of an instance
     * @returns Promise after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    getOne(id: number): Promise<User>;

    /**
     * @param {User} user - an instance of a User class which will be updated/saved
     * @returns Promise after the completion of the underlying functionality. Generic type is an instance of a User class
     */
    save(user: User): Promise<User>;
}