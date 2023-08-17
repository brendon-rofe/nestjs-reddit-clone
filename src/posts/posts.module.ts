import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { UserEntity } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity]), UsersModule],
  providers: [PostsService, UsersService],
  controllers: [PostsController],
  exports: [PostsService]
})
export class PostsModule {}
