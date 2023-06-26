import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    DatabaseModule, 
    PostsModule, 
    UsersModule, AuthModule
  ],
})
export class AppModule {};
