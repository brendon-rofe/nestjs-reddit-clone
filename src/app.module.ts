import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { config } from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
config();

@Module({
  imports: [
    PassportModule,
    DatabaseModule, 
    PostsModule, 
    UsersModule, AuthModule, CommentsModule, 
  ],
})
export class AppModule {};
