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

  findAll() {
    return this.posts;
  };

  updatePost(updatePost) {
    const index = this.posts.findIndex(post => post.id === updatePost.id);
    if(index === -1) throw new NotFoundException(`Post with ID${updatePost.id} not found`);
    this.posts[index] = updatePost;
    return updatePost;
  };

  remove(id: number) {
    const index = this.posts.find(post => post.id === id);
    if(index === -1) throw new NotFoundException(`Post with ID${id} not found`);
    this.posts.splice(index, 1);
  }

};
