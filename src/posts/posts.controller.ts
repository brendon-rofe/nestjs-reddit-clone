import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {};

  @Post()
  create(@Body() post) {
    return this.postsService.create(post);
  };

};
