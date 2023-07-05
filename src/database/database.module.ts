import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comments/comment.entity';
import { PostEntity } from 'src/posts/post.entity';
import { UserEntity } from 'src/users/user.entity';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        UserEntity,
        PostEntity,
        CommentEntity,
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {};
