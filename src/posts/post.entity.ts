import { CommentEntity } from "../comments/comment.entity";
import { UserEntity } from "../users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('posts')
export class PostEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  title: string;

  @Column('text', { nullable: true })
  content: string;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ default: false, nullable: true })
  movedToTrash: boolean;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  author: UserEntity;

  @Column({ nullable: true })
  authorUserame: string;

};