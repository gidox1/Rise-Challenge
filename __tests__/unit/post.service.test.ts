import { expect, describe, vi, it, beforeAll} from 'vitest'
import { getPostService } from '../mockFactory'
import { userMock } from '../mocks/services/userServiceMock'
import { postMock } from '../mocks/services/postServiceMock'
import { getPostRepository } from '../repositoryMock'
import { commentMock, commentServiceMock } from '../mocks/services/commentServiceMock'

describe('Post Service', () => {
  describe('Create Post', () => {
    it('should create a post successfully',async () => {
      const repository = getPostRepository();
      repository.save = vi.fn().mockResolvedValue(postMock);
      const service = getPostService({
        repository
      });

      const resp = await service.create({
        body: postMock.body,
        title: postMock.title,
        user: postMock.user
      });

      expect(resp).toEqual(postMock);
    })

    it('should throw if there was an error while saving post',async () => {
      const repository = getPostRepository();
      repository.save = vi.fn().mockRejectedValue(new Error('internal server error'))
      const service = getPostService({
        repository
      });

      await expect(service.create({
        body: postMock.body,
        title: postMock.title,
        user: postMock.user
      })).rejects.toThrowError();
    })
  })

  describe('Create Comment', () => {
    it('should create a comment on a post successfully',async () => {
      const repository = getPostRepository();
      repository.save = vi.fn().mockResolvedValue(postMock);
      const commentService = commentServiceMock();
      commentService.create = vi.fn().mockResolvedValue(commentMock);
      
      const service = getPostService({
        repository,
        commentService
      });

      const resp = await service.comment({
        content: commentMock.content,
        postId: commentMock.post.id
      }, +userMock.id);

      expect(resp).toEqual(commentMock);
    })

    it('should fail create comment if post was not found', async() => {
      const repository = getPostRepository();
      repository.findOneByOrFail = vi.fn().mockRejectedValue(new Error('post not found'))
      const commentService = commentServiceMock();
      commentService.create = vi.fn().mockResolvedValue(commentMock);

      const service = getPostService({
        repository,
        commentService
      });
      
      await expect(service.comment({
        content: commentMock.content,
        postId: commentMock.post.id
      }, +userMock.id)).rejects.toThrowError(
        new Error('post not found')
      )
    });

    it('should fail if the comment service returns an error', async() => {
      const repository = getPostRepository();
      repository.findOneByOrFail = vi.fn().mockResolvedValue(postMock);
      const commentService = commentServiceMock();
      commentService.create = vi.fn().mockRejectedValue(new Error('internal server error'))

      const service = getPostService({
        repository,
        commentService
      });

      await expect(service.comment({
        content: commentMock.content,
        postId: commentMock.post.id
      }, +userMock.id)).rejects.toThrowError(
        new Error('internal server error')
      )
    });
  })
})