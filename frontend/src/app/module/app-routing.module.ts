import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../component/dashboard.component";
import {StudentComponent} from "../component/student.component";
import {StudentDetailComponent} from "../component/student-detail.component";
import {AdminFormComponent} from "../component/admin-form.component";
import {HomeComponent} from "../component/home.component";

/**
 * An array of key/value pairs which in essence specify what urls correspond to particular views
 */
const routes: Routes = [
    {
        path: 'students',
        component: StudentComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'student/:id',
        component: StudentDetailComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'form',
        component: AdminFormComponent
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
