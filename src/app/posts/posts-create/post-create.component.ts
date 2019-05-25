import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';

import { PostService } from '../post.service';

@Component({
    selector: 'app-post-create',
    templateUrl: 'post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    postContent = '';
    postTitle = '';

    constructor(public postService: PostService) { }


    onAddPost(newPost: NgForm) {
        if (newPost.invalid) {
            return;
        }
        this.postService.addNewPost(newPost.value.postTitle, newPost.value.postContent);
        newPost.resetForm();
    }
}
