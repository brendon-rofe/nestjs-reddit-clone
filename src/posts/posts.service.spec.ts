import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { UsersService } from '../users/users.service';
import { dbConfig } from '../database/database.module';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([PostEntity]),
      ],
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(PostEntity),
          useValue: {}, // mock repository methods if needed
        },
        {
          provide: UsersService,
          useValue: {}, // mock UsersService methods if needed
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests here
});
