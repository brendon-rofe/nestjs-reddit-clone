import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
config();

@Module({
  imports: [
    JwtModule.register({
      secret: 'my_hard_coded_secret',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
    DatabaseModule, 
    PostsModule, 
    UsersModule, 
    AuthModule
  ],
})
export class AppModule {};
