/**
 * Instances of this class are used to determine which endpoints of our application are allowed
 * for visiting based on authority level without need to send responses to our back-end part of the
 * application
 */
export class Authority {
    id: number;
    authority: string;

    constructor(id:number, authority: string) {
        this.id = id;
        this.authority = authority;
    }
}