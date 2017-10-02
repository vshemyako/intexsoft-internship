/**
 * Blueprint for creating Status instances
 */
export class Status {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}