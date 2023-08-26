import {
  NextFunction,
  Request,
  Response,
  Application,
  response
} from 'express';
import { ServiceFactory } from '../../factory';
import { requestValidator } from '../../lib/requestValidator';
import { createPost, createUser, loginUser } from '../../routes/validation';
import { authMiddleware } from '../../app/middleware';
import { AppRequest } from '../../types/common';

export default async (app: Application) => {
  const routePrefix = 'user';
  const controller = await ServiceFactory.getUserController();
  const config = ServiceFactory.getConfig();

  // ping
  app.get(`/${routePrefix}/ping`, (req: Request, res: Response, next: NextFunction) => {
    return res.send({
      routePrefix,
      status: "healthy"
    })
  })

  // create user
  app.post(`/${routePrefix}`, 
    (req: Request, res: Response, next: NextFunction) => requestValidator(req.body, createUser, res, next),
    (req: Request, res: Response, next: NextFunction) => controller.create(req, res)
  );

  // authenticate user
  app.post(`/${routePrefix}/auth`,
    (req: Request, res: Response, next: NextFunction) => requestValidator(req.body, loginUser, res, next),
    (req: Request, res: Response, next: NextFunction) => controller.login(req, res)
  );

  // create post
  app.post(`/${routePrefix}/:id/post`,
    (req: Request, res: Response, next: NextFunction) => requestValidator(req.body, createPost, res, next),
    (req: AppRequest, res: Response, next: NextFunction) => authMiddleware(req, res, config, next),
    (req: Request, res: Response, next: NextFunction) => controller.createPost(req, res)
  )
}
