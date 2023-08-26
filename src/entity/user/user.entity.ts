import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  username: string;

  @Column('varchar', { nullable: false })
  email: string;

  @Column('varchar', { nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];
}
