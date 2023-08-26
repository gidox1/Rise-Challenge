import { Request, Response, NextFunction } from 'express';
import { AppRequest } from '../types/common';
import httpStatus from 'http-status';

/**
 * This decorator enforces that the requesting user is the one
 * making the specific action.
 * It prevents impersonation.
 * @returns {MethodDecorator}
 */
export function UserSpecificAction(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (req: AppRequest, res: Response, next: NextFunction) {
    const userIdFromParam = +req.params.id;
    const userIdFromRequest = +req.user?.id;

    if (!userIdFromRequest || userIdFromParam !== userIdFromRequest) {
      return res.status(httpStatus.FORBIDDEN).json({ message: 'Access forbidden.' });
    }

    return originalMethod.apply(this, arguments);
  };

  return descriptor;
}
