import { Repository, SelectQueryBuilder } from 'typeorm';
import { Config } from '../../app/config';
import { Comment } from '../../entity/comment/comment.entity';
import { CommentDomain, CreateComment } from '../../types/comment';
import { Logger, PaginationFilters, Dictionary } from '../../types/common';
import { ContextualError } from '../../types/errors';

export interface CommentService {
  create(request: CreateComment): Promise<Comment>
  list(query: PaginationFilters): Promise<Comment[]>
  getCommentsByPosts(): Promise<SelectQueryBuilder<Comment>>
}

export class CommentManagementService implements CommentService {
  constructor(
    private logger: Logger,
    private config: Config,
    private repository: Repository<Comment>,
  ) {}
  
  async create(request: CreateComment): Promise<Comment> {
    this.logger.log('[CREATE-COMMENT]: started process of creating comment');
    const metrics: Dictionary<string | number> = {};
    const post = request.post;
    metrics.postId = post.id;
    
    try {
      const comment = this.repository.create(request);
      return await this.repository.save(comment);
    } catch(error) {
      const message = 'failed to create comment for post';
      this.logger.log(message, error, {
        metrics
      });
      throw new ContextualError(message, metrics, error);
    }
  }

  async list(query: PaginationFilters): Promise<Comment[]> {
    return;
  }


  async getCommentsByPosts(): Promise<SelectQueryBuilder<Comment>> {
    return this.repository.createQueryBuilder('c')
    .select('c.postId, MAX(c.createdAt)', 'max_createdAt')
    .groupBy('c.postId');
  }
}
