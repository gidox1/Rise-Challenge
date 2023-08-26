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
