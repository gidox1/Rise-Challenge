export interface CreateComment {
  content: string;
  postId: number
}

export interface CommentDomain {
  id: string;
  content: string;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}
