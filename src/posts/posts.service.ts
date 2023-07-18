import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from './dtos';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private postsRepo: Repository<PostEntity>,
    private usersService: UsersService,
  ) {};

  async create(dto: CreatePostDto, user: any) {
    try {
      const foundUser = await this.usersService.findByEmail(user.email);
      const newPost = new PostEntity();
      newPost.title = dto.title;
      newPost.content = dto.content;
      newPost.author = foundUser;
      newPost.authorUserame = foundUser.username;
      return this.postsRepo.save(newPost);
    } catch(error) {
      throw Error(error);
    };
  };

  async findById(postId: number) {
    const post = await this.postsRepo.findOne({ where: { id: postId }, relations: ['comments'] });
    if (!post || post.movedToTrash === true) {
      throw new HttpException(
        `Post with ID: ${postId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return post;
  };

  async findAllUserPosts(user: any) {
    const foundUser = await this.usersService.findByEmail(user.email);
    return await this.postsRepo.find({ where: { authorUserame: foundUser.username } })
  };

  async findAll() {
    const postsToDisplay: PostEntity[] = [];
    const posts = await this.postsRepo.find();
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].movedToTrash !== true) {
        postsToDisplay.push(posts[i]);
      }
    }
    return postsToDisplay;
  };

  async findAllInUsersTrash(user) {
    const foundUser = await this.usersService.findByEmail(user.email);
    return await this.postsRepo.find({ where: { movedToTrash: true } });
  };

  async update(postId: number, dto: UpdatePostDto) {
    await this.findById(postId);
    await this.postsRepo.update(postId, dto);
    return { message: 'Post updated', post: await this.findById(postId) };
  }

  async moveToTrash(postId: number) {
    const post = await this.findById(postId);
    post.movedToTrash = true;
    await this.postsRepo.save(post);
    return { message: `Post with ID: ${postId} moved to trash` };
  };
  
};
