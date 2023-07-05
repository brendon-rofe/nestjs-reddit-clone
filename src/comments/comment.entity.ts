import { PostEntity } from "src/posts/post.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('comments')
export class CommentEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => PostEntity, { onDelete: 'CASCADE' })
  post: PostEntity;

  @Column()
  author: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

};
