import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {User} from "../model/user";

@Component({
    selector: 'app-article-creation',
    templateUrl: '../../assets/html/article-creation.component.html',
    styleUrls: ['../../assets/style/article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

    private currentUser: User;
    private personalFormControl: FormGroup;

    /**
     * Error message which will be displayed in case of erroneous login/password input
     */
    private errorMessage: string;

    /**
     * Is used to display/hide login form
     */
    private submitted: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

}
