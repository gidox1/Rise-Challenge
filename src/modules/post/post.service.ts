import { Repository } from 'typeorm';
import { Config } from '../../app/config';
import { Post } from '../../entity/post/post.entity';
import { Dictionary, Logger, PaginationFilters } from '../../types/common';
import { CreatePost } from '../../types/post';
import { ContextualError, ErrorCodes } from '../../types/errors';
import { PostCommentRequest } from '../../types/comment';
import { Comment } from '../../entity/comment/comment.entity';
import { CommentService } from '../comment/comment.service';

export interface PostService {
  create(request: CreatePost): Promise<Post>
  comment(request: PostCommentRequest, userId: number): Promise<Comment>
  list(query: PaginationFilters): Promise<Post[]>
  top3(): Promise<(Post & Comment)[]>
}

export class PostManagementService implements PostService {
  constructor(
    private logger: Logger,
    private config: Config,
    private repository: Repository<Post>,
    private commentService: CommentService
  ) {}
  
  async create(request: CreatePost): Promise<Post> {
    this.logger.log('[CREATE]: started process of creating post', request);
    const metrics: Dictionary<string | number> = {};
    metrics.userId = request.user.id;
    metrics.title = request.title;

    try {
      const post = this.repository.create(request);
      return await this.repository.save(post);
    } catch(error) {
      const message = 'failed to create post for user';
      this.logger.log(message, error, {
        metrics
      });
      throw new ContextualError(message, metrics, error);
    }
  }

  async comment(request: PostCommentRequest, userId: number): Promise<Comment> {
    this.logger.log('[COMMENT-CREATE]: started process of creating post');
    const metrics: Dictionary<string | number> = {};
    metrics.userId = userId;
    metrics.postId = request.postId;

    try {
      const post = await this.repository.findOneByOrFail({
        id: request.postId
      });
      return await this.commentService.create({
        content: request.content,
        post
      });
    } catch(error) {
      const message = error.message ?? 'failed to create comment on post';
      this.logger.error(
        error.message ?? message, 
        error, 
        metrics
      );
      if(error.name === 'EntityNotFoundError') {
        throw new ContextualError(
          `post with id ${request.postId} not found`, 
          metrics, 
          undefined, 
          ErrorCodes.notFound
        );
      }
      throw new ContextualError(message, metrics, error);
    }
  }


  async list(query: PaginationFilters): Promise<Post[]> {
    return;
  }

  async top3(): Promise<(Post & Comment)[]> {
    return;
  }
}
