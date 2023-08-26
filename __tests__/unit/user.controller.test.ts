import { UserController } from "../../src/modules/user/user.controller";
import { expect, describe, vi, it, beforeAll} from 'vitest'
import { getUserService } from "../mockFactory";
import { createMockLogger } from "../mocks/loggerMock";
import { createMockConfig } from "../mocks/mockConfig";
import { Request, Response } from 'express';
import { number } from "joi";
import { userMock } from "../mocks/services/userServiceMock";
import { Dictionary } from "../../src/types/common";

describe('User Controller', () => {
  it('should successfully create a user', async() => {
    const userService = getUserService();
    userService.create = vi.fn().mockResolvedValue(userMock);
    const logger = createMockLogger();
    const controller = new UserController(logger, userService)
    const mockReq = {
      body: {
        name: 'Ever Banega',
        email: "ever@gmail.com",
        password: "Testing",
        username: "Ever"
      },
      params: {}
    } as Request;

    const mockRes = {
      status: () => {
        return {
          send: (data: Dictionary) => {
            return data
          },
        }
      },
      send: (data: Dictionary) => {
        return data
      },
      json: () => {}
    } as unknown as Response;

    const resp = await controller.create(mockReq, mockRes);
    expect(resp).toEqual({
      message: 'user created successfully',
      data: {
        id: 1,
        name: 'Michael Jordan',
        email: 'michael@gmail.com',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      }
    })
  })
})