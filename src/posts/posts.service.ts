import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from './dtos';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private postsRepo: Repository<PostEntity>,
  ) {}

  async create(dto: CreatePostDto) {
    try {
      const newPost = await this.postsRepo.create(dto);
      await this.postsRepo.save(newPost);
      return { message: 'New post created', post: newPost };
    } catch (error) {}
  }

  async findById(postId: string) {
    const post = await this.postsRepo.findOneBy({ id: postId });
    if (!post || post.movedToTrash === true) {
      throw new HttpException(
        `Post with ID: ${postId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return post;
  }

  async findAll() {
    const postsToDisplay: PostEntity[] = [];
    const posts = await this.postsRepo.find();
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].movedToTrash !== true) {
        postsToDisplay.push(posts[i]);
      }
    }
    return postsToDisplay;
  }

  async findAllInTrash() {
    return await this.postsRepo.find({ where: { movedToTrash: true } });
  }

  async update(postId: string, dto: UpdatePostDto) {
    await this.findById(postId);
    await this.postsRepo.update(postId, dto);
    return { message: 'Post updated', post: await this.findById(postId) };
  }

  async moveToTrash(postId: string) {
    const post = await this.findById(postId);
    post.movedToTrash = true;
    await this.postsRepo.save(post);
    return { message: `Post with ID: ${postId} moved to trash` };
  }
}
