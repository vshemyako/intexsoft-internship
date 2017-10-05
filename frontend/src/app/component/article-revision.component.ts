import {Component, OnInit, Inject} from '@angular/core';
import {News} from "../model/news";
import {INewsService} from "../service/inews.service";

/**
 * Info message which will be displayed to admin until he performs an action
 */
const INFO_MESSAGE: string = 'Article_Revision_Info';

/**
 * Info message which will be displayed to admin until he performs an action
 */
const ERROR_MESSAGE: string = 'Article_Revision_Error';

/**
 * @type {number} - number of users per page request
 */
const SIZE_OF_A_PAGE = 5;

/**
 * @type {number} - defines how big increment will be
 */
const PAGE_STEP = 1;

@Component({
    selector: 'app-article-revision',
    templateUrl: '../../assets/html/article-revision.component.html',
    styleUrls: ['../../assets/style/article-revision.component.css']
})
export class ArticleRevisionComponent {

    /**
     * Error message which will be displayed if request failed or no more articles to pull
     */
    private errorMessage: string;

    /**
     * Info message which urge to make an action
     */
    private infoMessage: string;

    /**
     * Show/hide info message depending on value
     */
    private showInfo: boolean;

    /**
     * Tracks number of pages already displayed
     */
    private pageNumber: number;

    /**
     * Number of displayed currentNews instances
     */
    private currentNewsNumber: number;

    /**
     * Determines which method to invoke
     */
    private methodNumber: number;

    /**
     * Is used to display/hide login form
     */
    private submitted: boolean;

    private articles: News[];

    constructor(@Inject('newsService') private newsService: INewsService) {
        this.currentNewsNumber = 1;
        this.submitted = false;
        this.showInfo = true;
        this.infoMessage = INFO_MESSAGE;
        this.pageNumber = 0;
        this.articles = [];
    }

    /**
     * Disables/enables previous UI button
     * @returns {boolean} false - if not articles to display
     */
    private hasPreviousArticles(): boolean {
        return this.pageNumber !== 0;
    }

    /**
     * Disables/enables next UI button
     * @returns {boolean} false - if no articles to display
     */
    private hasNextArticles(): boolean {
        return !!this.articles.length;

    }

    /**
     * Display/refreshes reviewer articles table
     */
    private findAll(): void {
        this.methodNumber = 0;
        this.pageNumber = 0;
        this.findSubset();
    }

    /**
     * Makes use of newsService to request more articles to display from database
     */
    private findSubset(): void {
        this.submitted = false;
        this.newsService.findSubset(this.pageNumber.toString(), SIZE_OF_A_PAGE.toString())
            .subscribe((articles: News[]) => {
                    this.articles = articles;
                    this.submitted = true;
                },
                error => {
                    this.errorMessage = ERROR_MESSAGE;
                    this.submitted = true;
                });
        this.showInfo = false;
    }

    /**
     * Converts number into LocalDate spring representation
     * @param dateToConvert - date represented in milliseconds
     * @returns {string} - string representation of a Date object
     */
    private getPrettyDate(dateToConvert: number): String {
        let date: Date = new Date(dateToConvert);
        return date.toLocaleDateString();
    }

    /**
     * Helper method to request created but not reviewed articles
     */
    private getCreated(): void {
        this.pageNumber = 0;
        this.methodNumber = 1;
        this.getAllReviewed("created");
    }

    /**
     * Helper method to request reviewed articles
     */
    private getDisplayed(): void {
        this.pageNumber = 0;
        this.methodNumber = 2;
        this.getAllReviewed("reviewed");
    }

    /**
     * Displays previously retrieved articles
     */
    private previous(): void {
        this.pageNumber -= PAGE_STEP;
        this.appropriateFindAll();
    }

    /**
     * Displays previously retrieved articles
     */
    private next(): void {
        this.pageNumber += PAGE_STEP;
        this.appropriateFindAll();
    }

    /**
     * Invokes method which is determined by method number.
     * The only purpose of this hussle - to bind next/previous buttons
     * to appropriated methods which were invoked first
     */
    private appropriateFindAll() {
        switch (this.methodNumber) {
            case 0:
                this.findSubset();
                break;
            case 1:
                this.getAllReviewed("created");
                break;
            case 2:
                this.getAllReviewed("reviewed");
                break;
        }
    }

    /**
     * Makes use of newsService to request news with specified status
     */
    private getAllReviewed(status: String): void {
        this.submitted = false;
        this.newsService.findAllReviewed(this.pageNumber.toString(), SIZE_OF_A_PAGE.toString(), status)
            .subscribe((articles: News[]) => {
                    this.articles = articles;
                    this.submitted = true;
                },
                error => {
                    this.errorMessage = ERROR_MESSAGE;
                    this.submitted = true;
                });
        this.showInfo = false;
    }
}
