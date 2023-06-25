import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, PostsModule, UsersModule],
})
export class AppModule {}
