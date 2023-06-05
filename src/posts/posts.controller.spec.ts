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

  it('should get all posts', async () => {
    const post1 = { id: 1, title: 'Test Post 1', content: 'This is the first test post.' };
    const post2 = { id: 2, title: 'Test Post 2', content: 'This is the second test post.' };
    await controller.create(post1);
    await controller.create(post2);
    expect(await controller.findAll()).toEqual([post1, post2]);
  });

  it('should update a post', async () => {
    const post = { id: 1, title: 'Test Post', content: 'This is a test post.' };
    const updatedPost = { id: 1, title: 'Updated Test Post', content: 'This is an updated test post.' };
    await controller.create(post);
    expect(await controller.update(String(updatedPost.id), updatedPost)).toEqual(updatedPost)
  });

  it('should remove a post', async () => {
    const post = { id: 1, title: 'Test Post', content: 'This is a test post.' };
    await controller.create(post);
    expect(await controller.remove(String(post.id))).toEqual({ messaage: `Post with id${post.id} removed`});
  });

});
