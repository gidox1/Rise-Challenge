import { vi } from "vitest";
import { TypeMock } from "../../../src/types/common";
import { CommentService } from "../../../src/modules/comment/comment.service";
import { Comment } from "../../../src/entity/comment/comment.entity";
import { postMock } from "./postServiceMock";

export const commentMock: Comment = {
  id: 1,
  post: postMock,
  content: 'This is a sample post title!',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockFunctions = () => {
  return {
    create: vi.fn<Parameters<CommentService['create']>, ReturnType<CommentService['create']>>()
      .mockResolvedValue(commentMock),
    list: vi.fn<Parameters<CommentService['list']>, ReturnType<CommentService['list']>>()
      .mockResolvedValue([commentMock]),
  }
}

export const commentServiceMock = (): TypeMock<CommentService> => {
  const functions = mockFunctions();
  return {
    ...functions,
    mocks: functions,
  };
};
