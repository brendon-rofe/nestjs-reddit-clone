import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {};

  @Post()
  async create(@Body() newPost: CreatePostDto ) {
    return await this.postsService.create(newPost);
  };

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.postsService.findById(parseInt(id));
  };

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  };
};
