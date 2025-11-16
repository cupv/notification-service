import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { API_VERSION } from './00.common/enum';

const globalPrefix = `/api`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: `${API_VERSION.V1}`,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
