import { Repository } from "typeorm";
import { Config } from "../src/app/config";
import { UserManagementService, UserService } from "../src/modules/user/user.service";
import { Logger } from "../src/types/common";
import { User } from "../src/entity/user/user.entity";
import { logger } from "../src/lib/logger";
import { createMockConfig } from "./mocks/mockConfig";
import { getUserRepository } from "./repositoryMock";
import { userHelperServiceMock } from "./mocks/helpers/user.helper";
import { UserHelperService } from "../src/modules/user/user.helper";

export function getUserService(options?: {
  logger?: Logger;
  config?: Config;
  repository?: Repository<User>;
  helper?: UserHelperService;
}): UserService {
  return new UserManagementService(
    options?.logger ?? logger,
    options.config ?? createMockConfig(),
    options?.repository ?? getUserRepository(),
    options?.helper ?? userHelperServiceMock(),
  );
}