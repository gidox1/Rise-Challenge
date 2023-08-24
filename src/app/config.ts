import * as dotenv from 'dotenv';
dotenv.config();

export interface Config {
  port: number;
  appUrl: string,
  mysql: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
}

export const config: Config = {
  port: Number(process.env.PORT),
  appUrl: String(process.env.APP_URL),
  mysql: {
    host: String(process.env.DATABASE_HOST),
    port: Number(process.env.DATABASE_PORT),
    database: String(process.env.DATABASE_NAME),
    user: String(process.env.DATABASE_USERNAME),
    password: String(process.env.DATABASE_PASSWORD),
  },
}