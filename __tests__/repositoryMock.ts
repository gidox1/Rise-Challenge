import { vi } from "vitest";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../src/entity/user/user.entity";
import { Post } from "../src/entity/post/post.entity";

export function getUserRepository(): Repository<User> {
  const functions: DeepPartial<Repository<User>> = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOneBy: vi.fn(),
    findOne: vi.fn(),
    findOneByOrFail: vi.fn()
  }
  return functions as Repository<User>;
}

export function getPostRepository(): Repository<Post> {
  const functions: DeepPartial<Repository<Post>> = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOneBy: vi.fn(),
    findOne: vi.fn(),
    findOneByOrFail: vi.fn()
  }
  return functions as Repository<Post>;
}

export function getCommentRepository(): Repository<Comment> {
  const functions: DeepPartial<Repository<Comment>> = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOneBy: vi.fn(),
    findOne: vi.fn(),
    findOneByOrFail: vi.fn()
  }
  return functions as Repository<Comment>;
}
