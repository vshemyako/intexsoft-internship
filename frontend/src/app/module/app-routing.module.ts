import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../component/dashboard.component";
import {UserComponent} from "../component/user.component";
import {UserDetailComponent} from "../component/user-detail.component";
import {LoginFormComponent} from "../component/login-form.component";
import {NewsComponent} from "../component/news.component";
import {SignupFormComponent} from "../component/signup-form.component";
import {WorkspaceComponent} from "../component/workspace.component";
import {PageNotFoundComponent} from "../component/page-not-found.component";
import {NavigationGuard} from "../guard/navigation.guard";
import {NewsDetailComponent} from "../component/news-detail.component";

/**
 * An array of key/value pairs which in essence specify what urls correspond to particular views
 */
const routes: Routes = [
    {
        path: 'users',
        component: UserComponent
    },
    {
        path: '',
        redirectTo: 'news',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
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
        path: 'workspace',
        component: WorkspaceComponent,
        canActivate: [NavigationGuard]
    },
    {
        path: 'user/:id',
        component: UserDetailComponent
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
