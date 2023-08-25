import joi from 'joi';
import { SchemaCallbackFunction } from '../lib/requestValidator';

export const createUser = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  username: joi.string().required(),
}) as unknown as SchemaCallbackFunction;

export const loginUser = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
}) as unknown as SchemaCallbackFunction;