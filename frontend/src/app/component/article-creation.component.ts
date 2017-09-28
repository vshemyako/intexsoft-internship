import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";
import {News} from "../model/news";


//TODO: Bind time
@Component({
    selector: 'app-article-creation',
    templateUrl: '../../assets/html/article-creation.component.html',
    styleUrls: ['../../assets/style/article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

    private currentUser: User;
    private article: News;
    private articleFormControl: FormGroup;

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

    constructor() {
    }

    ngOnInit() {
        this.article = new News();
        this.articleFormControl = new FormGroup({
            'validTitle':new FormControl((this.article.title, [Validators.required, Validators.minLength(5)])),
            'validDescription': new FormControl(this.article.description, [Validators.required, Validators.minLength(20), Validators.maxLength(160)]),
            'validArticle': new FormControl(this.article.article, [Validators.required, Validators.minLength(100), Validators.maxLength(1500)]),
        });
    }
}
