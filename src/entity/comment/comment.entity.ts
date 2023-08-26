import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
@Index('idx_post_comment_created_at', ['post', 'createdAt'])
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'postId' })
  post: Post;
}
