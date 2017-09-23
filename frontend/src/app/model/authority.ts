/**
 * Instances of this class are used to determine which endpoints of our application are allowed
 * for visiting based on authority level without need to send responses to our back-end part of the
 * application
 */
export class Authority {
    roles: string[];

    /**
     * An array of strings which represent authority level of authenticated user
     * It's quite obvious that constructor demands roles parameter
     * @param roles - array of roles
     */
    constructor(roles: string[]) {
        this.roles = roles;
    }
}