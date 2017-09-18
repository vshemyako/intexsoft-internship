import {Component, OnInit, Inject} from "@angular/core";
import {Router} from "@angular/router";
import {IUserService} from "../service/iuser.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'signup-component',
    templateUrl: '../../assets/html/signup-form.component.html',
    styleUrls: ['../../assets/style/signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

    private username: string;
    private password: string;
    private signupFormControl: FormGroup;

    constructor(@Inject('userService') private userService: IUserService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.signupFormControl = new FormGroup({
            'validName': new FormControl(this.username, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
            'validPassword': new FormControl(this.password, [Validators.required, Validators.minLength(3), Validators.maxLength(16)])
        });
    }
}
