import { Request, Response, NextFunction } from 'express';
import { ErrorCodes } from '../types/errors';
import httpStatus from 'http-status';
import { logger } from '../lib/logger';
import jwt from 'jsonwebtoken';
import { Config } from './config';
import { AppRequest, Dictionary } from '../types/common';

// Get token from headers
const $getAuthToken = (req: Request) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token: string = req.headers.authorization.split(' ')[1];
    return token;
  } else {
    return null;
  }
};


export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('[ERROR STACK]:', error.stack);
  const statusCode = ErrorCodes.internalServerError.httpCode!;
  const message = ErrorCodes.internalServerError.message;
  const code = <number>httpStatus[statusCode];

  // Send the error response to the client
  res.status(code).json({
    error: message,
  });
};

export const authMiddleware = (req: AppRequest, res: Response, config: Config, next: NextFunction) => {
  const token = $getAuthToken(req);
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = <Dictionary>jwt.verify(token, config.jwt.secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Invalid token supplied', error, {
      stack: error.stack
    });
    res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid token.' });
  }
};
