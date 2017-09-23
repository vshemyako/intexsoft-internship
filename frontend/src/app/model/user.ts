import {Authority} from "./authority";
/**
 * Blueprint for creating User instances
 */
export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;

    /**
     * Constructs a User instance, required field of who are username and password
     *
     * @param username - name which will be used in authentication process
     * @param password - password which will be used in authentication process
     */
    constructor(username?: string, password?: string) {
        this.username = username;
        this.password = password;
    }
}