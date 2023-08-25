import { Config } from '../../app/config';
import { CommentDomain, CreateComment } from '../../types/comment';
import { Logger, PaginationFilters } from '../../types/common';
import { UserDomain } from '../../types/user';

interface UserService {
  create(request: CreateComment): Promise<UserDomain>
  list(query: PaginationFilters): Promise<UserDomain[]>
}

export class UserManagementService implements UserService {
  constructor(
    private logger: Logger,
    private config: Config,
  ) {}
  
  async create(request: CreateComment): Promise<UserDomain> {
    return;
  }

  async list(query: PaginationFilters): Promise<UserDomain[]> {
    return;
  }
}
