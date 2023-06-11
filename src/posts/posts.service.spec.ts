import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

describe('PostsService', () => {
  let service: PostsService;
  let repo: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: [Post],
        synchronize: true
      }), TypeOrmModule.forFeature([Post])],
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repo = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should create a new post', async () => {
    const post = { title: 'Test Post', content: 'This is a test post' };
    const createdPost = await service.create(post);
    expect(createdPost).toMatchObject(post);
  });

  it('should fetch a post by ID', async () => {
    const post = { title: 'Test Post', content: 'This is a test post' };
    await service.create(post);
    expect(await service.findById(1)).toMatchObject(post);
  });

  it('should fetch all posts', async () => {
    const post1 = { title: 'First Test Post', content: 'This is the first test post' };
    const post2 = { title: 'Second Test Post', content: 'This is the second test post' };
    await service.create(post1);
    await service.create(post2);
    expect(await service.findAll()).toMatchObject([
      { title: 'First Test Post', content: 'This is the first test post' },
      { title: 'Second Test Post', content: 'This is the second test post' }
    ]);
  });

  it('should update a post', async () => {
    const post = { title: 'Test Post', content: 'This is a test post' };
    const updatedPost = { title: 'Updated Test Post', content: 'This is an updated test post' };
    await service.create(post);
    expect(await service.update(1, updatedPost)).toMatchObject(updatedPost);
  });

  it('should delete a post', async () => {
    const post = { title: 'Test Post', content: 'This is a test post' };
    await service.create(post);
    expect(await service.delete(1)).toEqual({ message: 'Post successfully deleted' });
  });
});
