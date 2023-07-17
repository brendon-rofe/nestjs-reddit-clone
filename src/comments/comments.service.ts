import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { CreateCommentDto } from './dtos';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(CommentEntity) private commentRepo: Repository<CommentEntity>,
    private postsService: PostsService,
    private usersService: UsersService,
  ) {};

  async create(postId: number, user: UserEntity, dto: CreateCommentDto) {
    const foundPost = await this.postsService.findById(postId);
    const foundUser = await this.usersService.findByEmail(user.email);
    const newComment = new CommentEntity();
    newComment.content = dto.content;
    newComment.post = foundPost;
    newComment.author = foundUser.username;
    return await this.commentRepo.save(newComment);
  };

  async getAllUserComments(user: any) {
    const comments = await this.commentRepo.find({ where: { author: user } });
    return comments;
  };

  async getById() {};

  async update() {};

  async delete() {};

};
