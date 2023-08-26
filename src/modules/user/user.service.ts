import { Repository } from 'typeorm';
import { Config } from '../../app/config';
import { Logger, PaginationFilters, Dictionary } from '../../types/common';
import { CreateUser, LoginResponse, LoginUser, UserDomain } from '../../types/user';
import { UserHelperService, decryptPassword, hashPassword } from './user.helper';
import { User } from '../../entity/user/user.entity';
import { ContextualError, ErrorCodes } from '../../types/errors';
import jwt from 'jsonwebtoken';
import { CreatePost} from '../../types/post';
import { Post } from '../../entity/post/post.entity';
import { PostService } from '../post/post.service';
import { CommentManagementService } from '../comment/comment.service';

export interface UserService {
  create(request: CreateUser): Promise<User>
  list(query: PaginationFilters): Promise<User[]>
  createPost(data: CreatePost, userId: number): Promise<Post>
  login(data: LoginUser): Promise<LoginResponse>
}

export class UserManagementService implements UserService {
  constructor(
    private logger: Logger,
    private config: Config,
    private repository: Repository<User>,
    private helpers: UserHelperService,
    private postService: PostService,
  ) {}
  
  async create(request: CreateUser): Promise<User> {
    this.logger.log('[CREATE]: started process of user creation');
    const metrics: Dictionary<string | number> = {};
    metrics.email = request.email;
    metrics.name = request.name;
    metrics.name = request.username;
    metrics.userExists = 'false';

    try {
      const existingUser = await this.repository.findOneBy({ email: request.email });
      if (existingUser) {
        metrics.userExists = 'true';
        throw new ContextualError('user already exist', metrics, undefined, ErrorCodes.integrityError);
      }

      request.password = await this.helpers.hashPassword(request.password);
      const user = this.repository.create(request);
      return await this.repository.save(user);
    } catch(error) {
      const message = 'failed while creating user';
      this.logger.error(message, error);
      if(error instanceof ContextualError) {
        throw error;
      }
      throw new ContextualError(message, metrics, error);
    }
  }

  async login(data: LoginUser): Promise<LoginResponse> {
    this.logger.log('[CREATE]: started process of user authentication');
    const metrics: Dictionary<string | number> = {};
    metrics.email = data.email;
    
    try {
      const existingUser = await this.repository.findOneBy({ email: data.email });
      if (!existingUser) {
        throw new ContextualError('user not found', metrics, undefined, ErrorCodes.notFound);
      }

      const passwordCorrectness = await this.helpers.decryptPassword(data.password, existingUser.password);
      if(!passwordCorrectness) {
        throw new ContextualError('invalid credentials', metrics, undefined, ErrorCodes.unauthorized);
      }

      const token = await jwt.sign({ id: existingUser.id }, this.config.jwt.secretKey, { expiresIn: this.config.jwt.expiry });
      this.logger.log('successfully authenticated user', metrics);
      return {
        user: existingUser,
        token
      }
    } catch(error) {
      const message = 'failed to authenticate user';
      this.logger.error(message, error, {
        metrics
      });
      if(error instanceof ContextualError) {
        throw error;
      }
      throw new ContextualError(message, metrics, error);
    }
  }

  async createPost(data: CreatePost, userId: number): Promise<Post> {
    this.logger.log('[CREATE-POST]: started process of creating post');
    const metrics: Dictionary<string | number> = {};
    metrics.userId = userId;
    metrics.title = data.title;

    try {
      const user = await this.repository.findOneByOrFail({
        id: +userId
      })
      return await this.postService.create({
        ...data,
        user,
      });
    } catch(error) {
      const message = error.message ?? 'failed to create post for user: ';
      this.logger.error(message, error, {
        metrics
      });
      if(error.name === 'EntityNotFoundError') {
        throw new ContextualError(
          `user with id ${userId} was not found`, 
          metrics, 
          undefined, 
          ErrorCodes.notFound
        );
      }
      throw error;
    }
  }

  async list(query: PaginationFilters): Promise<User[]> {
    return;
  }
}
