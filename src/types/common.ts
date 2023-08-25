export type Logger = {
  log: Function;
  error: Function;
  warn: Function;
};

export type UncaughtExceptionOrigin = 'uncaughtException' | 'unhandledRejection';

export interface Dictionary<T = any> {
  [key: string]: T;
}

export abstract class Controller {
  constructor(private logger: Logger) {
    this.logger = logger;
  }
}

export interface PaginationFilters {
  page: number;
  pageSize: number;
  orderBy: string;
  sortOrder: 'DESC' | 'ASC';
  filters?: {
    [key: string]: any
  }
}