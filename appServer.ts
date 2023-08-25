import { server } from "./src/app/app";
import { config } from "./src/app/config";
import { AppDataSource } from "./src/app/data-source";
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

AppDataSource.initialize().then(() => {
  logger.log('DB initialized successfully')
  server.listen(config.port, () => {
    logger.log(`Rise server started on port ${config.port}`);
  });
}).catch((error) => {
  logger.error('Failed to initialize database connection', error, {
    metrics : {
      pid: process.pid,
      port: config.port,
      stack: error.stack
    }
  });
  process.exit(1);
})

