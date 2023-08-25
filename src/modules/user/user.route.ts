import {
  NextFunction,
  Request,
  Response,
  Application
} from 'express';
import { ServiceFactory } from '../../factory';
import { requestValidator } from '../../lib/requestValidator';
import { createUser, loginUser } from '../../routes/validation';

export default async (app: Application) => {
  const routePrefix = 'user';
  const controller = await ServiceFactory.getUserController();

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
  )

  // authenticate user
  app.post(`/${routePrefix}/auth`,
    (req: Request, res: Response, next: NextFunction) => requestValidator(req.body, loginUser, res, next),
    (req: Request, res: Response, next: NextFunction) => controller.login(req, res)
  )
}
