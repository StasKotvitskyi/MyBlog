import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {User} from "../../shared/interfaces";
import {AuthorizationService} from "../shared/services/authorization.service";


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
    form!: FormGroup;
    submitted = false;
    message: string = "";

    constructor(
        public auth: AuthorizationService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            if(params["loginAgain"]) {
                this.message = "Спочатку авторизуйтесь";
            } else if(params["authFailed"]) {
                this.message = "Сесія закінчилася, авторизуйтесь повторно";
            }
        })

        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.email,
                Validators.required
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ]),
        })
    }

    submit() {
        if(this.form.invalid) {
            return;
        }

        this.submitted = true;

        const user: User = {
            email: this.form.value.email,
            password: this.form.value.password
        }

        this.auth.login(user).subscribe(() => {
            this.form.reset();
            this.router.navigate(["/admin", "dashboard"]);
            this.submitted = false;
            }, () => {this.submitted = false}
        )
    }
}
