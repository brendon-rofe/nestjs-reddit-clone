import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    service = { 
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should create a post', () => {
    const post = { id: 1, title: 'Test Post', content: 'This is a test post.' };
    (service.create(post) as jest.Mock).mockResolvedValue(post);
    expect(controller.create(post)).toBe(post);
  });
});
