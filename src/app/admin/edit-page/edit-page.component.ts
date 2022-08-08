import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {PostService} from "../../shared/post.service";
import {Post} from "../../shared/interfaces";
import {AlertService} from "../shared/services/alert.service";

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

    form!: FormGroup;
    post!: Post;
    submitted = false;
    uSub!: Subscription;

    constructor(
        private route: ActivatedRoute,
        private postService: PostService,
        private alert: AlertService
    ) {}

    ngOnInit() {
        this.route.params.pipe(
            switchMap( (params) => {
                return this.postService.getById(params['id' as string])
            })
        ).subscribe((post) => {
            this.post = post;
            this.form = new FormGroup({
                title: new FormControl(post.title, Validators.required),
                text: new FormControl(post.text, Validators.required),
                author: new FormControl(post.author, Validators.required)
            })
        })
    }

    ngOnDestroy() {
        if(this.uSub) {
            this.uSub.unsubscribe();
        }
    }

    submit() {
        if(this.form.invalid) {
            return
        } else {
            this.submitted = true;
            this.uSub = this.postService.update({
                title: this.form.value.title,
                text: this.form.value.text,
                author: this.form.value.author,
                date: this.post.date,
                id: this.post.id
            }).subscribe(() => {
                this.submitted = false;
                this.alert.warning(`Пост відредаговано`);
            })
        }
    }
}
