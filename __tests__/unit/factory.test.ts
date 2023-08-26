import { expect, describe, vi, it, beforeAll} from 'vitest'
import { ServiceFactory } from '../../src/factory'
import { UserManagementService } from '../../src/modules/user/user.service';
import { UserController } from '../../src/modules/user/user.controller';
import { PostManagementService } from '../../src/modules/post/post.service';
import { PostController } from '../../src/modules/post/post.controller';
import { CommentManagementService } from '../../src/modules/comment/comment.service';

describe('Service Factory', () => {
  it('Should create a User Management service', async () => {
    const userService = await ServiceFactory.getUserService();
    expect(userService instanceof UserManagementService).toBeTruthy();
  })

  it('Should create a User Management Controller', async () => {
    const userService = await ServiceFactory.getUserController();
    expect(userService instanceof UserController).toBeTruthy();
  })

  it('Should create a Post Management Service', async () => {
    const postService = await ServiceFactory.getPostService();
    expect(postService instanceof PostManagementService).toBeTruthy();
  })

  it('Should create a Post Controller', async () => {
    const postController = await ServiceFactory.getPostController();
    expect(postController instanceof PostController).toBeTruthy();
  })

  it('Should create a Comment Management Service', async () => {
    const commentService = await ServiceFactory.getCommentService();
    expect(commentService instanceof CommentManagementService).toBeTruthy();
  })
})
