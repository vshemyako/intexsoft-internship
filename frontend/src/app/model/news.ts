import {User} from "./user";
import {Category} from "./category";
import {Status} from "./status";
/**
 * Blueprint for creating News instances
 */
export class News {
    id: number;
    title: string;
    description: string;
    article: string;
    startDisplay: Date;
    endDisplay: Date;
    author: User;
    status: Status;
    categories: Category[];
}