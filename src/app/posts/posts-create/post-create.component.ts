import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

import { PostService } from '../post.service';

@Component({
    selector: 'app-post-create',
    templateUrl: 'post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    postContent = '';
    postTitle = '';
    private mode = '';
    private postId: string;
    public post: Post;

    constructor(public postService: PostService, public activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.postService.getPost(this.postId).subscribe(postData => {
                    this.post = {id: postData.id, title: postData.title, content: postData.content}
                });
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onSavePost(postForm: NgForm) {
        if (postForm.invalid) {
            return;
        }
        if (this.mode === 'create') {
            this.postService.addNewPost(postForm.value.postTitle, postForm.value.postContent);
        } else {
            this.postService.updatePost(this.postId, postForm.value.postTitle, postForm.value.postContent);
        }
        postForm.resetForm();
    }
}
