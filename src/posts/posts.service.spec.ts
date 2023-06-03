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

  it('should create a post', async () => {
    const post = { id: 1, title: 'Test Post', content: 'This is a test post.' };
    expect(await service.create(post)).toEqual(post);
  });

  it('should get a post for a given ID', async () => {
    const post = { id: 1, title: 'Test Post', content: 'This is a test post.' };
    service.create(post);
    expect(await service.findById(1)).toEqual(post);
  });

  it('should get all posts', async () => {
    const post1 = { id: 1, title: 'Test Post 1', content: 'This is a test post.' };
    const post2 = { id: 2, title: 'Test Post 2', content: 'This is another test post.' };
    service.create(post1);
    service.create(post2);
    expect(await service.findAll()).toEqual([post1, post2]);
  });

  it('should update a post', async () => {
    const post = { id: 1, title: 'Test Post', content: 'This is a test post.' };
    service.create(post);
    const newPost = { id: 1, title: 'Updated Test Post', content: 'This is an updated test post.' };
    service.update(1, newPost);
    expect(await service.findById(1)).toEqual(newPost);
  });

  it('should remove a post', async () => {
    const post = { id: 1, title: 'Test Post', content: 'This is a test post.' };
    service.create(post);
    expect(await service.remove(1)).toBeUndefined();
  });
});
