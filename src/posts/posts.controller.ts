import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dtos';

@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) {};

  @Post()
  async create(@Body() dto: CreatePostDto ) {
    return await this.postsService.create(dto);
  };

  @Get(':id')
  async findById(@Param('id') postId: string) {
    return await this.postsService.findById(parseInt(postId));
  };

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  };

  @Patch(':id')
  async update(@Param('id') postId: string, @Body() dto: UpdatePostDto) {
    return await this.postsService.update(parseInt(postId), dto);
  };

};
