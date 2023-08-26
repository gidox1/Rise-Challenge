import { Repository } from "typeorm";
import { Config } from "../src/app/config";
import { UserManagementService, UserService } from "../src/modules/user/user.service";
import { Logger } from "../src/types/common";
import { User } from "../src/entity/user/user.entity";
import { logger } from "../src/lib/logger";
import { createMockConfig } from "./mocks/mockConfig";
import { getCommentRepository, getPostRepository, getUserRepository } from "./repositoryMock";
import { userHelperServiceMock } from "./mocks/helpers/user.helper";
import { UserHelperService } from "../src/modules/user/user.helper";
import { PostManagementService, PostService } from "../src/modules/post/post.service";
import { CommentManagementService, CommentService } from "../src/modules/comment/comment.service";
import { commentServiceMock } from "./mocks/services/commentServiceMock";
import { Post } from "../src/entity/post/post.entity";

export function getUserService(options?: {
  logger?: Logger;
  config?: Config;
  repository?: Repository<User>;
  helper?: UserHelperService;
  postService?: PostService;
  commentService?: CommentManagementService;
}): UserService {
  return new UserManagementService(
    options?.logger ?? logger,
    options?.config ?? createMockConfig(),
    options?.repository ?? getUserRepository(),
    options?.helper ?? userHelperServiceMock(),
    options?.postService ?? ({} as PostService),
  );
}

export function getPostService(options?: {
  logger?: Logger;
  config?: Config;
  repository?: Repository<Post>;
  commentService?: CommentService;
}): PostService {
  return new PostManagementService(
    options?.logger ?? logger,
    options?.config ?? createMockConfig(),
    options?.repository ?? getPostRepository(),
    options?.commentService ?? commentServiceMock()
  )
}
