import {Component, Inject, OnInit} from '@angular/core';

import {Student} from "../model/student";
import {Router} from "@angular/router";
import {IStudentService} from "../service/istudent.service";

/**
 * Controller which using provided services displays college students
 */
@Component({
    selector: 'students-root',
    templateUrl: '../../assets/html/student.component.html',
    styleUrls: ['../../assets/style/student.component.css']
})
export class StudentComponent implements OnInit {

    selectedStudent: Student;
    students: Student[];

    constructor(@Inject('studentService') private studentService: IStudentService,
                private router: Router) {
    }

    /**
     * A method which is called right after the initialization of an object. In particular it invokes findAll() method,
     * results of which are used to render component's view
     */
    ngOnInit(): void {
        this.findAll();
    }

    /**
     * Assigns a list of students retrieved from an underlying service
     */
    findAll(): void {
        this.studentService.findAll()
            .then((students: Student[]) => this.students = students)
            .catch((e: Error) => alert(e.message));
    }

    /**
     * @param {Student} student - which will be rendered with extra details
     */
    onSelect(student: Student): void {
        this.selectedStudent = student;
    }

    /**
     * Method is showing extra detail of a chosen student with the help of router method navigate. This method receives
     * an array consisting of a path and a route parameter. Both of them specify what controllers template will be
     * generated
     */
    showDetails(): void {
        this.router.navigate(['/student', this.selectedStudent.id])
            .catch((e: Error) => alert(e.message));
    }
}
