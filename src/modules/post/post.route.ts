import { NextFunction, Request, Response, Application } from 'express';
import { AppRequest } from '../../types/common';
import { ServiceFactory } from '../../factory';
import { requestValidator } from '../../lib/requestValidator';
import { authMiddleware } from '../../app/middleware';
import { createComment, createPost } from '../../routes/validation';

export default async (app: Application) => {
  const routePrefix = 'post';
  const controller = await ServiceFactory.getPostController();
  const config = ServiceFactory.getConfig();

  // ping
  app.get(`/${routePrefix}/ping`, (req: Request, res: Response, next: NextFunction) => {
    res.send({
      routePrefix,
      status: 'healthy',
    });
  });

  // create comment on a post
  app.post(
    `/${routePrefix}`,
    (req: Request, res: Response, next: NextFunction) => requestValidator(req.body, createPost, res, next),
    (req: AppRequest, res: Response, next: NextFunction) => authMiddleware(req, res, config, next),
    (req: AppRequest, res: Response, next: NextFunction) => controller.create(req, res),
  );

  // create comment on a post
  app.post(
    `/${routePrefix}/:id/comment`,
    (req: Request, res: Response, next: NextFunction) => requestValidator(req.body, createComment, res, next),
    (req: AppRequest, res: Response, next: NextFunction) => authMiddleware(req, res, config, next),
    (req: AppRequest, res: Response, next: NextFunction) => controller.comment(req, res),
  );

  // retrieve top posts
  app.get(
    `/${routePrefix}/top-posts`,
    (req: AppRequest, res: Response, next: NextFunction) => authMiddleware(req, res, config, next),
    (req: AppRequest, res: Response, next: NextFunction) => controller.topPosts(req, res),
  );
};
