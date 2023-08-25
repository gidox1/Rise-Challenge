import { NextFunction, Response } from 'express';
import { logger } from './logger';
import { ErrorCodes } from '../types/errors';
import { Dictionary } from '../types/common';

export type SchemaCallbackFunction = {
  validate: (data: Dictionary) => {
    value: Dictionary;
    error?: Dictionary;
  };
};

export const requestValidator = (
  dataObject: Dictionary,
  schema: SchemaCallbackFunction,
  res: Response,
  next: NextFunction,
): Response | void => {
  const resolver = schema.validate(dataObject);
  if (resolver.error instanceof Error) {
    logger.error('Validation erorr: ', resolver.error);
    return res.status(422).send({
      error: true,
      code: ErrorCodes.schemaValidationFailed,
      details: resolver.error.message
    });
  }
  next();
};
