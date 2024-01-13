import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class MysqlConfigProvider implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',

      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      replication: {
        master: {
          host: this.configService.get('DATABASE_HOST'),
          port: this.configService.get<number>('DATABASE_PORT'),
          username: this.configService.get('DATABASE_USER_NAME'),
          password: this.configService.get('DATABASE_PASSWORD'),
          database: this.configService.get('DATABASE_NAME'),
        },
        slaves: [
          {
            host: this.configService.get('SLAVE_DATABASE_HOST'),
            port: this.configService.get<number>('SLAVE_DATABASE_PORT'),
            username: this.configService.get('SLAVE_DATABASE_USER_NAME'),
            password: this.configService.get('SLAVE_DATABASE_PASSWORD'),
            database: this.configService.get('SLAVE_DATABASE_NAME'),
          },
        ],
      },
    };
  }
}
