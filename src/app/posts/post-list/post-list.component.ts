import { Component } from '@angular/core';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
    posts = [
        {
            title: 'Post 1', content: 'post one content'
        },
        {
            title: 'Post 12', content: 'post two content'
        },
        {
            title: 'Post 3', content: 'post three content'
        },
        {
            title: 'Post 4', content: 'post four content'
        }
    ];
}