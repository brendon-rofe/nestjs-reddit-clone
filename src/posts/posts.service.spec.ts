import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: [Post],
        synchronize: true,
      }), TypeOrmModule.forFeature([Post])],
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>('PostRepository');
  });

  it('shoud create a new post', async () => {
    const newPost = { id: 1, title: 'Test Post', content: 'This is a test post.' };
    expect(await service.create(newPost)).toEqual(newPost);
  });

});
