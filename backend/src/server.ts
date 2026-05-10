import {app} from './app.js';
import {env} from './config/env.js';
import {prisma} from './config/prisma.js';
import {logger} from './utils/logger.js';

const server = app.listen(env.PORT, () => {
  logger.info(`RoleFit AI backend running on http://localhost:${env.PORT}`);
});

const shutdown = async (signal: string) => {
  logger.info(`${signal} received. Shutting down backend.`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
