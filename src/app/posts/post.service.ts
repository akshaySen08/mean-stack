import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListner(){
      return this.postUpdated.asObservable();
  }

  addNewPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
}
