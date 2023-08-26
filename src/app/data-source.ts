import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './config';

const options: DataSourceOptions = {
  type: 'postgres',
  host: config.postgres.host || 'db',
  port: config.postgres.port,
  username: config.postgres.user,
  password: config.postgres.password,
  database: config.postgres.database,
  synchronize: false,
  logging: ['query'],
  entities: ['src/entity/**/*.entity.{ts,js}'],
  migrations: ['src/migrations/*.{ts,js}'],
  migrationsTableName: 'migrations',
};

export let AppDataSource: DataSource = undefined;
if (Boolean(process.env.SSL_ENABLED) === true) {
  AppDataSource = new DataSource({
    ...options,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}
AppDataSource = new DataSource(options);
