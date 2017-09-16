import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../component/dashboard.component";
import {UserComponent} from "../component/user.component";
import {UserDetailComponent} from "../component/user-detail.component";
import {LoginFormComponent} from "../component/login-form.component";
import {HomeComponent} from "../component/home.component";

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
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'user/:id',
        component: UserDetailComponent
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
        path: 'home',
        component: HomeComponent
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
