import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { createAdapter } from '@socket.io/redis-adapter';
import { ClsService } from 'nestjs-cls';
import { createClient } from 'redis';
import { Server, type ServerOptions } from 'socket.io';

import { PrismaService } from '@/database/prisma.service';
import { PRISMA_CLS_KEY } from '@/utils/aop/transaction/transaction';

export class RedisIoAdapter extends IoAdapter {
  protected adapterConstructor: ReturnType<typeof createAdapter>;
  protected configService: ConfigService;

  constructor(app: INestApplication) {
    super(app);
    this.configService = app.get(ConfigService);
  }

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      url: this.configService.get<string>('REDIS_URL'),
    });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);
    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server: Server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);

    return server;
  }
}
