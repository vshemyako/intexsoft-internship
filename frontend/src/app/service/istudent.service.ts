import {Student} from "../model/student";

/**
 * Interface specifies some of the CRUD operations which can be proceed upon {@see Student} instances
 */
export interface IStudentService {

    /**
     * @returns Promise after the completion of the underlying functionality. Generic type is array of Student instances
     */
    findAll(): Promise<Student[]>;

    /**
     * @param {number} id - unique identifier of an instance
     * @returns Promise after the completion of the underlying functionality. Generic type is an instance of a Student class
     */
    getOne(id: number): Promise<Student>;

    /**
     * @param {Student} student - an instance of a Student class which will be updated/saved
     * @returns Promise after the completion of the underlying functionality. Generic type is an instance of a Student class
     */
    save(student: Student): Promise<Student>;
}