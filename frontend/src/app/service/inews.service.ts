import {Observable} from "rxjs";
import {News} from "../model/news";

/**
 * Interface specifies some of the CRUD operations which can be proceed upon {@see News} instances
 */
export interface INewsService {

    /**
     * @returns Observable after the completion of the underlying functionality. Generic type is array of News instances
     */
    findAll(): Observable<News[]>;

    /**
     * @param {number} id - unique identifier of an instance
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a News class
     */
    getOne(id: number): Observable<News>;

    /**
     * @param {News} news - an instance of a News class which will be updated/saved
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a News class
     */
    save(news: News): Observable<News>;

    /**
     * Retrieves specified subset of data in manageable form
     * @param page - the page of data to retrieve
     * @param size - the size of the page
     */
    findSubset(page: string, size: string): Observable<News[]>;

    /**
     * Retrieves specified subset of data in manageable form
     * @param page - the page of data to retrieve
     * @param size - the size of the page
     * @param status - determines what type of articles to request
     */
    findAllReviewed(page: string, size: string, status: String): Observable<News[]>;

    /**
     * Retrieves approved and relevant subset of data in manageable form
     * @param page - the page of data to retrieve
     * @param size - the size of the page
     */
    findAllReviewedAndRelevant(page: string, size: string): Observable<News[]>;
}