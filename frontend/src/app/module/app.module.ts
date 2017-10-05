import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {
    MdToolbarModule,
    MdTabsModule,
    MdButtonModule,
    MdMenuModule,
    MdIconModule,
    MdCardModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdExpansionModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdGridListModule,
    MdSelectModule,
    MdTableModule,
    MdRadioModule,
    MdSlideToggleModule,
    MdCheckboxModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AppComponent} from "../component/app.component";
import {UserDetailComponent} from "../component/user-detail.component";
import {UserService} from "../service/implementation/user.service";
import {AppRoutingModule} from "./app-routing.module";
import {LoginFormComponent} from "../component/login-form.component";
import {NewsComponent} from "../component/news.component";
import {AuthenticationService} from "../service/implementation/authentication.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SignupFormComponent} from "../component/signup-form.component";
import {PageNotFoundComponent} from "../component/page-not-found.component";
import {AdminSectionGuard} from "../guard/admin-section.guard";
import {NewsService} from "../service/implementation/news.service";
import {NewsDetailComponent} from "../component/news-detail.component";
import {PersonalDataComponent} from "../component/personal-data.component";
import {AdminComponent} from "../component/admin.component";
import {ArticleCreationComponent} from "../component/article-creation.component";
import {ArticleRevisionComponent} from "../component/article-revision.component";
import {ArticleCreationDetailComponent} from "../component/article-creation-detail.component";
import {MomentModule} from "angular2-moment";
import {ArticleRevisionSectionGuard} from "../guard/article-revision-section-guard";
import {ArticleCreationSectionGuard} from "../guard/article-creation-section-guard";
import {PersonalSectionGuard} from "../guard/personal-section.guard";

const URL_I18N_FILES = './assets/i18n/';
const FILE_FORMAT = '.json';

/**
 * @param {HttpClient} http - an object of type HttpClient which has methods
 * to perform http requests
 * @returns {TranslateHttpLoader} - wrapper object, which in essence uses
 * underlying HttpClient to load translations via http protocol
 */
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(http, URL_I18N_FILES, FILE_FORMAT);
}

/**
 * The root module of the application conventionally named AppModule. Specifies overall structure of the application.
 * Provides necessary services and feature modules.
 */
@NgModule({
    declarations: [
        AppComponent,
        UserDetailComponent,
        LoginFormComponent,
        NewsComponent,
        NewsDetailComponent,
        SignupFormComponent,
        PageNotFoundComponent,
        PersonalDataComponent,
        AdminComponent,
        ArticleCreationComponent,
        ArticleRevisionComponent,
        ArticleCreationDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MdToolbarModule,
        MdTabsModule,
        MdButtonModule,
        MdMenuModule,
        MdIconModule,
        MdCardModule,
        MdInputModule,
        MdProgressSpinnerModule,
        MdExpansionModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdGridListModule,
        MdSelectModule,
        MdTableModule,
        MdRadioModule,
        MdSlideToggleModule,
        MdCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        HttpClientModule,
        MomentModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        {provide: 'userService', useClass: UserService},
        {provide: 'authenticationService', useClass: AuthenticationService},
        {provide: 'newsService', useClass: NewsService},
        AdminSectionGuard,
        ArticleRevisionSectionGuard,
        ArticleCreationSectionGuard,
        PersonalSectionGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
