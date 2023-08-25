import {
  Response,
} from 'express';
import httpStatus from 'http-status';
import { ContextualError } from '../types/errors';
import { Logger } from '../types/common';

export const handleError = (res: Response,  error: ContextualError, logger: Logger): Response<any, Record<string, any>> => {
  if (error.message) {
    logger.error(error.message);
    const httpStat = (<number>httpStatus[error.errorCode?.httpCode]) ?? httpStatus.INTERNAL_SERVER_ERROR;
    return res.status(httpStat).send({
      error: true,
      message: error.message,
    });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({
        error: true,
        message: 'internal server error',
      });
  }
}