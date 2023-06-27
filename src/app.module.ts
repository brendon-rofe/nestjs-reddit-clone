import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
config();

@Module({
  imports: [
    PassportModule,
    DatabaseModule, 
    PostsModule, 
    UsersModule, 
    AuthModule
  ],
})
export class AppModule {};
