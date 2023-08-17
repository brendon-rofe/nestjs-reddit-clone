import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../comments/comment.entity';
import { PostEntity } from '../posts/post.entity';
import { UserEntity } from '../users/user.entity';
import { config } from 'dotenv';
config();

export let dbConfig = {};

if (process.env.NODE_ENV === 'test') {
  dbConfig = {
    type: 'sqlite',
    database: 'db.sqlite3',
    entities: [PostEntity, UserEntity, CommentEntity],
    synchronize: true,
    dropSchema: true,
  };
} else {
  dbConfig = {
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
    synchronize: false,
  };
}

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
  ],
})
export class DatabaseModule {};
