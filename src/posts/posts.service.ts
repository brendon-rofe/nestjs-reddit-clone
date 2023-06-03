import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PostsService {

  private posts = [];

  create(post) {
    this.posts.push(post);
    return post;
  };

  findById(id: number) {
    const post = this.posts.find(post => post.id === id);
    if(!post) throw new NotFoundException(`Post with ID${id} not found`);
    return post;
  };

};
