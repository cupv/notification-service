import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { API_VERSION } from './00.common/enum';
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');

const globalPrefix = `/api`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: `${API_VERSION.V1}`,
  });

  app.enableShutdownHooks();

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise);
    logger.error('Reason:', reason instanceof Error ? reason.stack : reason);
  });

  process.on('uncaughtException', (err) => {
    logger.fatal('UNCAUGHT EXCEPTION! App is unstable and will exit soon...');
    logger.fatal(err.stack || err);

    app.close()
      .then(() => {
        logger.log('Application closed gracefully');
        process.exit(1);
      })
      .catch((closeErr) => {
        logger.error('Error during graceful shutdown:', closeErr);
        process.exit(1);
      });

    setTimeout(() => {
      logger.error('Graceful shutdown timeout → force exit');
      process.exit(1);
    }, 10000);
  });

  const shutdown = async (signal: string) => {
    logger.log(`Received ${signal}. Starting graceful shutdown...`);
    try {
      await app.close();
      logger.log('Application closed successfully');
      process.exit(0);
    } catch (err) {
      logger.error('Graceful shutdown failed:', err);
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT')); // Ctrl+C

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}${globalPrefix}`);
}

bootstrap().catch((err) => {
  logger.fatal('Bootstrap failed:', err);
  process.exit(1);
});