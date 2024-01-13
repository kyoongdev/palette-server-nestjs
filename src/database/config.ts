import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config = new ConfigService();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  entities: [],
  synchronize: false,
  replication: {
    master: {
      host: config.get('DATABASE_HOST'),
      port: config.get('DATABASE_PORT'),
      username: config.get('DATABASE_USER_NAME'),
      password: config.get('DATABASE_PASSWORD'),
      database: config.get('DATABASE_NAME'),
    },
    slaves: [
      {
        host: config.get('SLAVE_DATABASE_HOST'),
        port: config.get('SLAVE_DATABASE_PORT'),
        username: config.get('SLAVE_DATABASE_USER_NAME'),
        password: config.get('SLAVE_DATABASE_PASSWORD'),
        database: config.get('SLAVE_DATABASE_NAME'),
      },
    ],
  },
};
