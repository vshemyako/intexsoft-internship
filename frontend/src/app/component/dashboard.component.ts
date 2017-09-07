import {Component, Inject, OnInit} from '@angular/core';
import {Student} from "../model/student";
import {IStudentService} from "../service/istudent.service";

const NUMBER_OF_STUDENTS: number = 4;

/**
 * Controller which delegates the best students to rendering mechanism to be displayed on the main page of an application
 */
@Component({
    selector: 'students-dashboard',
    templateUrl: '../../assets/html/dashboard.component.html',
    styleUrls: ['../../assets/style/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    students: Student[];

    constructor(@Inject('studentService') private studentService: IStudentService) {
    }

    /**
     * A method which is called right after the initialization of an object. In particular it invokes refresh() method,
     * results of which are used to render component's view
     */
    ngOnInit(): void {
        this.refresh();
    }

    /**
     * Assigns refreshed array of chosen students which will be later rendered on the main page
     */
    refresh() {
        this.studentService.findAll()
            .then((students: Student[]) => this.students = students.slice(0, NUMBER_OF_STUDENTS))
            .catch((e: Error) => alert(e.message));
    }
}
