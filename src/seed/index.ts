import { ConfigService } from '@nestjs/config';

import { PrismaClient } from '@prisma/client';

import { seedDev } from './dev';

(async () => {
  const prismaClient = new PrismaClient();
  const configService = new ConfigService();

  (configService.get('NODE_ENV') === 'dev' || configService.get('NODE_ENV') === 'local') &&
    (await seedDev(prismaClient));
})();
