import { MiddlewareConsumer, Module, type NestModule, type Provider, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ClsModule } from 'nestjs-cls';

import { AppController } from './app.controller';
import AppConfig from './appConfig';
import { Filters } from './common/filter';
import Interceptors from './common/interceptor';
import { TransactionMiddleware } from './common/middleware/transaction.middleware';
import { Modules, V2Module } from './modules';
import { AdminModule, AdminModules } from './modules/admin/admin.module';
import { GlobalModule } from './modules/global';
import { MusicianModule, MusicianModules } from './modules/musician/musician.module';
import { ServiceModule, ServiceModules } from './modules/services/service.module';

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
    ServiceModule,
    AdminModule,
    MusicianModule,
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          config: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
          readyLog: true,
          errorLog: true,
        };
      },
    }),
    RouterModule.register([
      {
        path: '/api/v2',
        module: V2Module,
        children: Modules,
      },
      {
        path: '/api/v2/services',
        module: ServiceModule,
        children: ServiceModules,
      },
      {
        path: '/api/v2/admins',
        module: AdminModule,
        children: AdminModules,
      },
      {
        path: '/api/v2/musicians',
        module: MusicianModule,
        children: MusicianModules,
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
