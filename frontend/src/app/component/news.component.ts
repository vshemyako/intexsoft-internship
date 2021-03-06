import {Component, Inject, OnInit} from "@angular/core";
import {INewsService} from "../service/inews.service";
import {News} from "../model/news";

/**
 * @type {number} - number of articles per page request
 */
const SIZE_OF_A_PAGE = 2;

/**
 * @type {number} - defines how big increment will be
 */
const PAGE_STEP = 1;

const IMAGE_SOURCE = './assets/image/';

/**
 * Renders news objects which are intended to be displayed on the home page.
 * Provides only superficial information of articles
 */
@Component({
    selector: 'news',
    templateUrl: '../../assets/html/news.component.html',
    styleUrls: ['../../assets/style/news.component.css']
})
export class NewsComponent implements OnInit {

    /**
     * Tracks number of pages already displayed
     */
    private pageNumber: number;
    private errorMessage: string;
    private articles: News[];
    private Math: any;
    private imageSource:string = './assets/image/';
    private imageFormat:string = '.jpeg';

    constructor(@Inject('newsService') private newsService: INewsService) {
        this.pageNumber = 0;
    }

    /**
     * As soon as a component is initialized several articles are requested to be displayed
     */
    ngOnInit(): void {
        this.newsService.findAllReviewedAndRelevant(this.pageNumber.toString(), SIZE_OF_A_PAGE.toString())
            .subscribe((articles: News[]) => {
                    this.articles = articles;
                },
                error => {
                    this.errorMessage = 'Sorry! No more articles available at the moment!';
                });
        this.pageNumber += PAGE_STEP;
    }

    /**
     * Makes use of newsService to request more articles to display from db
     */
    loadMoreArticles(): void {
        this.newsService.findAllReviewedAndRelevant(this.pageNumber.toString(), SIZE_OF_A_PAGE.toString())
            .subscribe((articles: News[]) => {
                    if (articles.length > 0) {
                        articles.forEach(article => {
                            this.articles.push(article);
                        });
                        this.pageNumber += PAGE_STEP;
                    }
                },
                error => {
                    this.errorMessage = 'Sorry! No more articles available at the moment!';
                });
    }
}
