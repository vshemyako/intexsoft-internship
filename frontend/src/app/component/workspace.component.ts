import {Component, OnInit} from '@angular/core';

/**
 * This is the main component for changing personal information, article creation and article revision.
 * Administrator is also possible to review accounts of registered users and enable this accounts.
 * Application is designed in such a way that new users are disabled by default
 */
@Component({
    selector: 'app-workspace',
    templateUrl: '../../assets/html/workspace.component.html',
    styleUrls: ['../../assets/style/workspace.component.css']
})
export class WorkspaceComponent {

    /**
     * Determines what part of the workspace is opened and visible for the currentUser
     */
    private step: number;

    private selectedStatus: string;
    private statuses = [
        {value: 'created-0', viewValue: 'Created'},
        {value: 'approved-1', viewValue: 'Approved'},
        {value: 'rejected-2', viewValue: 'Rejected'},
        {value: 'displayed-3', viewValue: 'Displayed'},
        {value: 'archived-4', viewValue: 'Archived'}
    ];

    private selectedCategory: string;
    private categories = [
        {value: 'global-0', viewValue: 'Global'},
        {value: 'sport-1', viewValue: 'Sport'},
        {value: 'art-2', viewValue: 'Art'},
        {value: 'politics-3', viewValue: 'Politics'},
        {value: 'entertainment-4', viewValue: 'Entertainment'}
    ];

    constructor() {
        this.step = 0;
    }

    /**
     * @param index - determines the current step of a workspace
     */
    private setStep(index: number) {
        this.step = index;
    }

    /**
     * Increase private step variable by 1
     */
    private nextStep() {
        this.step++;
    }

    /**
     * Decrease private step variable by 1
     */
    private prevStep() {
        this.step--;
    }

    
}
