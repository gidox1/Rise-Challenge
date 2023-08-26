import { NextFunction, Request, Response, Application } from 'express';

export default async (app: Application) => {
  const routePrefix = 'comment';

  // ping
  app.get(`/${routePrefix}/ping`, (req: Request, res: Response, next: NextFunction) => {
    res.send({
      routePrefix,
      status: 'healthy',
    });
  });
};
