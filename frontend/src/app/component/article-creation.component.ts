import {Component, OnInit, Inject} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";
import {News} from "../model/news";
import {NativeDateAdapter, DateAdapter} from "@angular/material";
import {Category} from "../model/category";
import {INewsService} from "../service/inews.service";
import {Router} from "@angular/router";

/**
 * Controls features of the application associated with article creation logic
 */
@Component({
    selector: 'app-article-creation',
    templateUrl: '../../assets/html/article-creation.component.html',
    styleUrls: ['../../assets/style/article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

    private article: News;
    private articleFormControl: FormGroup;

    private startTime: string;
    private startDate: string;

    private endTime: string;
    private endDate: string;

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
                private router: Router,
                dateAdapter: DateAdapter<NativeDateAdapter>) {
        dateAdapter.setLocale('en-GB');
    }

    ngOnInit() {
        this.article = new News();
        this.articleFormControl = new FormGroup({
            'validTitle': new FormControl((this.article.title, [Validators.required, Validators.minLength(5)])),
            'validDescription': new FormControl(this.article.description, [Validators.required, Validators.minLength(20), Validators.maxLength(160)]),
            'validArticle': new FormControl(this.article.article, [Validators.required, Validators.minLength(100), Validators.maxLength(1500)]),
        });
    }

    /**
     * Adds information to article object and invoke save() method to persist new article in a database
     */
    private uploadArticle(): void {
        this.article.startDisplay = this.getTimeInLocalMillis(this.startTime, this.startDate);
        this.article.endDisplay = this.getTimeInLocalMillis(this.endTime, this.endDate);
        this.article.categories = this.createCategoriesArray();
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
}
