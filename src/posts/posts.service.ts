import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {

  private posts = [];

  create(post) {
    this.posts.push(post);
    return post;
  };

};
