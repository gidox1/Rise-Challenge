import { Controller, Logger } from "../../types/common";
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router
} from 'express';

interface PostControllerInterface {
  create(req: Request, res: Response, next?: NextFunction): Promise<void | Response<any, Record<string, any>>>;
  list(req: Request, res: Response, next?: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}

export class PostController extends Controller implements PostControllerInterface {
  constructor(logger: Logger, service: any) {
    super(logger)
  }

  async create(): Promise<void | Response<any, Record<string, any>>> {
    return
  }

  async list(): Promise<void | Response<any, Record<string, any>>> {
    return
  }
}