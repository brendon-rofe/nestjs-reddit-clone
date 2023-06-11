import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockPostsService = {
    create: jest.fn().mockImplementation((dto) => dto),
    findById: jest.fn().mockImplementation()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should create a post', async () => {
    const post = { title: 'Test Post', content: 'This is a test post.' };
    expect(await controller.create(post)).toMatchObject(post);
  });

  it('should find a post by ID', async () => {
    const post = { title: 'Test Post', content: 'This is a test post.' };
    await controller.create(post);
    expect(await controller.findById(1)).toMatchObject(post);
  });
});
