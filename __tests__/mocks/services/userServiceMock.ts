import { vi } from "vitest";
import { UserService } from "../../../src/modules/user/user.service";
import { TypeMock } from "../../../src/types/common";
import { User } from "../../../src/entity/user/user.entity";

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
  }
}

export const userServiceMock = (): TypeMock<UserService> => {
  const functions = mockFunctions();
  return {
    ...functions,
    mocks: functions,
  };
};