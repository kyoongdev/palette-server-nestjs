import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaClient } from '@prisma/client';
import { minimatch } from 'minimatch';

import { logger } from '@/log';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private slaveDatabase = new PrismaClient({
    datasources: {
      db: {
        url: this.configService.get('SLAVE_DATABASE_URL'),
      },
    },
  });

  constructor(private readonly configService: ConfigService) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });
    this.routeDatabase();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      await this.slaveDatabase.$connect();
    } catch (err) {
      logger.error(err);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }

  async routeDatabase() {
    this.$extends({
      query: {
        $allModels: {
          $allOperations: async (params) => {
            if (minimatch(params.operation, '+(find*|count|aggregate)')) {
              const res = await this.slaveDatabase[params.model][params.operation](params.args);

              return res;
            } else if (minimatch(params.operation, '+(query*)')) {
              const res: any[] = await this.slaveDatabase.$queryRaw(params.args[0]);
              return res.map((responseItem) => {
                const result: Record<string, any> = {};
                for (const [key, value] of Object.entries(responseItem)) {
                  result[key] = {
                    prisma__type: typeof value,
                    prisma__value: value,
                  };
                }

                return result;
              });
            } else {
              const res = await this[params.model][params.operation](params.args);

              return res;
            }
          },
        },
      },
    });
  }
}
