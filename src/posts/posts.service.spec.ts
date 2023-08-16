import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [PostEntity],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([PostEntity]),
      ],
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
