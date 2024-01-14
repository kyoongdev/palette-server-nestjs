import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import Interceptors from './common/interceptor';
import { JwtProvider } from './common/jwt/jwt';
import Modules from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ...Modules,
  ],
  controllers: [AppController],
  providers: [JwtProvider, ...Interceptors],
})
export class AppModule {}
