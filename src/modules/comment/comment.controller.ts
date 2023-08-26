import { Controller, Logger } from '../../types/common';
import express, { Application, NextFunction, Request, Response, Router } from 'express';

interface CommentControllerInterface {
  create(req: Request, res: Response, next?: NextFunction): Promise<void | Response<any, Record<string, any>>>;
  list(req: Request, res: Response, next?: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}

export class CommentController extends Controller implements CommentControllerInterface {
  constructor(logger: Logger, service: any) {
    super(logger);
  }

  async create(): Promise<void | Response<any, Record<string, any>>> {
    return;
  }

  async list(): Promise<void | Response<any, Record<string, any>>> {
    return;
  }
}
