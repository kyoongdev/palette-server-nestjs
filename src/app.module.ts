import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import Interceptors from './common/interceptor';
import { JwtProvider } from './common/jwt/jwt';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [JwtProvider, ...Interceptors],
})
export class AppModule {}
