export interface CreatePost {
  content: string;
  postId: number
}

export interface PostDomain {
  id: string;
  title: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
