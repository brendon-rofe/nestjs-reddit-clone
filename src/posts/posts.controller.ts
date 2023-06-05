import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {};

  @Post()
  create(@Body() post) {
    return this.postsService.create(post);
  };

  @Get()
  findAll() {
    return this.postsService.findAll();
  };

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.postsService.findById(parseInt(id));
  };

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.postsService.update(parseInt(id), body);
  };

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(parseInt(id));
  };

};
