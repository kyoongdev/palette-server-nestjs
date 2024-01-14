import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import AppConfig from './appConfig';
import { Filters } from './common/filter';
import Interceptors from './common/interceptor';
import { JwtProvider } from './common/jwt/jwt';
import Modules from './modules';
import { GlobalModule } from './modules/global';

const providers: Provider[] = [...Filters, ...Interceptors, JwtProvider, AppConfig];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GlobalModule,
    ...Modules,
  ],
  controllers: [AppController],
  providers: [...providers],
})
export class AppModule {}
