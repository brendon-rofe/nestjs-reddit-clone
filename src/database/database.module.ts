import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { PostEntity } from 'src/posts/post.entity';
import { UsersEntity } from 'src/users/user.entity';
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
        PostEntity,
        UsersEntity,
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {};
