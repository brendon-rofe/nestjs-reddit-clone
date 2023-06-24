import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos';

@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) {};

  @Post()
  async create(@Body() dto: CreatePostDto ) {
    return await this.postsService.create(dto);
  };

};
