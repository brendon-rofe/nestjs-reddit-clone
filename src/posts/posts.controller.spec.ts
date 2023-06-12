import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const post1 = { title: 'First Test Post', content: 'This is the first test post.' };
  const post2 = { title: 'Second Test Post', content: 'This is the second test post.' };

  const mockPostsService = {
    create: jest.fn().mockImplementation((dto) => dto),
    findById: jest.fn().mockImplementation((id) => {
      return { id, ...post1 };
    }),
    findAll: jest.fn().mockImplementation(() => [{ id: 1, ...post1 }, { id: 2, ...post2 }])
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
    expect(await controller.create(post1)).toMatchObject(post1);
  });

  it('should find a post by ID', async () => {
    await controller.create(post1);
    expect(await controller.findById('1')).toMatchObject({ id: 1, ...post1 });
  });

  it('should find all posts', async () => {
    await controller.create(post1);
    await controller.create(post2);
    expect(await controller.findAll()).toMatchObject([{ id: 1, ...post1 }, { id: 2, ...post2 }]);
  });
});
