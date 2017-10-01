import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";
import {News} from "../model/news";
import {NativeDateAdapter, DateAdapter} from "@angular/material";
import {Timestamp} from "rxjs";
import {Category} from "../model/category";

/**
 * Controls features of the application associated with article creation logic
 */
@Component({
    selector: 'app-article-creation',
    templateUrl: '../../assets/html/article-creation.component.html',
    styleUrls: ['../../assets/style/article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

    //TODO: bind article creator
    private currentUser: User;
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
     * Defines possible user roles
     */
    private categories = {
        isGlobal: false,
        isSport: false,
        isArt: false,
        isPolitics: false,
        isJoy: false
    };

    constructor(dateAdapter: DateAdapter<NativeDateAdapter>) {
        dateAdapter.setLocale('en-GB');
    }

    ngOnInit() {
        this.article = new News();
        this.articleFormControl = new FormGroup({
            'validTitle':new FormControl((this.article.title, [Validators.required, Validators.minLength(5)])),
            'validDescription': new FormControl(this.article.description, [Validators.required, Validators.minLength(20), Validators.maxLength(160)]),
            'validArticle': new FormControl(this.article.article, [Validators.required, Validators.minLength(100), Validators.maxLength(1500)]),
        });
    }

    private uploadArticle(): void {
        this.article.startDisplay = this.getTimeInLocalMillis(this.startTime, this.startDate);
        this.article.endDisplay = this.getTimeInLocalMillis(this.endTime, this.endDate);
        this.article.categories = this.createCategoriesArray();
        console.log(this.article);
    }

    /**
     * Convert provided time and date values into local milliseconds from 1970
     * @param time - string which represents time value
     * @param date - string which represents date value
     * @returns {number} - sum number of millis from 1970 IN UTC
     */
    private getTimeInLocalMillis(time: string, date: string): number {
        let timeArray: String[] = time.split(':');
        let millisFromTime: number = +timeArray[0] * 60 * 60 * 1000 + +timeArray[1] * 60 * 1000;
        let millisFromDate: number = Date.parse(date) + 3 * 60 * 60 * 1000;
        return millisFromTime + millisFromDate;
    }

    /**
     * Creates new Authority array which is appended to user instance
     */
    private createCategoriesArray(): Category[] {
        let authorityArray: Category[] = [];
        if (this.categories.isGlobal) {
            authorityArray.push(new Category(17, 'global'))
        }
        if (this.categories.isSport) {
            authorityArray.push(new Category(18, 'sport'))
        }
        if (this.categories.isArt) {
            authorityArray.push(new Category(19, 'art'))
        }
        if (this.categories.isPolitics) {
            authorityArray.push(new Category(20, 'politics'))
        }
        if (this.categories.isJoy) {
            authorityArray.push(new Category(20, 'entertainment'))
        }
        return authorityArray;
    }
}
