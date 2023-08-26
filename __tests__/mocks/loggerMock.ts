import { TypeMock } from "../../src/types/common";
import { Logger } from '../../src/types/common';
import { vi } from "vitest";

export const createMockLogger = (): TypeMock<Logger> => {
  const funcs = {
    error: vi.fn(),
    log: vi.fn(),
    warn: vi.fn(),
  };
  return {
    ...funcs,
    mocks: {
      ...funcs,
    },
  };
};
