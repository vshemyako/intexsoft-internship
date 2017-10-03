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
import {AdminSectionGuard} from "../guard/admin-section.guard";
import {PersonalSectionGuard} from "../guard/personal-section.guard";
import {ArticleCreationSectionGuard} from "../guard/article-creation-section-guard";
import {ArticleRevisionSectionGuard} from "../guard/article-revision-section-guard";

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
        component: PersonalDataComponent,
        canActivate: [PersonalSectionGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminSectionGuard]
    },
    {
        path: 'create',
        component: ArticleCreationComponent,
        canActivate: [ArticleCreationSectionGuard]
    },
    {
        path: 'news/detail/:id',
        component: ArticleCreationDetailComponent,
        canActivate: [ArticleRevisionSectionGuard]
    },
    {
        path: 'review',
        component: ArticleRevisionComponent,
        canActivate: [ArticleRevisionSectionGuard]
    },
    {
        path: 'user/:id',
        component: UserDetailComponent,
        canActivate: [AdminSectionGuard]
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
