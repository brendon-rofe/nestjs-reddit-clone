import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {

  constructor(@InjectRepository(CommentEntity) commentRepo: Repository<CommentEntity>) {};

  async create() {};

  async getAllUserComments() {};

  async getById() {};

  async update() {};

  async delete() {};

};
