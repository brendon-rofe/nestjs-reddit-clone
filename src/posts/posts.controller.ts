import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dtos';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) {};

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreatePostDto, @Req() req: Request) {
    return await this.postsService.create(dto, req.user);
  };
  
  @Get()
  async findAll() {
    return await this.postsService.findAll();
  };

  @Get('trash')
  async findAllInTrash() {
    return await this.postsService.findAllInTrash();
  };

  @Get(':id')
  async findById(@Param('id') postId: string) {
    return await this.postsService.findById(postId);
  };

  @Patch(':id')
  async update(@Param('id') postId: string, @Body() dto: UpdatePostDto) {
    return await this.postsService.update(postId, dto);
  };

  @Delete(':id')
  async moveToTrash(@Param('id') postId: string) {
    return await this.postsService.moveToTrash(postId);
  };

};
