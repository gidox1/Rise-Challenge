import { Repository } from "typeorm";
import { config, Config } from "./app/config";
import { Post } from "./entity/post/post.entity";
import { Logger } from "./types/common";
import { AppDataSource } from "./app/data-source";
import { User } from "./entity/user/user.entity";
import { UserController } from './modules/user/user.controller';
import { UserManagementService } from "./modules/user/user.service";
import { logger } from "./lib/logger";
import * as helpers from './modules/user/user.helper';

export class ServiceFactory {
  private static config: Config;
  private static instance: ServiceFactory;
  public constructor(private logger: Logger) {}

  public static setConfig(c: Config): void {
    ServiceFactory.config = c;
  }

  public static getConfig(): Config {
    return config;
  }

  public static init(config: Config, logger: Logger): void {
    ServiceFactory.instance = new ServiceFactory(logger);
    ServiceFactory.setConfig(config);
  }
  
  public static async getPostRepository(): Promise<Repository<Post>> {
    return AppDataSource.getRepository(Post);
  }

  public static async getUserRepository(): Promise<Repository<User>> {
    return AppDataSource.getRepository(User);
  }

  public static async getCommentRepository(): Promise<Repository<Comment>> {
    return AppDataSource.getRepository(Comment);
  }

  public static async getUserService(): Promise<UserManagementService> {
    const config = ServiceFactory.getConfig();
    const repository = await ServiceFactory.getUserRepository();
    return new UserManagementService(logger, config, repository, helpers);
  }

  public static async getUserController(): Promise<UserController> {
    const service = await ServiceFactory.getUserService();
    return new UserController(logger, service);
  }
}