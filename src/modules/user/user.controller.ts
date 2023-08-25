import { Logger } from "../../types/common";
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { UserManagementService } from "./user.service";
import { CreateUser, LoginUser } from "../../types/user";
import { mapUserAuthenticatedResponse, mapUserCreatedData } from "./user.mapper";
import httpStatus from "http-status";
import { ContextualError } from "../../types/errors";
import { handleError } from "../../lib/errorHelper";

interface UserControllerInterface {
  create(req: Request, res: Response, next?: NextFunction): Promise<void | Response<any, Record<string, any>>>;
  list(req: Request, res: Response, next?: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}

export class UserController implements UserControllerInterface {
  constructor(
    private logger: Logger, 
    private service: UserManagementService
  ) {}

  /**
   * Create a user
   * @param req {Request}
   * @param res {Response}
   * @returns Promise<void | Response<any, Record<string, any>>>
   */
  async create(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> {
    const data: CreateUser = req.body;
    return this.service.create(data).then((response) => {
      const responseData = mapUserCreatedData(response);
      res.status(httpStatus.CREATED).send({
        message: 'user created successfully',
        data: responseData
      });
    }).catch((error: ContextualError) => {
      return handleError(res, error, this.logger);
    })
  }

  /**
   * Authenticate a user
   * @param req {Request}
   * @param res {Response}
   * @returns Promise<void | Response<any, Record<string, any>>>
   */
    async login(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> {
      const data: LoginUser = req.body;
      return this.service.login(data).then((response) => {
        const responseData = mapUserAuthenticatedResponse(response);
        res.status(httpStatus.CREATED).send({
          message: 'user authenticated successfully',
          data: responseData
        });
      }).catch((error: ContextualError) => {
        return handleError(res, error, this.logger);
      })
    }

  async list(): Promise<void | Response<any, Record<string, any>>> {
    return
  }
}