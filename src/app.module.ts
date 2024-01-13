import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import Interceptors from './common/interceptor';
import { JwtProvider } from './common/jwt/jwt';
import { typeORMConfig } from './database/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeORMConfig),
  ],
  controllers: [AppController],
  providers: [JwtProvider, ...Interceptors],
})
export class AppModule {}
