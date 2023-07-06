import { CommentEntity } from "src/comments/comment.entity";
import { PostEntity } from "src/posts/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  hash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PostEntity, (post: PostEntity) => post.author)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.author)
  comments: CommentEntity[];

};