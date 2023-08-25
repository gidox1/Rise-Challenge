export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface UserDomain {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
