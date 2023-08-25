import { Dictionary } from './common';

export interface ErrorCode {
  type: ErrorCodeType;
  message: string;
  httpCode?: string;
}

export enum ErrorCodeType {
  internalServerError = 'internalServerError',
  validationError = 'validationError',
  notFound = 'notFound',
  badRequest = 'badRequest',
}

export class ErrorCodes {
  public static internalServerError: ErrorCode = {
    type: ErrorCodeType.internalServerError,
    message: 'internal server error',
  };

  public static notFound: ErrorCode = {
    type: ErrorCodeType.notFound,
    message: 'not found',
    httpCode: 'NOT_FOUND',
  };

  public static schemaValidationFailed: ErrorCode = {
    type: ErrorCodeType.validationError,
    message: 'invalid request parameters',
  };

  public static badRequest: ErrorCode = {
    type: ErrorCodeType.badRequest,
    message: 'bad request',
    httpCode: 'BAD_REQUEST',
  };
}


export class ContextualError extends Error {
  public sqlMessage: any;
  public code: string;
  constructor(
    public message: string = ErrorCodes.internalServerError.message,
    public metrics?: Dictionary,
    public innerError?: Error,
    public errorCode: ErrorCode = ErrorCodes.internalServerError,
  ) {
    super(message);
  }
}
