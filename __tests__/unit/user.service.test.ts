import { expect, describe, vi, it, beforeAll} from 'vitest'
import { sampleToken, userMock } from '../mocks/services/userServiceMock'
import { getUserService } from '../mockFactory'
import { getUserRepository } from '../repositoryMock'
import jwt from 'jsonwebtoken';
import { userHelperServiceMock } from '../mocks/helpers/user.helper';
import { ContextualError, ErrorCodes } from '../../src/types/errors';
import { postMock, postServiceMock } from '../mocks/services/postServiceMock';

describe('User Service', () => {

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
  
  describe('Create User Post', () => {
    it('should successfully create a post for user', async() => {
      const repository = getUserRepository();
      repository.findOneBy = vi.fn().mockResolvedValue(userMock);
      jwt.sign = vi.fn().mockResolvedValue(sampleToken);
      const postService = postServiceMock();
      postService.create = vi.fn().mockResolvedValue(postMock);

      const service = getUserService({
        repository,
        postService
      });
      
      const resp = await service.createPost({
        body: postMock.body,
        title: postMock.title
      }, postMock.user.id);

      expect(resp).toEqual(postMock);
    });

    it('should fail create a post if user was not found', async() => {
      const repository = getUserRepository();
      repository.findOneByOrFail = vi.fn().mockRejectedValue(new Error('not found'));
      jwt.sign = vi.fn().mockResolvedValue(sampleToken);
      const postService = postServiceMock();

      const service = getUserService({
        repository,
        postService
      });

      await expect(service.createPost({
        body: postMock.body,
        title: postMock.title
      }, postMock.user.id)).rejects.toThrowError(
        new Error('not found')
      )
    });

    it('should fail if the post service returns an error', async() => {
      const repository = getUserRepository();
      repository.findOneByOrFail = vi.fn().mockResolvedValue(userMock);
      jwt.sign = vi.fn().mockResolvedValue(sampleToken);
      const postService = postServiceMock();
      postService.create = vi.fn().mockRejectedValue(new Error('post failed'))
      const service = getUserService({
        repository,
        postService
      });

      await expect(service.createPost({
        body: postMock.body,
        title: postMock.title
      }, postMock.user.id)).rejects.toThrowError(
        new Error('post failed')
      );
    });
  })
})
