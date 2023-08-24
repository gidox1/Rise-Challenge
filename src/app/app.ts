import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router
} from 'express';

import { createServer } from 'http';
import { logger } from '../lib/logger';
import { UncaughtExceptionOrigin } from '../types/common'

const app: Application = express();

try {
  app.use(express.json());

  /**
   * Default to health for all unregistered routes
   */
  app.all('*', function(req: Request, res: Response, next: NextFunction){
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
