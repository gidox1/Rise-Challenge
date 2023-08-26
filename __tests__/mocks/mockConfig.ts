import { Config } from "../../src/app/config";
interface MockConfigParams {
  jwt?: {
    secretKey: string;
    expiry: string;
  }
}
export function createMockConfig(options?: MockConfigParams): Config {
  return {
    port: 0,
    appUrl: '',
    postgres: {
      host: '',
      port: 0,
      database: '',
      user: '',
      password: '',
    },
    jwt: options?.jwt ?? {
      secretKey: '',
      expiry: '',
    },
    pagination: {
      page: 1,
      pageSize: 20,
      orderBy: 'createdAt',
      sortOrder: 'ASC',
    },
    redis: {
      port: 6379
    }
  }
}