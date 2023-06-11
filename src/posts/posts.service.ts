import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {};

  async create(post: CreatePostDto) {
    const newPost = await this.postRepo.create(post);
    await this.postRepo.save(newPost);
    return newPost;
  };

  async findById(id: number) {
    return await this.postRepo.findOneBy({ id });
  };

  async findAll() {
    return await this.postRepo.find();
  };

  async update(id: number, updatedPost: UpdatePostDto) {
    const post = await this.postRepo.findOneBy({ id });
    if(!post) {
      throw new Error('Post not found');
    };
    await this.postRepo.update(id, updatedPost);
    return await this.postRepo.findOneBy({ id });
  };

  async delete(id: number) {
    const post = await this.postRepo.findOneBy({ id });
    if(!post) {
      throw new Error('Post not found');
    };
    await this.postRepo.delete(id);
    return { message: 'Post successfully deleted' };
  };
};
