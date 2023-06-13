import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    DatabaseModule,
    PostsModule,
    DatabaseModule,
    UsersModule,
    AuthenticationModule
  ],
})
export class AppModule {}
