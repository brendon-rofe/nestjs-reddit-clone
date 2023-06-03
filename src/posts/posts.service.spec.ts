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

  it('should create a post', () => {
    const post = { id: 1, title: 'Test Post', content: 'This is a test post.' };
    expect(service.create(post)).toEqual(post);
  });
});
