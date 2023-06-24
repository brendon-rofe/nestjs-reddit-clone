import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos';

@Injectable()
export class PostsService {

  constructor(@InjectRepository(PostEntity) private postsRepo: Repository<PostEntity>) {};

  async create(dto: CreatePostDto) {
    const newPost = await this.postsRepo.create(dto);
    await this.postsRepo.save(newPost);
    return { message: 'New post created', post: newPost };
  };

  async findById(postId: number) {
    const post = await this.postsRepo.findOneBy({ id: postId });
    if(!post) {
      throw new HttpException(`Post with ID: ${postId} not found`, HttpStatus.NOT_FOUND);
    };
    return post;
  };

};
