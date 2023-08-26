import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Mock } from 'vitest';

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
    [key: string]: any;
  };
}

export interface AppRequest extends Request {
  user: { [key: string]: any };
}

type Mockable<T> = T extends (...args: infer P) => unknown
  ? Mock<P, ReturnType<T>>
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (args: any) => unknown
  ? Mock<Parameters<T>, ReturnType<T>>
  : T;

export type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

export type TypeMock<T> = T & {
  mocks: {
    [Property in keyof T]: Mockable<T[Property]>;
  };
};

export interface Context {
  body: { [key: string]: any };
  params: { [key: string]: any };
  query: { [key: string]: any };
}
