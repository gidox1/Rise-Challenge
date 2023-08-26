import { User } from "../entity/user/user.entity";

export interface CreatePost {
  body: string;
  title: string;
  user?: User;
}

export interface PostDomain {
  id: string;
  title: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TopPostComments {
  comment_content: string;
  postId: string;
  createdAt: string;
}

export interface TopPostsResult {
  userId: number;
  userName: string;
  postId: number;
  comments: TopPostComments[];
}