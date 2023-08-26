import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('text', { nullable: false })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments?: Comment[];
}