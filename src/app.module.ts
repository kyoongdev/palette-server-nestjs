import { MiddlewareConsumer, Module, type NestModule, type Provider, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { ClsModule } from 'nestjs-cls';

import { AppController } from './app.controller';
import AppConfig from './appConfig';
import { Filters } from './common/filter';
import Interceptors from './common/interceptor';
import { TransactionMiddleware } from './common/middleware/transaction.middleware';
import { Modules, V2Module } from './modules';
import { AdminModule, AdminModules } from './modules/admin/admin.module';
import { GlobalModule } from './modules/global';

const providers: Provider[] = [...Filters, ...Interceptors, AppConfig];

@Module({
  imports: [
    GlobalModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClsModule.forRoot({
      global: true,
    }),
    V2Module,
    AdminModule,
    RouterModule.register([
      {
        path: '/api/v2',
        module: V2Module,
        children: Modules,
      },
      {
        path: '/api/v2/admins',
        module: AdminModule,
        children: AdminModules,
      },
    ]),
  ],
  controllers: [AppController],
  providers: providers,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
