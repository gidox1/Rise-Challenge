import { vi } from "vitest";
import { TypeMock } from "../../../src/types/common";
import { Post } from "../../../src/entity/post/post.entity";
import { userMock } from "./userServiceMock";
import { PostService } from "../../../src/modules/post/post.service";

export const postMock: Post = {
  id: 1,
  user: userMock,
  title: 'Post Title',
  body: 'This is a sample post title!',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockFunctions = () => {
  return {
    create: vi.fn<Parameters<PostService['create']>, ReturnType<PostService['create']>>(),
    comment: vi.fn<Parameters<PostService['comment']>, ReturnType<PostService['comment']>>(),
    list: vi.fn<Parameters<PostService['list']>, ReturnType<PostService['list']>>(),
    top3: vi.fn<Parameters<PostService['top3']>, ReturnType<PostService['top3']>>(),
  }
}

export const postServiceMock = (): TypeMock<PostService> => {
  const functions = mockFunctions();
  return {
    ...functions,
    mocks: functions,
  };
};
