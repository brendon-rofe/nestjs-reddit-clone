import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController (e2e)', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should create and get a post', async () => {
    const post = { id: 1, title: 'Test Post', content: 'This is a test post.' };
    expect(await controller.create(post)).toEqual(post);
    expect(await controller.findById(String(post.id))).toEqual(post);
  });
});
