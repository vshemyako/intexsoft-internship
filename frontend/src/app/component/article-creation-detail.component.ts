import {Component, OnInit, Inject} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {News} from "../model/news";
import {INewsService} from "../service/inews.service";
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {DateAdapter, NativeDateAdapter} from "@angular/material";
import * as moment from 'moment';
import {Category} from "../model/category";
import {Status} from "../model/status";

/**
 * Controls features of the application associated with article revision logic
 */
@Component({
    selector: 'app-article-creation-detail',
    templateUrl: '../../assets/html/article-creation-detail.component.html',
    styleUrls: ['../../assets/style/article-creation-detail.component.css']
})
export class ArticleCreationDetailComponent implements OnInit {

    private article: News;
    private articleFormControl: FormGroup;

    private startTime: string;
    private startDate: Date;

    private endTime: string;
    private endDate: Date;

    private status: boolean = false;

    /**
     * Error message which will be displayed in case of erroneous login/password input
     */
    private errorMessage: string;

    /**
     * Is used to display/hide login form
     */
    private submitted: boolean = false;

    /**
     * Defines possible article categories
     */
    private categories = {
        isGlobal: false,
        isSport: false,
        isArt: false,
        isPolitics: false,
        isJoy: false
    };

    constructor(@Inject('newsService') private newsService: INewsService,
                private route: ActivatedRoute,
                private router: Router,
                dateAdapter: DateAdapter<NativeDateAdapter>) {
        dateAdapter.setLocale('en-GB');
    }

    ngOnInit() {
        this.article = new News();
        this.getOne();
        this.articleFormControl = new FormGroup({
            'validTitle': new FormControl(this.article.title, [Validators.required, Validators.minLength(5)]),
            'validDescription': new FormControl(this.article.description, [Validators.required, Validators.minLength(20), Validators.maxLength(160)]),
            'validArticle': new FormControl(this.article.article, [Validators.required, Validators.minLength(100), Validators.maxLength(1500)]),
        });
    }

    /**
     * Retrieves a requested instance of a News class specifying its identifier. This is possible due to the
     * underlying interface ActivatedRoute implementation of which contain information about a route associated with a
     * component loaded in an <router-outlet> html tag.
     */
    private getOne(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.newsService.getOne(+params.get('id')))
            .subscribe((article: News) => {
                this.article = article;
                this.parseDateFields();
                this.syncCategoriesArray();
                this.syncStatus();
            });
    }

    /**
     * Parses article's startDate and endDate fields and injects them in the fields of the current class
     */
    private parseDateFields(): void {
        let parsedStartDate: Date = moment(this.article.startDisplay).toDate();
        this.startTime = moment(parsedStartDate).format('HH:mm');
        this.startDate = moment(parsedStartDate, 'YYYY-MM-DD').toDate();

        let parsedEndDate: Date = moment(this.article.endDisplay).toDate();
        this.endTime = moment(parsedEndDate).format('HH:mm');
        this.endDate = moment(parsedEndDate, 'YYYY-MM-DD').toDate();
    }

    /**
     * Changes boolean category array to correctly display them on UI
     */
    private syncCategoriesArray(): void {
        for (let category of this.article.categories) {
            if (category.name === 'global') {
                this.categories.isGlobal = true;
            }
            if (category.name === 'sport') {
                this.categories.isSport = true;
            }
            if (category.name === 'art') {
                this.categories.isArt = true;
            }
            if (category.name === 'politics') {
                this.categories.isPolitics = true;
            }
            if (category.name === 'entertainment') {
                this.categories.isJoy = true;
            }
        }
    }

    /**
     * Synchronize UI with article's status
     */
    private syncStatus(): void {
        if (this.article.status) {
            this.article.status.name === 'approved' ? this.status = true : this.status = false;
        }
    }

    /**
     * Synchronize aritcle's status with UI approved trigger
     */
    private updateStatus(): void {
        if (this.status) {
            this.article.status = new Status(13, 'approved');
        } else {
          this.article.status = new Status(12, 'created');
        }
    }

    /**
     * Adds information to article object and invoke save() method to persist new article in a database
     */
    private uploadArticle(): void {
        this.article.startDisplay = this.getTimeInLocalMillis(this.startTime, this.startDate.toDateString());
        this.article.endDisplay = this.getTimeInLocalMillis(this.endTime, this.endDate.toDateString());
        this.article.categories = this.createCategoriesArray();
        this.updateStatus();
        this.save();
    }

    /**
     * Convert provided time and date values into local milliseconds from 01.01.1970
     * @param time - string which represents time value
     * @param date - string which represents date value
     * @returns {number} - sum number of millis from 01.01.1970 IN UTC
     */
    private getTimeInLocalMillis(time: string, date: string): number {
        let millisFromTime: number = 0;
        if (time) {
            let timeArray: String[] = time.split(':');
            millisFromTime = +timeArray[0] * 60 * 60 * 1000 + +timeArray[1] * 60 * 1000;
        }
        let millisFromDate: number = 0;
        if (date) {
            millisFromDate = Date.parse(date);
        }
        return millisFromTime + millisFromDate;
    }

    /**
     * Creates new Authority array which is appended to user instance
     */
    private createCategoriesArray(): Category[] {
        let categoryArray: Category[] = [];
        if (this.categories.isGlobal) {
            categoryArray.push(new Category(17, 'global'))
        }
        if (this.categories.isSport) {
            categoryArray.push(new Category(18, 'sport'))
        }
        if (this.categories.isArt) {
            categoryArray.push(new Category(19, 'art'))
        }
        if (this.categories.isPolitics) {
            categoryArray.push(new Category(20, 'politics'))
        }
        if (this.categories.isJoy) {
            categoryArray.push(new Category(21, 'entertainment'))
        }
        return categoryArray;
    }

    /**
     * A method which is invoked when all needed information has been provided in the article creation form.
     * A consequent http request is send to back-end part of the application
     */
    save(): void {
        this.submitted = true;
        this.errorMessage = null;

        let article: News = this.article;
        this.newsService.save(article)
            .subscribe(result => {
                    this.router.navigate(['/'])
                },
                error => {
                    this.submitted = false;
                    this.errorMessage = "Article_Creation_Error";
                });
    }

    /**
     *  Simply displays previously rendered page. This is possible due to the Location service which is navigates one
     *  step backwards in the browser's history stack
     */
    private goBack(): void {
        this.router.navigateByUrl('/review');
    }
}
