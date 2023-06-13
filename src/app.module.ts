import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PostsModule,
    DatabaseModule
  ],
})
export class AppModule {}
