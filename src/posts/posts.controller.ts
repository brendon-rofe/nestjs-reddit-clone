import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {};

  @Post()
  create(@Body() post) {
    return this.postsService.create(post);
  };

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.postsService.findById(parseInt(id));
  };

};
