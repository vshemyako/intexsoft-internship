import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs";
import {INewsService} from "../inews.service";
import {News} from "../../model/news";

const SUBSET_NEWS_PATH = 'api/news';
const SUBSET_STATUS_NEWS_PATH = 'api/news/all';
const SUBSET_REVIEWED_RELEVANT_PATH = 'api/news/all/reviewed/relevant';
const NEWS_PATH = 'api/news';

/**
 * Service which provides methods to perform basic CRUD operations
 */
@Injectable()
export class NewsService implements INewsService {

    constructor(private http: Http) {
    }

    /**
     * @returns Observable after the completion of the underlying functionality. Generic type is array of News instances
     */
    findAll(): Observable<News[]> {
        return this.http.get(SUBSET_NEWS_PATH, NewsService.getAuthRequestOptions())
            .map((response: Response) => {
                response.json()
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * @param {number} id - unique identifier of an instance
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a News class
     */
    getOne(id: number): Observable<News> {
        const url = `${NEWS_PATH}/${id}`;
        return this.http.get(url, NewsService.getPlainRequestOptions())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * @param {News} news - an instance of a News class which will be updated/saved
     * @returns Observable after the completion of the underlying functionality. Generic type is an instance of a News class
     */
    save(news: News): Observable<News> {
        return this.http.post(NEWS_PATH, JSON.stringify(news), NewsService.getAuthRequestOptions())
            .map((response: Response) => {
                response.json();
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * Retrieves specified subset of data in manageable form
     * @param page - the page of data to retrieve
     * @param size - the size of the page
     */
    findSubset(page: string, size: string): Observable<News[]> {
        return this.http.get(SUBSET_NEWS_PATH, NewsService.getRequestOptionsWithPage(page, size))
            .map((response: Response) => {
                return response.json().content;
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * Retrieves approved and relevant subset of data in manageable form
     * @param page - the page of data to retrieve
     * @param size - the size of the page
     */
    findAllReviewedAndRelevant(page: string, size: string): Observable<News[]> {
        return this.http.get(SUBSET_REVIEWED_RELEVANT_PATH, NewsService.getRequestOptionsWithPage(page, size))
            .map((response: Response) => {
                return response.json().content;
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * Retrieves specified subset of data in manageable form
     * @param page - the page of data to retrieve
     * @param size - the size of the page
     * @param status - determines what type of articles to request
     */
    findAllReviewed(page: string, size: string, status: String): Observable<News[]> {
        return this.http.get(SUBSET_STATUS_NEWS_PATH + '/' + status, NewsService.getRequestOptionsWithPage(page, size))
            .map((response: Response) => {
                return response.json().content;
            })
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * Search params to request just a chunk of data
     * @param page - the page of data to retrieve
     * @param size - the size of the page
     * @returns {URLSearchParams} - Map-like representation of the url search parameters
     */
    private static getUrlSearchParams(page: string, size: string): URLSearchParams {
        let params = new URLSearchParams();
        params.set('page', page);
        params.set('size', size);
        return params;
    }

    /**
     * Provides means to obtain headers with embedded authentication information
     * @returns {RequestOptions} - object with JWT authentication information
     */
    private static getAuthRequestOptions(): RequestOptions {
        return new RequestOptions({
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                })
            }
        );
    }

    /**
     * Provides means to obtain headers with content-type information
     * @returns {RequestOptions} - object with content-type information
     */
    private static getPlainRequestOptions(): RequestOptions {
        return new RequestOptions({
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }
        );
    }

    /**
     * Provides means to obtain headers and request params
     * @returns {RequestOptions} - object with specified content-type and parameters information
     */
    private static getRequestOptionsWithPage(page: string, size: string): RequestOptions {
        return new RequestOptions({
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                params: NewsService.getUrlSearchParams(page, size)
            }
        );
    }
}