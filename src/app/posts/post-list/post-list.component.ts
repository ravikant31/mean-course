import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription} from 'rxjs';

import {Post} from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.components.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [{title: 'First Post', content:  'This is the first post\'s component'},
  // {title: 'Second Post', content:  'This is the second post\'s component'},
  // {title: 'Third Post', content:  'This is the third post\'s component'},
  // {title: 'Fourth Post', content:  'This is the fourth post\'s component'},
  // {title: 'Fifth Post', content:  'This is the fifth post\'s component'}
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
