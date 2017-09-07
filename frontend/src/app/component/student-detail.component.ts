import {Component, Inject, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';

import {Student} from "../model/student";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {IStudentService} from "../service/istudent.service";

/**
 * Component which controls student extra information which might be rendered
 */
@Component({
    selector: 'student-detail',
    templateUrl: '../../assets/html/student-detail.component.html',
    styleUrls: ['../../assets/style/student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

    student: Student;

    constructor(@Inject("studentService") private studentService: IStudentService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    /**
     * A method which is called right after the initialization of an object. Eventually it assigns a retrieved instance
     * of a Student class to a private field, which will be later used for template rendering
     */
    ngOnInit(): void {
        this.getOne();
    }

    /**
     * Retrieves a requested instance of a Student class specifying its identifier. This is possible due to the
     * underlying interface ActivatedRoute implementation of which contain information about a route associated with a
     * component loaded in an <router-outlet> html tag.
     */
    getOne(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.studentService.getOne(+params.get('id')))
            .subscribe((student: Student) => this.student = student);
    }

    /**
     *  Simply displays previously rendered page. This is possible due to the Location service which is navigates one
     *  step backwards in the browser's history stack
     */
    goBack(): void {
        this.router.navigateByUrl('dashboard');
    }

    /**
     * Persists an instance of a Student class into underlying data storage
     */
    save(): void {
        this.studentService.save(this.student)
            .then(() => this.goBack());
    }
}
