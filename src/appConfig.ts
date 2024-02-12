import { type INestApplication, Injectable, type NestInterceptor, type PipeTransform } from '@nestjs/common';
import type { CorsOptions, CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import axios from 'axios';
import { SwaggerTheme } from 'swagger-themes';

import { PrismaService } from '@/database/prisma.service';

import { RedisIoAdapter } from './modules/chat/redis.adapter';

@Injectable()
class AppConfig {
  private app: INestApplication;

  constructor(private readonly configService: ConfigService) {}

  init(app: INestApplication) {
    this.app = app;
    this.configureSwagger();
    this.revalidate();

    return this;
  }

  async startServer() {
    await this.configureDatabase();
    await this.configRedisAdapter();
    await this.app.listen(8000, () => {
      console.info(`🔥 Palette ${this.configService.get('NODE_ENV')} 서버 시작!! 🔥`);
    });
  }

  async configRedisAdapter() {
    const redisIoAdapter = new RedisIoAdapter(this.app);
    await redisIoAdapter.connectToRedis();

    this.app.useWebSocketAdapter(redisIoAdapter);
    console.log('🔥 Redis Adapter 연결 완료!! 🔥');
  }

  revalidate() {
    if (this.configService.get('NODE_ENV') !== 'local') {
      axios.get(`${this.configService.get('CLIENT_REVALIDATE_URL')}?tag=spaces`);
      axios.get(`${this.configService.get('CLIENT_REVALIDATE_URL')}?tag=home`);
      axios.get(`${this.configService.get('CLIENT_REVALIDATE_URL')}?tag=rankings`);
      axios.get(`${this.configService.get('CLIENT_REVALIDATE_URL')}?tag=contents`);
      axios.get(`${this.configService.get('CLIENT_REVALIDATE_URL')}?tag=rental-types`);
    }
  }

  enableCors(options?: CorsOptions | CorsOptionsDelegate<any>) {
    this.app.enableCors(options);
    return this;
  }

  configureMiddleware(...middlewares: any[]) {
    middlewares.length > 0 && this.app.use(...middlewares);

    return this;
  }

  configurePipes(...pipes: PipeTransform<any, any>[]) {
    pipes.length > 0 && this.app.useGlobalPipes(...pipes);
    return this;
  }

  configureInterceptors(...interceptors: NestInterceptor[]) {
    interceptors.length > 0 && this.app.useGlobalInterceptors(...interceptors);
    return this;
  }

  private configureSwagger() {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Palette API v2')
      .setDescription('Palette의 API 문서입니다.')
      .setVersion('1.0.0')
      .addServer(this.configService.get('API_URL'))
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          name: 'JWT',
          in: 'header',
        },
        'access-token'
      )
      .build();

    const document = SwaggerModule.createDocument(this.app, swaggerConfig, {});
    const theme = new SwaggerTheme('v3');
    SwaggerModule.setup('api-docs', this.app, document, {
      swaggerOptions: {
        // docExpansion: false,
        apisSorter: 'alpha',
        operationsSorter: 'method',
      },
      customCss: theme.getBuffer('dark'),
    });
  }

  private async configureDatabase() {
    const database = this.app.get(PrismaService);

    await database.enableShutdownHooks(this.app);
  }
}

export default AppConfig;
