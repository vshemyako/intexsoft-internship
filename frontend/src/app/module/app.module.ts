import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import {AppComponent} from "../component/app.component";
import {StudentComponent} from "../component/student.component";
import {StudentDetailComponent} from "../component/student-detail.component";
import {StudentService} from "../service/implementation/student.service";
import {DashboardComponent} from '../component/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {AdminFormComponent} from '../component/admin-form.component';
import {HomeComponent} from '../component/home.component';
import {AuthenticationService} from "../service/implementation/authentication.service";

const URL_I18N_FILES = 'assets/i18n/';
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
        StudentComponent,
        StudentDetailComponent,
        DashboardComponent,
        AdminFormComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [{provide: 'studentService', useClass: StudentService},
        {provide: 'authenticationService', useClass: AuthenticationService}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
