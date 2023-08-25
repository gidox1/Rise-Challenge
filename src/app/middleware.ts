import { Request, Response, NextFunction } from 'express';
import { ErrorCodes } from '../types/errors';
import httpStatus from 'http-status';
import { logger } from '../lib/logger';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('[ERROR STACK]:', error.stack);
  const statusCode = ErrorCodes.internalServerError.httpCode!;
  const message = ErrorCodes.internalServerError.message;
  const code = <number>httpStatus[statusCode];

  // Send the error response to the client
  res.status(code).json({
    error: message,
  });
};

export default errorMiddleware;
