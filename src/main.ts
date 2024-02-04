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

//TODO: sort 옵션 기능
//TODO: 리뷰 작성
//TODO: 휴대폰 인증 & 이메일 인증
