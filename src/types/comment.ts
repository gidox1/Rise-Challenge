import { Post } from "../entity/post/post.entity";

export interface CreateComment {
  content: string;
  post: Post,
  postId?: number,
}

export interface PostCommentRequest {
  content: string;
  postId: number,
}

export interface CommentDomain {
  id: string;
  content: string;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}
