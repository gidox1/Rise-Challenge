import * as dotenv from 'dotenv';
import { PaginationFilters } from '../types/common';
dotenv.config();

export interface Config {
  port: number;
  appUrl: string,
  postgres: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
  jwt: {
    secretKey: string;
    expiry: string;
  },
  pagination: PaginationFilters,
  redis: {
    port: number,
  }
}

export const config: Config = {
  port: Number(process.env.PORT),
  appUrl: String(process.env.APP_URL),
  postgres: {
    host: String(process.env.DATABASE_HOST),
    port: Number(process.env.DATABASE_PORT),
    database: String(process.env.DATABASE_NAME),
    user: String(process.env.DATABASE_USERNAME),
    password: String(process.env.DATABASE_PASSWORD),
  },
  jwt: {
    secretKey: process.env.JWT_SECRET || 'secret-key-ref',
    expiry: '1h'
  },
  pagination: {
    page: +process.env.PAGE || 1,
    pageSize: +process.env.PAGE_SIZE || 20,
    orderBy: process.env.ORDER_BY || 'createdAt',
    sortOrder: (process.env.ORDER_BY as 'DESC' | 'ASC') || 'ASC',
  },
  redis: {
    port: +process.env.REDIS_PORT || 6378,
  }
}