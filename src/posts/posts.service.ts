import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {};

  async create(post: CreatePostDto): Promise<Post> {
    const newPost = await this.postRepo.create(post);
    await this.postRepo.save(newPost);
    return newPost;
  };

};
