import { server } from "./src/app/app";
import { config } from "./src/app/config";
import { logger } from "./src/lib/logger";

server.on('listening', (err: unknown) => {
  if(err) {
    logger.error('Port connection failure: ', {
      pid: process.pid,
      port: <number>config.port,
    });
    process.exit(1);
  }
});

server.listen(config.port, () => {
  logger.log(`Rise server started on port ${config.port}`);
});
