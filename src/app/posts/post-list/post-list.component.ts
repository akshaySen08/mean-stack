import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSub: Subscription;
  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.postSub = this.postService
      .getPostUpdateListner()
      .subscribe((res: Post[]) => {
        this.posts = res;
      });
  }

  ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.postSub.unsubscribe();
  }
}
