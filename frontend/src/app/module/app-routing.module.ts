import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UserDetailComponent} from "../component/user-detail.component";
import {LoginFormComponent} from "../component/login-form.component";
import {NewsComponent} from "../component/news.component";
import {SignupFormComponent} from "../component/signup-form.component";
import {PageNotFoundComponent} from "../component/page-not-found.component";
import {NewsDetailComponent} from "../component/news-detail.component";
import {PersonalDataComponent} from "../component/personal-data.component";
import {AdminComponent} from "../component/admin.component";
import {ArticleCreationComponent} from "../component/article-creation.component";
import {ArticleRevisionComponent} from "../component/article-revision.component";
import {ArticleCreationDetailComponent} from "../component/article-creation-detail.component";

/**
 * An array of key/value pairs which in essence specify what urls correspond to particular views
 */
const routes: Routes = [
    {
        path: '',
        redirectTo: 'news',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginFormComponent
    },
    {
        path: 'news',
        component: NewsComponent
    },
    {
        path: 'signup',
        component: SignupFormComponent
    },
    {
        path: 'personal',
        component: PersonalDataComponent
        /*canActivate: [NavigationGuard]*/
    },
    {
        path: 'admin',
        component: AdminComponent
        /*canActivate: [NavigationGuard]*/
    },
    {
        path: 'create',
        component: ArticleCreationComponent
        /*canActivate: [NavigationGuard]*/
    },
    {
        path: 'news/detail/:id',
        component: ArticleCreationDetailComponent
        /*canActivate: [NavigationGuard]*/
    },
    {
        path: 'review',
        component: ArticleRevisionComponent
        /*canActivate: [NavigationGuard]*/
    },
    {
        path: 'user/:id',
        component: UserDetailComponent
        /*canActivate: [NavigationGuard]*/
    },
    {
        path: 'news/:id',
        component: NewsDetailComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

/**
 * Feature module which provides navigation capabilities to a program
 */
@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
