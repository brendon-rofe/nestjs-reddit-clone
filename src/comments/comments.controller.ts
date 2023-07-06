import { Body, Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentsController {

  constructor(private commentService: CommentsService) {};

  @UseGuards(AuthGuard('jwt'))
  @Post(':postId')
  async create(
    @Param('postId') postId: string,
    @Request() req,
    @Body() dto: CreateCommentDto
  ) {
    return await this.commentService.create(parseInt(postId), req.user, dto);
  };

};
