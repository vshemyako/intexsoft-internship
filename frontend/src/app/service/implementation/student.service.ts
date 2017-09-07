import {Injectable, Inject} from '@angular/core';
import {Headers, Http, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise'

import {Student} from "../../model/student";
import {IStudentService} from "../istudent.service";
import {IAuthenticationService} from "../iauthentication.service";

const FIND_ALL_URL = 'api/students';
const GET_ONE_URL = 'api/student';

/**
 * Service which provides method to perform basic CRUD operations
 */
@Injectable()
export class StudentService implements IStudentService {

    private options: RequestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token
            })
        }
    );

    constructor(@Inject('authenticationService') private authenticationService: IAuthenticationService,
                private http: Http) {
    }

    /**
     * @returns Promise after the completion of the underlying functionality. Generic type is array of Student instances
     */
    findAll(): Promise<Student[]> {
        return this.http.get(FIND_ALL_URL, this.options)
            .toPromise()
            .then(response => response.json());
    }

    /**
     * @param {number} id - unique identifier of an instance
     * @returns Promise after the completion of the underlying functionality. Generic type is an instance of a Student class
     */
    getOne(id: number): Promise<Student> {
        const url = `${GET_ONE_URL}/${id}`;
        return this.http.get(url, this.options)
            .toPromise()
            .then(response => response.json());
    }

    /**
     * @param {Student} student - an instance of a Student class which will be updated/saved
     * @returns Promise after the completion of the underlying functionality. Generic type is an instance of a Student class
     */
    save(student: Student): Promise<Student> {
        return this.http.post(GET_ONE_URL, JSON.stringify(student), this.options)
            .toPromise()
            .then(response => response.json());
    }
}
