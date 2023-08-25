import { Config } from '../../app/config';
import { CommentDomain, CreateComment } from '../../types/comment';
import { Logger, PaginationFilters } from '../../types/common';

interface PostService {
  create(request: CreateComment): Promise<CommentDomain>
  list(query: PaginationFilters): Promise<CommentDomain[]>
  top3(): Promise<Promise<(CommentDomain & { content: string })[]>>
}

export class PostManagementService implements PostService {
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

  async top3(): Promise<Promise<(CommentDomain & { content: string })[]>> {
    return;
  }
}
