import { AppRequest, Controller, Logger } from "../../types/common";
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router
} from 'express';
import { PostService } from "./post.service";
import { handleError } from "../../lib/errorHelper";
import { ContextualError } from "../../types/errors";
import httpStatus from "http-status";

interface PostControllerInterface {
  create(req: Request, res: Response, next?: NextFunction): Promise<void | Response<any, Record<string, any>>>;
  comment(req: Request, res: Response, next?: NextFunction): Promise<void | Response<any, Record<string, any>>>;
  list(req: Request, res: Response, next?: NextFunction): Promise<void | Response<any, Record<string, any>>>;
  topPosts(req: Request, res: Response, next?: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}

export class PostController implements PostControllerInterface {
  constructor(private logger: Logger, private service: PostService) {}

  async create(req: AppRequest, res: Response): Promise<void | Response<any, Record<string, any>>> {
    const { body, title } = req.body;
    return this.service.create({
      body,
      title
    }).then((response) => {
      res.status(httpStatus.CREATED).send({
        message: 'post created successfully',
        data: response
      });
    }).catch((error: ContextualError) => {
      return handleError(res, error, this.logger);
    })
  }

  async comment(req: AppRequest, res: Response): Promise<void | Response<any, Record<string, any>>> {
    const { content } = req.body;
    const postId = +req.params.id;
    const user = req.user;

    return this.service.comment({
      content,
      postId
    }, user.id).then((response) => {
      res.status(httpStatus.CREATED).send({
        message: 'comment added to post successfully',
        data: response
      });
    }).catch((error: ContextualError) => {
      return handleError(res, error, this.logger);
    })
  }

  async topPosts(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> {
    return this.service.topPosts().then((response) => {
      res.status(httpStatus.CREATED).send({
        message: 'top posts retrieved successfully',
        data: response
      });
    }).catch((error: ContextualError) => {
      return handleError(res, error, this.logger);
    })
  }

  async list(): Promise<void | Response<any, Record<string, any>>> {
    return
  }
}