import { expect, describe, vi, it, beforeAll} from 'vitest'
import { userMock } from '../mocks/services/userServiceMock'
import { getUserService } from '../mockFactory'
import { getUserRepository } from '../repositoryMock'
import jwt from 'jsonwebtoken';
import { userHelperServiceMock } from '../mocks/helpers/user.helper';
import { ContextualError, ErrorCodes } from '../../src/types/errors';

describe('User Service', () => {
  const sampleToken = 'eyJhbGddciOiJSUzI1NiIsImtpZCI6IjYzODBlZjEyZjk1ZjkxNmNhZDdhNGNlMzg4ZDJjMmMzYzIzMDJmZGUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoic2FudG9zNddDEiLCJiYW5vc1VzZXJJZCI6NywiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Jhbm9zLTEyYjE5IiwiYXVkIjoiYmFub3MtMTJiMTkiLCJhdXRoX3RpbWUiOjE2OTI3MDg3NjUsInVzZXJfaWQiOiJQRVl5bHZ1TGJHWnY1OXlST1d6djZRZm9RS3IyIiwic3ViIjoiUEVZeWx2dUxiR1p2NTl5Uk9XenY2UWZvUUtyMiIsImlhdCI6MTY5MjcwODc2NSwiZXhwIjoxNjkyNzEyMzY1LCJlbWFpbCI6InNhbnRvc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic2FudG9zQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn1d9.LkAdVYlgWRkDj5vNhtbmfYe960jMlaQVzNlFPQKrkia60HBjK2qp5a6a6QqZYWr4vNFO8mQZU2wledzDr7mxP9WagG61axOSUejKgvUAPdN4Y_qDW0xP81jhhA6Piy2X2Wyx6zBfc5NHnqMF3GxyPFbTa-cn9DZSiqDQ635O7cZF4W3sldwltZ1yNFoMlRQZfwEFihWqrUk7059B_93lVIJMMkm3uUuzExDL4HGPDVJdCNcT4hcmwk4e5hgYfoeQmaTwAtkqCa9-YcyamOmiSti_LrSJiDyrKcDz38EpurnKDf6-0UXqF-U6WVhEhIsV7EcIzd6HishEoW4BIuqE_9A';
  beforeAll(async () => {  
    vi.mock('jsonwebtoken');
  });

  describe('Create User', () => {
    it('should successfuly create a user', async () => {
      const repository = getUserRepository();
      repository.findOneBy = vi.fn().mockResolvedValue(undefined);
      repository.save = vi.fn().mockResolvedValue(userMock);
      const service = getUserService({
        repository,
      });
  
      const resp = await service.create({
        name: userMock.name,
        email: userMock.email,
        username: userMock.username,
        password: userMock.password
      });
      expect(resp).toEqual(userMock)
      expect(repository.create).toHaveBeenCalledOnce();
      expect(repository.save).toHaveBeenCalledOnce();
    });

    it('should fail to create a user if user already exists', async () => {
      const repository = getUserRepository();
      repository.findOneBy = vi.fn().mockResolvedValue(userMock);

      const service = getUserService({
        repository,
      });
  
      await expect(service.create({
        name: userMock.name,
        email: userMock.email,
        username: userMock.username,
        password: userMock.password
      })).rejects.toThrow();
      expect(repository.create).not.toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('Login User', () => {
    it('should successfully login a user', async() => {
      const repository = getUserRepository();
      repository.findOneBy = vi.fn().mockResolvedValue(userMock);
      jwt.sign = vi.fn().mockResolvedValue(sampleToken);

      const service = getUserService({
        repository,
      });

      const resp = await service.login({
        email: userMock.email,
        password: userMock.password,
      });

      expect(resp.user).toBeDefined();
      expect(resp.user).toEqual(userMock);
      expect(resp.token).toEqual(sampleToken)
    });

    it('should fail to login if wrong password is supplied', async() => {
      const repository = getUserRepository();
      repository.findOneBy = vi.fn().mockResolvedValue(userMock);
      jwt.sign = vi.fn().mockResolvedValue(sampleToken);
      const helperService = userHelperServiceMock();
      helperService.decryptPassword = vi.fn().mockResolvedValue(false);
      
      const service = getUserService({
        repository,
        helper: helperService
      });

      await expect(service.login({
        email: userMock.email,
        password: userMock.password,
      })).rejects.toThrow(
        new ContextualError(
          'invalid credentials', 
          expect.any(Object), 
          undefined, 
          ErrorCodes.unauthorized
        )
      );
    });

    it('should fail if user is not found', async() => {
      const repository = getUserRepository();
      repository.findOneBy = vi.fn().mockResolvedValue(undefined);
      
      const service = getUserService({
        repository,
      });

      await expect(service.login({
        email: userMock.email,
        password: userMock.password,
      })).rejects.toThrow(
        new ContextualError(
          'user not found', 
          expect.any(Object), 
          undefined, 
          ErrorCodes.notFound
        ),
      );
    });
  })
})
