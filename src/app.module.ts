import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import Interceptors from './common/interceptor';
import { JwtProvider } from './common/jwt/jwt';
import { MysqlConfigProvider } from './database/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: MysqlConfigProvider,
    }),
  ],
  controllers: [AppController],
  providers: [JwtProvider, ...Interceptors],
})
export class AppModule {}
