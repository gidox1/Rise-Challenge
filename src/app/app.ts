import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router
} from 'express';

import { createServer } from 'http';
import { logger } from '../lib/logger';
import { UncaughtExceptionOrigin } from '../types/common';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import routes from '../routes';
import errorMiddleware from './middleware';
import { ServiceFactory } from '../factory';
import { config } from './config';

const app: Application = express();

try {
  app.use(express.json());
  app.use(helmet());
  app.use(cors({
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  }));
  app.use(compression());

  app.use(bodyParser.urlencoded({
    extended: false,
    limit: '100mb',
  }));

  app.use(bodyParser.json({
    limit: '100mb',
  }));

  ServiceFactory.init(config, logger);

  // load routes
  routes(app);

  // handle unexpected errors
  app.use(errorMiddleware);

  /**
   * Default to health for all unregistered routes
   */
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    return res.send({
      status: 'Rise service is up and running',
      code: 200
    });
  });

  process.on('unhandledRejection', (error: Error) => 
    logger.error('Unhandled Rejection:', error, error.stack),
  );

  process.on('uncaughtException', (error: Error, origin: UncaughtExceptionOrigin) =>
    logger.error('Uncaught Exception:', error, {
      stack: error.stack,
      origin,
    })
  );
} catch(error) {
  // Exit gracefully in the event of an error
  logger.error(error.message, error);
  process.exit(1);
}

export const server = createServer(app);
