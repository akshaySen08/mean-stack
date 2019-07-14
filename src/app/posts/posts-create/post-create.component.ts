import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';

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
    isLoading = false;

    constructor(public postService: PostService, public activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postService.getPost(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = { id: postData.id, title: postData.title, content: postData.content };
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
        this.isLoading = true;
        if (this.mode === 'create') {
            this.postService.addNewPost(postForm.value.postTitle, postForm.value.postContent);
            this.toastr.success('Post Created successfully!');
        } else {
            this.postService.updatePost(this.postId, postForm.value.postTitle, postForm.value.postContent);
            this.toastr.success('Post Updated Successfully!');
        }
        postForm.resetForm();
    }
}
