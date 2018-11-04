import { Component, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

  @Input() posts: Post[] = [];

  // public is typescript keyword that will create an object and save it with the value of type PostsService
  constructor(public postsService: PostsService) {

  }
}


