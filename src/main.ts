import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import AppConfig from '@/appConfig';
import { logger } from '@/log';

import { AppModule } from './app.module';

(async function () {
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  const appConfig = app.get(AppConfig);

  await appConfig
    .init(app)
    .enableCors({
      origin: '*',
    })
    .configureMiddleware()
    .configureInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .configurePipes(
      new ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
        transform: true,
      })
    )
    .startServer();
})();
