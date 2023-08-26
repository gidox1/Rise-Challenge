import { User } from '../entity/user/user.entity';

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  username: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface MappedLoginResponse {
  user: MappedUserData;
  token: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface UserDomain {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MappedUserData {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
