import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './config';

const options: DataSourceOptions = {
  type: "postgres",
  host: config.postgres.host || "db",
  port: config.postgres.port,
  username: config.postgres.user,
  password: config.postgres.password,
  database: config.postgres.database,
  synchronize: false,
  logging: ['query'],
  entities: ['src/entity/**/*.entity.{ts,js}'],
  migrations: ['src/migrations/*.{ts,js}'],
  migrationsTableName: "migrations",
  ssl: {
    rejectUnauthorized: false
  }
};
export const AppDataSource = new DataSource(options);
