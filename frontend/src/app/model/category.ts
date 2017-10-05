/**
 * Blueprint for creating Category instances
 */
export class Category {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}