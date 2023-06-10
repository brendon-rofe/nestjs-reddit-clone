import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should create a new post', async () => {
    const newPost = { title: 'Test Post', content: 'This is a test post' };
    expect(await service.create(newPost)).toEqual({ message: 'New post created', post: newPost });
  });
});
