import { Repository } from "typeorm";
import { config, Config } from "./app/config";
import { Post } from "./entity/post/post.entity";
import { Logger } from "./types/common";
import { AppDataSource } from "./app/data-source";
import { User } from "./entity/user/user.entity";

export class ServiceFactory {
  private static config: Config;
  private static instance: ServiceFactory;
  public constructor(private logger: Logger) {}

  public static setConfig(c: Config): void {
    ServiceFactory.config = c;
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
}