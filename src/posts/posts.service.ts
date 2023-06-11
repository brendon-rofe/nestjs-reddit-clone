import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dtos/create-post.dto';

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
};
