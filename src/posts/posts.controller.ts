import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatedPost: UpdatePostDto) {
    return await this.postsService.update(parseInt(id), updatedPost);
  };

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.postsService.delete(parseInt(id));
  };
};
