import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import Interceptors from './common/interceptor';
import { JwtProvider } from './common/jwt/jwt';
import Modules from './modules';
import { GlobalModule } from './modules/global';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GlobalModule,
    ...Modules,
  ],
  controllers: [AppController],
  providers: [JwtProvider, ...Interceptors],
})
export class AppModule {}
