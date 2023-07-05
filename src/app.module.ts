import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { config } from 'dotenv';
import { PassportModule } from '@nestjs/passport';
config();

@Module({
  imports: [
    PassportModule,
    DatabaseModule, 
    PostsModule, 
    UsersModule, 
  ],
})
export class AppModule {};
