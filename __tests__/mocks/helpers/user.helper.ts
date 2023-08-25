import { vi } from "vitest";
import { UserHelperService } from "../../../src/modules/user/user.helper";
import { TypeMock } from "../../../src/types/common";

const mockFunctions = () => {
  return {
    hashPassword: vi.fn<Parameters<UserHelperService['hashPassword']>, ReturnType<UserHelperService['hashPassword']>>()
      .mockResolvedValue("$2a$10$SfveQ9s04SH06M8DqbcR5eAhP3yUrEn.bH9oQ0oeasveepzgcKoH6"),
    decryptPassword: vi.fn<Parameters<UserHelperService['decryptPassword']>, ReturnType<UserHelperService['decryptPassword']>>()
      .mockResolvedValue(true),
  }
}

export const userHelperServiceMock = (): TypeMock<UserHelperService> => {
  const functions = mockFunctions();
  return {
    ...functions,
    mocks: functions,
  };
};