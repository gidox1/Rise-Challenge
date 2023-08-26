import { vi } from "vitest";
import { UserService } from "../../../src/modules/user/user.service";
import { TypeMock } from "../../../src/types/common";
import { User } from "../../../src/entity/user/user.entity";
export const sampleToken = 'eyJhbGddciOiJSUzI1NiIsImtpZCI6IjYzODBlZjEyZjk1ZjkxNmNhZDdhNGNlMzg4ZDJjMmMzYzIzMDJmZGUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoic2FudG9zNddDEiLCJiYW5vc1VzZXJJZCI6NywiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Jhbm9zLTEyYjE5IiwiYXVkIjoiYmFub3MtMTJiMTkiLCJhdXRoX3RpbWUiOjE2OTI3MDg3NjUsInVzZXJfaWQiOiJQRVl5bHZ1TGJHWnY1OXlST1d6djZRZm9RS3IyIiwic3ViIjoiUEVZeWx2dUxiR1p2NTl5Uk9XenY2UWZvUUtyMiIsImlhdCI6MTY5MjcwODc2NSwiZXhwIjoxNjkyNzEyMzY1LCJlbWFpbCI6InNhbnRvc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic2FudG9zQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn1d9.LkAdVYlgWRkDj5vNhtbmfYe960jMlaQVzNlFPQKrkia60HBjK2qp5a6a6QqZYWr4vNFO8mQZU2wledzDr7mxP9WagG61axOSUejKgvUAPdN4Y_qDW0xP81jhhA6Piy2X2Wyx6zBfc5NHnqMF3GxyPFbTa-cn9DZSiqDQ635O7cZF4W3sldwltZ1yNFoMlRQZfwEFihWqrUk7059B_93lVIJMMkm3uUuzExDL4HGPDVJdCNcT4hcmwk4e5hgYfoeQmaTwAtkqCa9-YcyamOmiSti_LrSJiDyrKcDz38EpurnKDf6-0UXqF-U6WVhEhIsV7EcIzd6HishEoW4BIuqE_9A';
export const userMock: User = {
  id: 1,
  name: 'Michael Jordan',
  email: 'michael@gmail.com',
  password: 'TestPassword',
  username: 'Mike',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockFunctions = () => {
  return {
    create: vi.fn<Parameters<UserService['create']>, ReturnType<UserService['create']>>(),
    login: vi.fn<Parameters<UserService['login']>, ReturnType<UserService['login']>>(),
    list: vi.fn<Parameters<UserService['list']>, ReturnType<UserService['list']>>(),
    createPost: vi.fn<Parameters<UserService['createPost']>, ReturnType<UserService['createPost']>>(),
  }
}

export const userServiceMock = (): TypeMock<UserService> => {
  const functions = mockFunctions();
  return {
    ...functions,
    mocks: functions,
  };
};