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
export class WorkspaceComponent implements OnInit {

    /**
     * Determines what part of the workspace is opened and visible for the user
     */
    private step: number;

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


    ngOnInit() {
    }
}
