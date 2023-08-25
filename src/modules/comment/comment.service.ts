import { Config } from '../../app/config';
import { CommentDomain, CreateComment } from '../../types/comment';
import { Logger, PaginationFilters } from '../../types/common';

interface CommentService {
  create(request: CreateComment): Promise<CommentDomain>
  list(query: PaginationFilters): Promise<CommentDomain[]>
}

export class CommentManagementService implements CommentService {
  constructor(
    private logger: Logger,
    private config: Config,
  ) {}
  
  async create(request: CreateComment): Promise<CommentDomain> {
    return;
  }

  async list(query: PaginationFilters): Promise<CommentDomain[]> {
    return;
  }
}
